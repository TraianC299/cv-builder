// next-i18next.config.js
const path = require("path");
module.exports = {
    i18n: {
        locales: ["ro", "en", "de", "fr"], // list of supported locales
        defaultLocale: "ro", //default locale
        localeDetection: true, // disable automatic locale detection
    },
  };