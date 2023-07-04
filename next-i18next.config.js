// next-i18next.config.js
const path = require("path");
module.exports = {
    i18n: {
        locales: ["ro", "en", "de", "fr", "ru"], // list of supported locales
        defaultLocale: "ro", //default locale
        localePath: path.resolve('./public/locales'),

        localeDetection: true, // disable automatic locale detection
    },
  };