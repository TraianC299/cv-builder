// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'
// import { CvObjectType } from '../../contexts/AppContext';
// import BASE_URL from '@/constants/BASE_URL';
// import chromium from 'chrome-aws-lambda'

import { NextApiRequest, NextApiResponse } from "next";



export default async (
  req: NextApiRequest,
//   res: NextApiResponse<Data>
res: NextApiResponse

)=> {
    res.statusCode = 200
    
}

// async function printPDF(CV:CvObjectType) {
//     try{
//         const browser = await chromium.puppeteer.launch({
//             args: chromium.args,
//             executablePath: await chromium.executablePath,
//             headless: true,
//             ignoreHTTPSErrors: true,
//           });
        
//         const page = await browser.newPage();

//         const url = `${BASE_URL}/${CV.language}/cv-collection/${CV.template}`
      
//         const cookie = {
//             "name": "cvobject",
//             "value":JSON.stringify(CV),
//             "url": url,
//             "expires": new Date().getTime() + 10000,
//             "httpOnly": true,
//             "path": "/",
//             // "sameSite": "Lax",
//             "secure": false,
//         }
//         await page.setCookie(cookie);  
//         await page.goto(url, {waitUntil: 'networkidle2'});

//         const pdf = await page.pdf({ format: 'A4', printBackground:true});
       
//         await browser.close();
//         return pdf
//     }catch(e){
//         console.log(e)
//         return e
//     }
  
// }
// // type Data = {
// //   name: string
// // }

// export default async (
//   req: NextApiRequest,
// //   res: NextApiResponse<Data>
// res: NextApiResponse

// )=> {
//     const {
//         method,
//         body,
//     } = req;


//     switch(method){
//         case "POST": {
//             try{
//                 const pdf=  await printPDF(JSON.parse(body))
//                 res
//                 .status(200)
//                 .setHeader('Content-Type', 'application/pdf')
//                 // .setHeader('Content-Length', pdf.length)
//                 .send(pdf)
//             }catch(e){
//                 console.log(e)
//                 res.send(e)
//             }

//         }
//     }
    
   
// }