const fs = require('fs');
const { default: BlogService } = require('./services/BlogService');
const REWRITES = {
    ro: {
        "about-us": 'despre-noi',
        "creeaza-cv": 'creeaza-cv',
        "termeni-si-conditii": 'termeni-si-conditii',
        "politica-de-confidentialitate": 'politica-de-confidentialitate',
        "blog": 'blog',
    },
    en: {
        "about-us": 'about-us',
        "creeaza-cv": 'create-cv',
        "termeni-si-conditii": 'terms-and-conditions',
        "politica-de-confidentialitate": 'privacy-policy',
        "blog": 'blog',
    },
    fr: {
        "about-us": 'a-propos-de-nous',
        "creeaza-cv": 'creez-votre-cv',
        "termeni-si-conditii": 'termes-et-conditions',
        "politica-de-confidentialitate": 'politique-de-confidentialite',
        "blog": 'blog',
    },
    de: {
        "about-us": 'uber-uns',
        "creeaza-cv": 'lebenslauf-erstellen',
        "termeni-si-conditii": 'allgemeine-geschaftsbedingungen',
        "politica-de-confidentialitate": 'datenschutz-bestimmungen',
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
export {}

