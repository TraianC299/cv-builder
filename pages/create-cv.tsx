import { PageSEO } from "@/components/other/SEO";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Toaster } from "sonner";
import CvPreview from "../components/createcv/CvPreview";
import Form from "../components/createcv/Form";

const Main = () => {
  const { t } = useTranslation("create-cv");
  return (
    <>
      <PageSEO
        title={t("creeaza-cv-meta-title")}
        description={t("creeaza-cv-meta-description")}
      />
      <>
        <Toaster />
        <main className="flex h-screen overflow-hidden [&>form]:w-full [&>form]:max-w-none lg:[&>form]:w-[40vw] lg:[&>form]:max-w-[800px] [&>div]:flex-1">
          <Form />
          <CvPreview></CvPreview>
        </main>
      </>
    </>
  );
};


Main.getLayout = function getLayout(page: NextPage) {
  return page;
};

export default Main;

//getServeSideProps wors too
export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["create-cv", "common"])),
    },
  };
};
