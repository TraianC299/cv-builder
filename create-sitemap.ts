
const rewrites = require("./rewrites.config.json");
const fs = require('fs')

const priorities = {
  '/blog': 0.8,
  '/contact': 0.7,
  '/creeaza-cv': 0.9,
  '/despre-noi': 0.7,
  '/blog/': 0.5,
  '/politica-de-confidentialitate': 0.6,
  '/termeni-si-conditii': 0.6,
}


// function that checks if a path is in the rewrites and returns the priority, it prioritizez the paths with a '/' at the end
function getPriority(url: string) {
  const pathsArr = Object.keys(priorities).filter((el) => url.includes(el));
  if (pathsArr.length > 1) {
    // choose the longest path
    const path =  pathsArr.reduce((a, b) => a.length > b.length ? a : b, '');
    return priorities[path as keyof typeof priorities]
  } else if (pathsArr.length === 1) {
    return priorities[pathsArr[0] as keyof typeof priorities];
  }
  return 0.5; // Default priority for paths not in rewrites
}

const result = (`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://resumelio.com/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>1.0</priority>
    </url>
      ${rewrites.map((url: any) => `<url>
      <loc>https://resumelio.com${url.source}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>${getPriority(url.destination)}</priority>
      </url>`).join('')}
    </urlset>`);


fs.writeFileSync('public/sitemap.xml', result)
export { };
