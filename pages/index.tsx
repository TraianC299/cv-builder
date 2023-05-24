import Hero from '../components/home/Hero'
import TemplatesSection from '../components/home/TemplatesSection'
import styles from '../styles/Home.module.css'
import FAQsection from '../components/home/FAQsection'
import FeaturesSection from '../components/home/FeaturesSection'
import { PageSEO } from '../components/utilities/SEO'

export default function Home() {
  return (
    <div className={styles.container}>
      <PageSEO
         title= {`Free CV Builder | Create a Professional CV Online`}
         description= "Design a compelling CV with our free, easy-to-use online CV builder. No sign-up required. Start crafting your professional resume and land your dream job today!"
        ></PageSEO>

        <Hero></Hero>
        {/* <ThreeCVsection/> */}
        <FeaturesSection></FeaturesSection>
       <TemplatesSection></TemplatesSection>
       <FAQsection></FAQsection>

  
    </div>
  )
}
