import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import styled from 'styled-components'
import { PageSEO } from '../components/utilities/SEO'

const Page = () => {
  const { t } = useTranslation("despre-noi");

  const features: string[] = t("features", { returnObjects: true });

  return (
    <>
      <PageSEO
        title={t("about_us_meta_title")}
        description={t("about_us_meta_description")}
      ></PageSEO>
      <section className="mx-auto p-4 text-gray-800 mb-16 max-w-[1400px]">
        <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
        <p className="mb-4">{t("intro")}</p>
        <p className="mb-4">{t("mission")}</p>
        <p className="mb-6">{t("support")}</p>
        <h2 className="text-2xl font-semibold mb-3">{t("featuresTitle")}</h2>
        <ul className="list-disc list-inside mb-6 space-y-1">
          {features?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{t("closing")}</p>
      </section>
    </>
  )
}

export default Page


export const getStaticProps = async ({ locale }: {
  locale: string
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["despre-noi", "common"])),
    },
  };
}
