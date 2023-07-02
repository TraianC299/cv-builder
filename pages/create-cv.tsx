import React from 'react'
import styled from 'styled-components'
import { CVprovider } from '../contexts/AppContext'
import CvPreview from '../components/createcv/CvPreview'
import { NextPage } from 'next'
import { PageSEO } from '../components/utilities/SEO'
import Form from '../components/createcv/Form'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MEDIAQUERIES from '@/constants/MEDIAQUERIES'





const MainContainer = styled.main`
display: grid;
height: 100vh;
overflow: hidden;
grid-template-columns: 600px 1fr;
@media ${MEDIAQUERIES.mobileSmallPortrait}{
  grid-template-columns: 1fr;

}
`

const Main = () => {
  return (
    <>
      <PageSEO
        title="Create your CV"
        description="Create your CV with our easy to use CV creator. Choose from multiple templates and create your CV in minutes."
      />
      <MainContainer className='flex'>
        <Form />
        <CvPreview></CvPreview>
      </MainContainer>
    </>

  )
}


const ContextMain = () => {
  return (<CVprovider>
    <Main></Main>
  </CVprovider>)
}

export default ContextMain







ContextMain.getLayout = function getLayout(page: NextPage) {
  return (
    page
  )
}


//getServeSideProps wors too
export const getStaticProps = async ({ locale }: {
  locale: string;
}) => {

  return {
    props: {
      ...(await serverSideTranslations(locale, ["create-cv", "common"])),
    },
  };
};