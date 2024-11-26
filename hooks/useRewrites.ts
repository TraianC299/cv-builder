import REWRITES from "@/constants/REWRITES";
import { LanguageType } from "interfaces/lang.types";
import { useRouter } from "next/router";

const useRewrites = () => {
    const router = useRouter();
    const locale = router.locale as LanguageType
    const rewrite = (path: string, rewriteLocale?: LanguageType) => {
        if (locale || rewriteLocale) {

            let slugs = path.split("/").map((slug: string, index: number) => {
                // @ts-ignore
                return REWRITES[rewriteLocale || locale][slug] || slug;
            })
            return slugs.join("/")

        } else {
            return path
        }


    }

    const rewriteQuery = (query: any, rewriteLocale?: LanguageType) => {
        if (locale || rewriteLocale) {
            let newQuery = { ...query }
            Object.keys(newQuery).forEach((key) => {
                if (key === "slug") {
                    newQuery[key] = rewrite(newQuery[key], rewriteLocale)
                }
            })
            return newQuery
        } else {
            return query
        }
    }


    const rewriteSlug = (slug: string, rewriteLocale?: LanguageType) => {
        if (locale || rewriteLocale) {
            // @ts-ignore
            return REWRITES[rewriteLocale || locale][slug] || slug;
        } else {
            return slug
        }
    }


    return { rewrite, rewriteSlug, rewriteQuery };
}

export default useRewrites;