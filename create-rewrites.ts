const fs = require("fs");
const { default: BlogService } = require("./lib/blog-service");
const { default: REWRITES } = require("./constants/REWRITES");

function createRewrites() {
  const rewrites = BlogService.getLocalizedRewrites();
  Object.keys(REWRITES).forEach((locale) => {
    for (const [destination, source] of Object.entries(
      REWRITES[locale as keyof typeof REWRITES],
    )) {

      rewrites.push({
        source: `${locale !== "en" ? "/".concat(locale) : ''}/${source}`,
        destination: `${locale !== "en" ? "/".concat(locale) : ''}/${destination}`,
        locale: false,
      });
    }
  });

  fs.writeFileSync("./rewrites.config.json", JSON.stringify(rewrites));
}
createRewrites();
export { };

