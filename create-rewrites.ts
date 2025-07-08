const fs = require('fs');
const { default: BlogService } = require('./services/BlogService');
const REWRITES = {
    ro: {
        "despre-noi": 'despre-noi',
        "creeaza-cv": 'creeaza-cv',
        "termeni-si-conditii": 'termeni-si-conditii',
        "politica-de-confidentialitate": 'politica-de-confidentialitate',
        "blog": 'blog',
        "contact": 'contact',
    },
    en: {
        "despre-noi": 'about-us',
        "creeaza-cv": 'create-cv',
        "termeni-si-conditii": 'terms-and-conditions',
        "politica-de-confidentialitate": 'privacy-policy',
        "blog": 'blog',
        "contact": 'contact',
    },
    fr: {
        "despre-noi": 'a-propos-de-nous',
        "creeaza-cv": 'creez-votre-cv',
        "termeni-si-conditii": 'termes-et-conditions',
        "politica-de-confidentialitate": 'politique-de-confidentialite',
        "blog": 'blog',
        "contact": 'contact',
    },
    de: {
        "despre-noi": 'uber-uns',
        "creeaza-cv": 'lebenslauf-erstellen',
        "termeni-si-conditii": 'allgemeine-geschaftsbedingungen',
        "politica-de-confidentialitate": 'datenschutz-bestimmungen',
        "blog": 'blog',
        "contact": 'kontakt',
    },
}

function createRewrites() {
    const rewrites = BlogService.getLocalizedRewrites()
    Object.keys(REWRITES).forEach((locale) => {
        for (const [destination, source] of Object.entries(REWRITES[locale as keyof typeof REWRITES])) {
            rewrites.push({
                source: `/${locale}/${source}`,
                destination: `/${locale}/${destination}`,
                locale: false,
            })
        }
    })
    
    fs.writeFileSync('./rewrites.config.json', JSON.stringify(rewrites))
}
createRewrites()
export {}

