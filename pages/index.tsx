import Hero from "@/components/home/Hero";
import WhoIsItForSection from "@/components/home/WhoIsItForSection";
import { PageSEO } from "@/components/other/SEO";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import FAQsection from "../components/home/FAQsection";
import FeaturesSection from "../components/home/FeaturesSection";
import TemplatesSection from "../components/home/TemplatesSection";


export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="px-4 max-w-[1400px] mx-auto mb-16 gap-8 flex flex-col">
      <PageSEO
        title={t("meta_title")}
        description={t("meta_description")}
      ></PageSEO>
      <Hero />
      <FeaturesSection></FeaturesSection>
      <TemplatesSection></TemplatesSection>
      <WhoIsItForSection />
      {/* <HowToSection /> */}
      <FAQsection></FAQsection>
    </div>
  );
}

//getServeSideProps wors too
export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
