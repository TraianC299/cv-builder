import LANGUAGES from "./constants/LANGUAGES";

const rewrites = require("./rewrites.config.json");
const fs = require("fs");
const locales = ['en', 'ro', 'de', 'fr', 'es', 'pt', 'pl', 'it', 'ru']
const priorities = {
  "/blog": 0.8,
  "/contact": 0.7,
  "/create-cv": 0.9,
  "/about-us": 0.7,
  "/blog/": 0.5,
  "/privacy-policy": 0.6,
  "/terms-and-conditions": 0.6,
};


const urlIsEnglish = (url: string) => {
  const hasOtherLocale = LANGUAGES.some(el => url.includes(`/${el.locale}/`));

  // If it has another locale, it's not "English" (assuming English is the default)
  return !hasOtherLocale;
}
// function that checks if a path is in the rewrites and returns the priority, it prioritizez the paths with a '/' at the end
function getPriority(url: string) {
  const pathsArr = Object.keys(priorities).filter((el) => url.includes(el));
  if (pathsArr.length > 1) {
    // choose the longest path
    const path = pathsArr.reduce((a, b) => (a.length > b.length ? a : b), "");
    return priorities[path as keyof typeof priorities];
  } else if (pathsArr.length === 1) {
    return priorities[pathsArr[0] as keyof typeof priorities];
  }
  return 0.5; // Default priority for paths not in rewrites
}

const result = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${locales.map(locale => `<url>
      <loc>https://resumelio.com/${locale === 'en' ? '' : locale}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>${locale === 'en' ? '1.0' : '0.9'}</priority>
    </url>`)}
      ${rewrites
    .map(
      (url: { source: any; destination: string }) => `<url>
      <loc>https://resumelio.com${url.source}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>${urlIsEnglish(url.destination) ? getPriority(url.destination) : getPriority(url.destination) - 0.1}</priority>
      </url>`,
    )
    .join("")}
    </urlset>`;

fs.writeFileSync("public/sitemap.xml", result);
export { };
