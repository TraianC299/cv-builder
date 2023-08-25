import React from 'react'
import Section from '../createcv/Section'
import AutosizeInput from '../system/input/AutosizeInput'
import { PageSEO } from '../utilities/SEO'
import LanguagesSection from '../createcv/sections/LanguagesSection'
import EmploymentSection from '../createcv/sections/EmploymentSection'
import EducationSection from '../createcv/sections/EducationSection'
import InternshipsSection from '../createcv/sections/InternshipsSection'
import CompletionProgress from '../createcv/CompletionProgress'
import SkillsSection from '../createcv/sections/SkillsSection'
import InfoSection from '../createcv/sections/InfoSection'
import { useCV, CvObjectType } from '../../contexts/AppContext'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import COLORS from '@/constants/COLORS'
import MEDIAQUERIES from '@/constants/MEDIAQUERIES'
import ProjectsSection from './sections/ProjectsSection'
import GeneralSection from './sections/GeneralSection'


const ModalContainer = styled.form`
overflow: scroll;
background: ${COLORS.WHITE};
height: 100%;
padding: 1rem;
row-gap: 2rem;
display: flex;
flex-direction: column;

@media ${MEDIAQUERIES.laptopSmall}{
    padding: 2rem;
}
`
const Form = () => {
  const { t } = useTranslation(["create-cv", "common"])
  const { cvObject, setCvObject }: { cvObject: CvObjectType, setCvObject: React.Dispatch<React.SetStateAction<any>> } = useCV()

  

  return (
    <>
      <PageSEO
        title="Create your CV"
        description="Create your CV with our easy to use CV creator. Choose from multiple templates and create your CV in minutes."
      />
      <ModalContainer>
        <CompletionProgress/>
        <GeneralSection/>
        <InfoSection/>
        <Section title={t("professional-summary")} subtitle={t("professional-summary-subtitle")}>
          <AutosizeInput value={cvObject.summary} setValue={(v) => { setCvObject((prev: CvObjectType) => ({ ...prev, summary: v })) }} label={t("summary")}></AutosizeInput>
        </Section>
        <Section title={t("hobbies")}>
          <AutosizeInput value={cvObject.hobbies} label={t("what-do-you-like")} setValue={(v) => { setCvObject((prev: CvObjectType) => ({ ...prev, hobbies: v })) }}></AutosizeInput>
        </Section>
        <SkillsSection/>
        <LanguagesSection/>
        <EmploymentSection/>
        <EducationSection/>
        <InternshipsSection/>
        <ProjectsSection/>


      </ModalContainer>
    </>
  )
}

export default Form