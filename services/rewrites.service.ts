import REWRITES from "@/constants/REWRITES"
import { Rewrite } from "next/dist/lib/load-custom-routes"

const RewritesService = {
    getRewrites() {
        let rewrites:Rewrite[] = []
        Object.keys(REWRITES).forEach((locale) => {
            //@ts-ignore
            Object.keys(REWRITES[locale]).forEach((slug) => {
                rewrites.push({
                    //@ts-ignore
                    "source": `/${locale}/${encodeURI(REWRITES[locale][slug])}`,
                    "destination": `/${locale}/${encodeURI(slug)}`,
                    "locale": false
                })
            })
        })
        return JSON.stringify(rewrites)
    }
}

export default RewritesService