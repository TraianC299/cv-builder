import Hero from '../components/home/Hero'
import TemplatesSection from '../components/home/TemplatesSection'
import styles from '../styles/Home.module.css'
import FAQsection from '../components/home/FAQsection'
import FeaturesSection from '../components/home/FeaturesSection'
import { PageSEO } from '../components/utilities/SEO'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ThreeCVsection from '../components/home/ThreeCVsection'
import styled from 'styled-components'
import MEDIAQUERIES from '@/constants/MEDIAQUERIES'
import { useTranslation } from 'next-i18next'
import useCustomCursor from 'hooks/useCustomCursor'


const Container = styled.div`
padding: 0 1rem;
max-width: 1400px;
display: flex;
flex-direction: column;
gap: 2rem;
margin:auto;

`
export default function Home() {
  const { t } = useTranslation()

  return (
    <Container className={styles.container}>
      <PageSEO
         title= {t("meta_title")}
         description= {t("meta_description")}
        ></PageSEO>

        <Hero></Hero>
        <FeaturesSection></FeaturesSection>
       <TemplatesSection></TemplatesSection>
       <FAQsection></FAQsection>
        {/* <ThreeCVsection/> */}

  
    </Container>
  )
}


//getServeSideProps wors too
export const getStaticProps = async ({ locale }: {
  locale: string;
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};