import AWS from 'aws-sdk';
import formidable from 'formidable-serverless';
import fs from 'fs';
// Step 2: The s3Client function validates your request and directs it to your Space's specified endpoint using the AWS SDK.




export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {

  // create S3 instance with credentials
  const s3 = new AWS.S3({
    endpoint: "https://fra1.digitaloceanspaces.com", // Find your endpoint in the control panel, under Settings. Prepend "https://".
    region: "fra1", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
    credentials: {
      accessKeyId: process.env.DO_SPACES_KEY, // Access key pair. You can create access key pairs using the control panel or API.
      secretAccessKey: process.env.DO_SPACES_SECRET // Secret access key defined through an environment variable.
    }
});
  // parse request to readable form
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {

    // Account for parsing errors
    if (err) return res.status(500);
    // Read file
    const file = fs.readFileSync(files.file.path);

    // Upload the file
    s3.upload({ 
      // params
      Bucket: "ecom-spaces",
      ACL: "public-read",
      Key: files.file.name,
      Body: file,
      ContentType: files.file.type,
    })
    .send((err, data) => {
      if (err) {
        console.log('err',err)
        return res.status(500).json({
          success:false,
          data:{error: err}
   
        })
      };
      if (data) {
        return  res.status(200).json({
          success:true,
         data:{ url:  data.Location},
        });
      };
    });
  });
};