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
import { useCVcontext, CvObjectType } from '../../contexts/AppContext'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import AddMoreSection from './sections/AddMoreSection'
import COLORS from '@/constants/COLORS'


const ModalContainer = styled.form`
overflow: scroll;
background: ${COLORS.WHITE};
height: 100%;
padding: 2rem;
row-gap: 2rem;
display: flex;
flex-direction: column;
`
const Form = () => {
  const { t } = useTranslation("create-cv")
  const { cvObject, setCvObject }: { cvObject: CvObjectType, setCvObject: React.Dispatch<React.SetStateAction<any>> } = useCVcontext()


  const claculateCompletion = () => {
    const total = Object.keys(cvObject).length
    const completed = Object.keys(cvObject).filter(el => cvObject[el] !== "").length
    return Math.round((completed / total) * 100)
  }

  const isPresent = (key: string) => {
    return Object.keys(cvObject).includes(key)
  }

  return (
    <>
      <PageSEO
        title="Create your CV"
        description="Create your CV with our easy to use CV creator. Choose from multiple templates and create your CV in minutes."
      />
      <ModalContainer>
        <CompletionProgress progress={claculateCompletion()}></CompletionProgress>
        <InfoSection></InfoSection>
        <Section title={t("professional-summary")} subtitle={t("professional-summary-subtitle")}>
          <AutosizeInput value={cvObject.summary} setValue={(v) => { setCvObject((prev: CvObjectType) => ({ ...prev, summary: v })) }} label={t("summary")}></AutosizeInput>
        </Section>
        <Section title={t("hobbies")}>
          <AutosizeInput value={cvObject.hobbies} label={t("what-do-you-like")} setValue={(v) => { setCvObject((prev: CvObjectType) => ({ ...prev, hobbies: v })) }}></AutosizeInput>
        </Section>
        {isPresent("skills") && <SkillsSection></SkillsSection>}
        {isPresent("languages") && <LanguagesSection></LanguagesSection>}
        {isPresent("employment") && <EmploymentSection></EmploymentSection>}
        {isPresent("education") && <EducationSection></EducationSection>}
        {isPresent("internships") && <InternshipsSection></InternshipsSection>}
        <Section title={t("others")}><AddMoreSection/></Section>


      </ModalContainer>
    </>
  )
}

export default Form