import H1Tag from "@/components/other/H1Tag";
import H2Tag from "@/components/other/H2Tag";
import SectionSubtitle from "@/components/other/SectionSubtitle";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
const PrivacyPolicyPage = () => {
  const { t } = useTranslation("privacy-policy");
  const sections = [
    {
      title: t("privacy-policy-information-collection"),
      content: t("privacy-policy-information-collection-content"),
    },
    {
      title: t("privacy-policy-data-security"),
      content: t("privacy-policy-data-security-content"),
    },
    {
      title: t("privacy-policy-third-party-services"),
      content: t("privacy-policy-third-party-services-content"),
    },
    {
      title: t("privacy-policy-changes-to-this-policy"),
      content: t("privacy-policy-changes-to-this-policy-content"),
    },
    {
      title: t("privacy-policy-contact-us"),
      content: t("privacy-policy-contact-us-content"),
    },
  ];

  return (
    <>
      <Head>
        <title>{t("privacy-policy-title")}</title>
        <meta
          name="description"
          content={t("privacy-policy-content") as string}
        />
      </Head>

      <main className="bg-white px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto w-full max-w-3xl">
          <article className="text-blackgrey">
            <header className="mb-8">
              <H1Tag className="mt-5">
                {t("privacy-policy-title")}
              </H1Tag>
              <p className="mt-4 text-base leading-8 text-grey">
                {t("privacy-policy-content")}
              </p>
            </header>

            <section className="space-y-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <H2Tag>{section.title}</H2Tag>
                  <SectionSubtitle>{section.content}</SectionSubtitle>
                </div>
              ))}

              <p className="text-base leading-8 text-grey">
                {t("privacy-policy-last-updated")}
              </p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
};

//getServeSideProps wors too
export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "privacy-policy"])),
    },
  };
};
export default PrivacyPolicyPage;
