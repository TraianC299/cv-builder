import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import styled from 'styled-components'
import FAQsection from '../components/home/FAQsection'
import FeaturesSection from '../components/home/FeaturesSection'
import Hero from '../components/home/Hero'
import TemplatesSection from '../components/home/TemplatesSection'
import { PageSEO } from '../components/utilities/SEO'
import styles from '../styles/Home.module.css'
import HowToSection from '@/components/home/HowToSection'


const Container = styled.div`
padding: 0 1rem;
max-width: 1400px;
display: flex;
flex-direction: column;
gap: 2rem;
margin:auto;
margin-bottom: 4rem;

`
export default function Home() {
  const { t } = useTranslation()

  return (
    <Container className={styles.container}>
      <PageSEO
         title={t("meta_title")}
         description= {t("meta_description")}
        ></PageSEO>
        <Hero></Hero>
        <FeaturesSection></FeaturesSection>
       <HowToSection/>
       <FAQsection></FAQsection>
       <TemplatesSection></TemplatesSection>
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