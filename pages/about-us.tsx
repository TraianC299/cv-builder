import H1Tag from "@/components/other/H1Tag";
import GitHubIcon from "@/components/other/GitHubIcon";
import { PageSEO } from "@/components/other/SEO";
import GITHUB_URL from "@/constants/GITHUB_URL";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Page = () => {
  const { t } = useTranslation("about-us");
  const features = t("features", { returnObjects: true });

  return (
    <>
      <PageSEO
        title={t("about_us_meta_title")}
        description={t("about_us_meta_description")}
      ></PageSEO>
      <main className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <section>
          <H1Tag>{t("title")}</H1Tag>
          <p className="mt-6 text-base leading-relaxed text-blackgrey md:text-lg">
            {t("intro")}
          </p>
          <p className="mt-4 text-base leading-relaxed text-blackgrey md:text-lg">
            {t("mission")}
          </p>
          <div className="mt-8 border-l-2 border-maincolor pl-5">
            <p className="text-base leading-relaxed text-blackgrey">
              {t("support")}
            </p>
          </div>

          <div className="my-12 h-px bg-bordercolor" />

          <h2 id="features" className="text-xl font-semibold text-black">
            {t("featuresTitle")}
          </h2>
          <div className="mt-6 flex flex-col gap-3">
            {(features as any[])?.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <p className="mt-0.5 min-w-fit text-xs font-bold text-maincolor">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </p>
                <p className="text-sm leading-relaxed text-blackgrey">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="my-12 h-px bg-bordercolor" />

          <h2 id="open-source" className="text-xl font-semibold text-black">
            {t("openSourceTitle")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-blackgrey md:text-lg">
            {t("openSourceText")}
          </p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-md border border-bordercolor px-4 py-2 text-sm font-medium text-black transition-colors hover:border-maincolor hover:text-maincolor"
          >
            <GitHubIcon className="h-5 w-5" />
            {t("openSourceLink")}
          </a>

          <div className="my-12 h-px bg-bordercolor" />

          <p className="text-base leading-relaxed text-blackgrey md:text-lg">
            {t("closing")}
          </p>
        </section>
      </main>
    </>
  );
};

export default Page;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["about-us", "common"])),
    },
  };
};
