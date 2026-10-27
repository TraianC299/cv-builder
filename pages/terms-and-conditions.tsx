import H1Tag from "@/components/other/H1Tag";
import H2Tag from "@/components/other/H2Tag";
import SectionSubtitle from "@/components/other/SectionSubtitle";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const TermsPage = () => {
  const { t } = useTranslation(["terms-and-conditions", "common"]);

  const sections = [
    {
      title: t("agreement"),
      content: t("agreement-content"),
    },
    {
      title: t("intellectual-property"),
      content: t("intellectual-property-content"),
    },
    {
      title: t("limitations-of-liability"),
      content: t("limitations-of-liability-content"),
    },
    {
      title: t("data-transmission"),
      content: t("data-transmission-content"),
    },
    {
      title: t("indemnification"),
      content: t("indemnification-content"),
    },
  ];

  return (
    <main className="bg-white px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-3xl">
        <article className="text-blackgrey">
          <header className="mb-8">
            <H1Tag className="mt-5">{t("terms-and-conditions")}</H1Tag>
            <p className="mt-4 text-base leading-8 text-grey">
              {t("terms-and-conditions-content")}
            </p>
          </header>

          <section className="space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <H2Tag>{section.title}</H2Tag>
                <SectionSubtitle className="mb-3">
                  {section.content}
                </SectionSubtitle>
              </div>
            ))}
          </section>
        </article>
      </div>
    </main>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "terms-and-conditions",
      ])),
    },
  };
};

export default TermsPage;
