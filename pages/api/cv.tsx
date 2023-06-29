// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from "puppeteer-core"
import { CvObjectType } from '../../contexts/AppContext';
import BASE_URL from '@/constants/BASE_URL';
import chrome from 'chrome-aws-lambda';
// async function savePdf(){
//     const browser  = await puppeteer.launch({headless:true})
//     const page = await browser.newPage()
//     await page.goto("http://localhost:3000", {waitUntil:"networkidle0"})
//     // await page.addStyleTag({
//     //     content:"#save-button {display: none}"
//     // })
//     const pdf = await page.pdf({format: "A4"})
//     await browser.close()
//     return pdf
// }

 
async function printPDF(CV:CvObjectType) {
    try{
        const browser = await puppeteer.launch(
            process.env.NODE_ENV === 'production'
              ? {
                  args: chrome.args,
                  executablePath: await chrome.executablePath,
                  headless: chrome.headless,
                }
              : {}
          );
        const page = await browser.newPage();

        const url = `${BASE_URL}/${CV.language}/cv-collection/${CV.template}`
      
        const cookie = {
            "name": "cvobject",
            "value":JSON.stringify(CV),
            "url": url,
            "expires": new Date().getTime() + 10000,
            "httpOnly": true,
            "path": "/",
            // "sameSite": "Lax",
            "secure": false,
        }
        await page.setCookie(cookie);  
        await page.goto(url, {waitUntil: 'networkidle2'});

        const pdf = await page.pdf({ format: 'A4', printBackground:true});
       
        await browser.close();
        return pdf
    }catch(e){
        return e
    }
  
}
// type Data = {
//   name: string
// }

export default async (
  req: NextApiRequest,
//   res: NextApiResponse<Data>
res: NextApiResponse

)=> {
    const {
        method,
        body,
    } = req;


    switch(method){
        case "POST": {
            try{
                const pdf=  await printPDF(JSON.parse(body))
                res
                .status(200)
                .setHeader('Content-Type', 'application/pdf')
                // .setHeader('Content-Length', pdf.length)
                .send(pdf)
            }catch(e){
                console.log(e)
                res.send(e)
            }

        }
    }
    
   
}


