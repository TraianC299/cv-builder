import React from 'react'
import { PageSEO } from '../components/utilities/SEO'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
const Container = styled.section`
padding: 0 1rem;
max-width: 1400px;

margin:auto;

`
const Page = () => {
  const { t } = useTranslation(["about-us", "common"])
  return (
    <>
    <PageSEO
    title={t("about_us_meta_title")}
    description={t("about_us_meta_description")}
    ></PageSEO>
    <Container className='flex column gap-8'>
      <h1 className='h2'>{t("title")}</h1>
      <p>{t("content")}</p>
      </Container>
    </>
  )
}

export default Page


export const getStaticProps = async ({locale}:{
  locale:string
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["about-us", "common"])),
    },
  };
}
