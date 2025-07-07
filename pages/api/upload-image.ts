// import { File, IncomingForm } from 'formidable';
// import fs, { PathOrFileDescriptor } from 'fs';
// import { NextApiRequest, NextApiResponse } from 'next';
// import AWS from 'aws-sdk';

// // Disable default body parsing to use formidable
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // Main handler
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ success: false, message: 'Method Not Allowed' });
//   }

//   const form = new IncomingForm();

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       console.error('Form parsing error:', err);
//       return res.status(500).json({ success: false, message: 'File parsing error' });
//     }

//     const fileArr = files.file as File | File[] | undefined;
//     const file: File = Array.isArray(fileArr) ? fileArr[0] : fileArr as File;

 

//     try {
//       // Read file content
//       const fileContent = fs.readFileSync(file?.filepath);

//       // Configure S3
//       const s3 = new AWS.S3({
//         endpoint: 'https://fra1.digitaloceanspaces.com',
//         region: 'fra1',
//         credentials: {
//           accessKeyId: process.env.DO_SPACES_KEY!,
//           secretAccessKey: process.env.DO_SPACES_SECRET!,
//         },
//       });

//       // Upload file
//       const uploadResult = await s3
//         .upload({
//           Bucket: 'ecom-spaces',
//           ACL: 'public-read',
//           Key: file.originalFilename!,
//           Body: fileContent,
//           ContentType: file.mimetype || undefined,
//         })
//         .promise();

//       return res.status(200).json({
//         success: true,
//         data: { url: uploadResult.Location },
//       });
//     } catch (uploadErr) {
//       console.error('Upload error:', uploadErr);
//       return res.status(500).json({
//         success: false,
//         message: 'Upload failed',
//         error: uploadErr,
//       });
//     }
//   });
// }
