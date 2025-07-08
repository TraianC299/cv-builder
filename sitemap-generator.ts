
const rewrites = require("./rewrites.config.json");
const fs = require('fs')


const result = (`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${rewrites.map((url:any) => `<url><loc>https://resumelio.com${url.source}</loc></url>`).join('')}
    </urlset>`);


fs.writeFileSync('public/sitemap.xml', result)
export {}