import buyMeACoffee from "@/assets/svg/bmc-brand-icon.svg";
import devHuntLogo from "@/assets/svg/dev-hunt.svg";
import instagramLogo from "@/assets/svg/instagram-logo.svg";
import productHuntLogo from "@/assets/svg/product-hunt-logo.svg";
import threadsLogo from "@/assets/svg/threads-logo.svg";
import { Button } from "@/components/ui/button";
import LANGUAGES from "@/constants/LANGUAGES";
import useRewrites from "@/hooks/useRewrites";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const linkClassName =
  "h-auto justify-start px-0 py-0 text-base font-normal text-blackgrey hover:text-maincolor";
const Footer = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { rewrite, rewriteLocalized, rewriteQuery } = useRewrites();

  return (
    <footer className="w-full bg-lightgrey px-[30px] py-[70px] lg:py-20">
      <div id="footer" className="mx-auto max-w-[1300px]">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          <div className="flex flex-col gap-4 text-left">
            <p className="text-xl font-semibold text-blackgrey">
              {t("language")}
            </p>
            {LANGUAGES.map((el) => (
              <Button
                key={el.locale}
                asChild
                variant="link"
                disabled={true}
                className={linkClassName}
              >
                {el.locale === router.locale ?
                  <p>{t(el.translationKey)}</p>
                  :
                  <Link
                    as={rewriteLocalized(router.asPath, el.locale)}
                    href={rewriteQuery(router.query, el.locale)}
                    locale={el.locale}
                  >
                    {t(el.translationKey)}
                  </Link>}
              </Button>
            ))}
          </div>

          <div className="flex flex-col gap-4 text-left">
            <p className="text-xl font-semibold text-blackgrey">
              {t("important")}
            </p>
            <Button asChild variant="link" className={linkClassName}>
              <Link href={rewrite(`/terms-and-conditions`)}>
                {t("terms-and-conditions")}
              </Link>
            </Button>
            <Button asChild variant="link" className={linkClassName}>
              <Link href={rewrite(`/privacy-policy`)}>
                {t("privacy-policy")}
              </Link>
            </Button>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <p className="text-xl font-semibold text-blackgrey">{t("company")}</p>
            <Button asChild variant="link" className={linkClassName}>
              <Link href={rewrite(`/blog`)}>{t("blog")}</Link>
            </Button>
            <Button asChild variant="link" className={linkClassName}>
              <Link href={rewrite(`/about-us`)}>{t("about-us")}</Link>
            </Button>
            <Button asChild variant="link" className={linkClassName}>
              <Link href={rewrite(`/contact`)}>{t("contact")}</Link>
            </Button>
          </div>
          <div className="flex flex-col gap-4 text-left">
            <p className="text-xl font-semibold text-blackgrey">
              {t("links")}
            </p>
            <a
              href="https://www.instagram.com/resumelio_cv_builder"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="link" className={linkClassName}>
                <Image alt="instagram logo" src={instagramLogo} className="h-6 w-6" />
                Instagram
              </Button>
            </a>
            <a
              href="https://www.threads.com/@resumelio_cv_builder"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="link" className={linkClassName}>
                <Image alt="threads logo" src={threadsLogo} className="h-6 w-6" />
                Threads
              </Button>
            </a>
            <a
              href="https://buymeacoffee.com/resumelio" target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="link" className={linkClassName}>
                <Image alt="buy me a coffe logo" src={buyMeACoffee} className="h-6 w-6" />
                {t("support-resumelio")}
              </Button>
            </a>
            <a
              href="https://www.producthunt.com/products/resumelio?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-resumelio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="link" className={linkClassName}>
                <Image alt="product hunt logo" src={productHuntLogo} className="h-6 w-6" />{t("find-us-on")} Product Hunt
              </Button>
            </a>
            <a
              href="https://devhunt.org/tool/resumelio"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="link" className={linkClassName}>
                <div className="bg-black rounded-full">
                  <Image alt="dev hunt logo" src={devHuntLogo} className="h-6 w-6" />
                </div>{t("find-us-on")} Dev Hunt
              </Button>
            </a>
            <a
              href="https://about.me/resumelio"
              target="_blank"
              rel="noopener noreferrer"
              className="sr-only"
            >
              <Button variant="link" className={linkClassName}>
                About.me
              </Button>
            </a>
            <a
              href="https://resumelio.hashnode.dev/how-i-built-a-privacy-first-cv-builder-that-works-entirely-in-the-browser"
              target="_blank"
              rel="noopener noreferrer"
              className="sr-only"
            >
              How I Built a Privacy-First CV Builder That Works Entirely in the Browser
            </a>
          </div>


        </div>
      </div>
    </footer>
  );
};

export default Footer;
