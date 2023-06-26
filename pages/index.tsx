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


const Container = styled.div`
padding: 1rem;
max-width: 1400px;
display: flex;
flex-direction: column;
gap: 2rem;
@media ${MEDIAQUERIES.laptopSmall}{
  padding: 0 2.5rem;
}
@media (max-width: 1400px){
  padding: 0 1rem;
}
`
export default function Home() {
  return (
    <Container className={styles.container}>
      <PageSEO
         title= {`Free CV Builder | Create a Professional CV Online`}
         description= "Design a compelling CV with our free, easy-to-use online CV builder. No sign-up required. Start crafting your professional resume and land your dream job today!"
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