import REWRITES from "@/constants/REWRITES";
import type { LanguageType } from "@/interfaces/lang.types";
import { useRouter } from "next/router";
import rewrites from '../rewrites.config.json';
const useRewrites = () => {
  const router = useRouter();
  const locale = router.locale as LanguageType;
  const rewrite = (path: string, rewriteLocale?: LanguageType) => {
    if (locale || rewriteLocale) {
      let slugs = path.split("/").map((slug: string) => {
        // @ts-ignore
        return REWRITES[rewriteLocale || locale][slug] || slug;
      });
      return slugs.join("/");
    } else {
      return path;
    }
  };
  const rewriteLocalized = (asPath: string, newLocale?: LanguageType) => {

    const destination = rewrites.find(el => el.source === `${locale === 'en' ? '' : '/' + locale}${asPath}`)?.destination
    let newDestination = locale === 'en' ? `/${newLocale}${destination}` : destination?.replace(`/${locale}/`, newLocale === 'en' ? '/' : `/${newLocale}/`)
    const newSource = rewrites.find(el => el.destination === newDestination)?.source
    return newSource ? newSource : `/${newLocale}`
  };

  const rewriteQuery = (query: any, rewriteLocale?: LanguageType) => {
    if (locale || rewriteLocale) {
      let newQuery = { ...query };
      Object.keys(newQuery).forEach((key) => {
        if (key === "slug") {
          newQuery[key] = rewrite(newQuery[key], rewriteLocale);
        }
      });
      return newQuery;
    } else {
      return query;
    }
  };

  const rewriteSlug = (slug: string, rewriteLocale?: LanguageType) => {
    if (locale || rewriteLocale) {
      // @ts-ignore
      return REWRITES[rewriteLocale || locale][slug] || slug;
    } else {
      return slug;
    }
  };

  return { rewrite, rewriteSlug, rewriteQuery, rewriteLocalized };
};

export default useRewrites;
