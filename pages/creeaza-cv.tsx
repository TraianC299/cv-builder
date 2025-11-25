import MEDIAQUERIES from '@/constants/MEDIAQUERIES'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import styled from 'styled-components'
import CvPreview from '../components/createcv/CvPreview'
import Form from '../components/createcv/Form'
import { PageSEO } from '../components/utilities/SEO'
import { CVprovider } from '../contexts/AppContext'


const MainContainer = styled.main`
display: flex;
height: 100vh;
overflow: hidden;
>form{
  width: 50vw;
  max-width: 800px;
}
>div{
  flex: 1;
}

@media ${MEDIAQUERIES.mobileSmallPortrait}{
  >form{
  width: 100%;
  max-width: auto;
}


}
`

const Main = () => {
  const { t } = useTranslation('create-cv')
  return (
    <>
      <PageSEO
        title={t("creeaza-cv-meta-title")}
        description={t("creeaza-cv-meta-description")}
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