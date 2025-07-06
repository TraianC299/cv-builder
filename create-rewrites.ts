const fs = require('fs');
const { default: BlogService } = require('./services/BlogService');
const REWRITES = {
    ro: {
        "about-us": 'despre-noi',
        "create-cv": 'creaza-cv',
        "terms-and-conditions": 'termeni-si-conditii',
        "privacy-policy": 'politica-de-confidentialitate',
        "blog": 'blog',
    },
    en: {
        "about-us": 'about-us',
        "create-cv": 'create-cv',
        "terms-and-conditions": 'terms-and-conditions',
        "privacy-policy": 'privacy-policy',
        "blog": 'blog',
    },
    fr: {
        "about-us": 'a-propos-de-nous',
        "create-cv": 'creez-votre-cv',
        "terms-and-conditions": 'termes-et-conditions',
        "privacy-policy": 'politique-de-confidentialite',
        "blog": 'blog',
    },
    de: {
        "about-us": 'uber-uns',
        "create-cv": 'lebenslauf-erstellen',
        "terms-and-conditions": 'allgemeine-geschaftsbedingungen',
        "privacy-policy": 'datenschutz-bestimmungen',
        "blog": 'blog',
    },
}

function createRewrites() {
    const rewrites = BlogService.getLocalizedRewrites()
    Object.keys(REWRITES).forEach((locale) => {
        for (const [destination, source] of Object.entries(REWRITES[locale as keyof typeof REWRITES])) {
            rewrites.push({
                source: `/${locale}/${encodeURI(source)}`,
                destination: `/${locale}/${encodeURI(destination)}`,
                // locale: false,
            })
        }
    })
    
    fs.writeFileSync('public/rewrites.json', JSON.stringify(rewrites))
}
createRewrites()

