
const fs = require('fs')
const REWRITES = {
    ro: {
        "about-us": 'despre-noi',
        "create-cv": 'creaza-cv',
        "terms-and-conditions": 'termeni-si-conditii',
        "privacy-policy": 'politica-de-confidentialitate',
        "blog": 'blog',
        "blog/5-tips-for-writing-a-good-cv": "blog/5-sfaturi-pentru-un-cv-bun",
        "blog/avoiding-common-cv-mistakes": "blog/evitarea-greselilor-comune-in-cv",
        "blog/the-power-of-action-verbs-in-your-cv": "blog/puterea-verbelor-de-actiune-in-cv-ul-tau",
        "blog/crucial-cv-statistics-you-should-know": "blog/statistici-cruciale-despre-cv-uri-pe-care-ar-trebui-sa-le-cunosti",
        "blog/how-to-optimize-your-cv-for-ats": "blog/cum-sa-optimizati-cv-ul-pentru-ats",
        "blog/the-power-of-networking-in-your-career": "blog/puterea-networking-ului-in-cariera-ta",
        "blog/the-importance-of-a-well-structured-cv": "blog/importanta-unui-cv-bine-structurat",
        "blog/the-art-of-writing-an-effective-cover-letter": "blog/arta-redactarii-unei-scrisori-de-intentie-eficiente",
        "blog/the-art-of-communication-in-the-professional-environment-tips-for-improving-your-skills": "blog/arta-comunicarii-in-mediul-profesional-sfaturi-pentru-imbunatatirea-abilitatilor",
        "blog/navigating-career-transitions-strategies-for-a-smooth-professional-change": "blog/navigând-tranzițiile-carieră-strategii-pentru-o-tranziție-profesională-lină",    
    },
    ru: {
        "about-us": "о-нас",
        "create-cv": 'создать-резюме',
        "terms-and-conditions": 'условия-и-положения',
        "privacy-policy": 'политика-конфиденциальности',
        "blog": 'блог',
        "blog/5-tips-for-writing-a-good-cv": "блог/советы-по-составлению-резюме",
        "blog/avoiding-common-cv-mistakes": "блог/избегайте-распространенных-ошибок-в-резюме",
        "blog/the-power-of-action-verbs-in-your-cv": "блог/сила-глаголов-действия-в-вашем-резюме",
        "blog/crucial-cv-statistics-you-should-know": "блог/важные-статистические-данные-о-резюме-которые-вам-следует-знать",
        "blog/how-to-optimize-your-cv-for-ats": "блог/как-оптимизировать-ваше-резюме-для-ats-системы-отслеживания-соискателей",
        "blog/the-power-of-networking-in-your-career": "блог/сила-нетворкинга-для-вашей-карьеры",
        "blog/the-importance-of-a-well-structured-cv": "блог/важность-хорошо-структурированного-резюме",
        "blog/the-art-of-writing-an-effective-cover-letter": "блог/искусство-написания-эффективного-сопроводительного-письма",
        "blog/the-art-of-communication-in-the-professional-environment-tips-for-improving-your-skills": "blog/искусство-коммуникации-в-профессиональной-среде-советы-по-улучшению-ваших-навыков",
        "blog/navigating-career-transitions-strategies-for-a-smooth-professional-change": "blog/навигация-по-карьерным-переходам-стратегии-для-плавного-профессионального-изменения",    
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
        "blog/5-tips-for-writing-a-good-cv": "blog/5-conseils-pour-rédiger-un-bon-cv",
        "blog/avoiding-common-cv-mistakes": "blog/erreurs-courantes-dans-un-cv",
        "blog/the-power-of-action-verbs-in-your-cv": "blog/le-pouvoir-des-verbes-daction-dans-votre-cv",
        "blog/crucial-cv-statistics-you-should-know": "blog/les-statistiques-cruciales-des-cv-que-vous-devriez-connaitre",
        "blog/how-to-optimize-your-cv-for-ats": "blog/comment-optimiser-votre-cv-pour-les-ats",
        "blog/the-power-of-networking-in-your-career": "blog/la-puissance-du-networking-pour-votre-carriere",
        "blog/the-importance-of-a-well-structured-cv": "blog/l-importance-d-un-cv-bien-structure",
        "blog/the-art-of-writing-an-effective-cover-letter": "blog/l-art-d-ecrire-une-lettre-de-motivation-efficace",
        "blog/the-art-of-communication-in-the-professional-environment-tips-for-improving-your-skills": "blog/l-art-de-la-communication-dans-le-milieu-professionnel-conseils-pour-ameliorer-vos-competences",
        "blog/navigating-career-transitions-strategies-for-a-smooth-professional-change": "blog/naviguer-les-transitions-de-carrière-stratégies-pour-un-changement-professionnel-en-douceur",    
    },
    de: {
        "about-us": 'uber-uns',
        "create-cv": 'lebenslauf-erstellen',
        "terms-and-conditions": 'allgemeine-geschaftsbedingungen',
        "privacy-policy": 'datenschutz-bestimmungen',
        "blog": 'blog',
        "blog/5-tips-for-writing-a-good-cv": "blog/5-tipps-für-lebenslauf",
        "blog/avoiding-common-cv-mistakes": "blog/vermeidung-häufiger-fehler-im-lebenslauf",
        "blog/the-power-of-action-verbs-in-your-cv": "blog/die-kraft-der-handlungsverben-in-ihrem-lebenslauf",
        "blog/crucial-cv-statistics-you-should-know": "blog/wichtige-cv-statistiken-die-du-kennen-solltest",
        "blog/how-to-optimize-your-cv-for-ats": "blog/wie-sie-ihren-lebenslauf-für-ats-optimieren",
        "blog/the-power-of-networking-in-your-career": "blog/die-kraft-des-netzwerkens-für-deine-karriere",
        "blog/the-importance-of-a-well-structured-cv": "blog/die-bedeutung-eines-gut-strukturierten-lebenslaufs",
        "blog/the-art-of-writing-an-effective-cover-letter": "blog/die-kunst-des-verfassens-eines-effektiven-anschreibens",
        "blog/the-art-of-communication-in-the-professional-environment-tips-for-improving-your-skills": "blog/die-kunst-der-kommunikation-im-beruflichen-umfeld-tipps-zur-verbesserung-ihrer-fahigkeiten",
        "blog/navigating-career-transitions-strategies-for-a-smooth-professional-change": "blog/karriereübergänge-navigieren-strategien-für-einen-reibungslosen-berufswechsel",    
    
    },
}

function createRewrites() {
    const rewrites = []
    Object.keys(REWRITES).forEach((locale) => {
        for (const [destination, source] of Object.entries(REWRITES[locale])) {
            rewrites.push({
                source: `/${locale}/${source}`,
                destination: `/${locale}/${destination}`,
                locale: false,
            })
        }
    })
    fs.writeFileSync('public/rewrites.json', JSON.stringify(rewrites))
}

createRewrites()

