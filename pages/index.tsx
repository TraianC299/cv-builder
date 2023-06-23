import Hero from '../components/home/Hero'
import TemplatesSection from '../components/home/TemplatesSection'
import styles from '../styles/Home.module.css'
import FAQsection from '../components/home/FAQsection'
import FeaturesSection from '../components/home/FeaturesSection'
import { PageSEO } from '../components/utilities/SEO'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ThreeCVsection from '../components/home/ThreeCVsection'

export default function Home() {
  return (
    <div className={styles.container}>
      <PageSEO
         title= {`Free CV Builder | Create a Professional CV Online`}
         description= "Design a compelling CV with our free, easy-to-use online CV builder. No sign-up required. Start crafting your professional resume and land your dream job today!"
        ></PageSEO>

        <Hero></Hero>
        <FeaturesSection></FeaturesSection>
       <TemplatesSection></TemplatesSection>
       <FAQsection></FAQsection>
        {/* <ThreeCVsection/> */}

  
    </div>
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