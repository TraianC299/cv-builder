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
  const { t } = useTranslation("about-us")
  return (
    <>
    <PageSEO
    title='About Us | Free Online CV Builder - Empowering Job Seekers'
    description="Learn more about us at Free Online CV Builder. We're dedicated to helping job seekers create professional CVs that stand out. Discover our mission, vision, and values today."
    ></PageSEO>
    <Container className='sectionPadding'>
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
