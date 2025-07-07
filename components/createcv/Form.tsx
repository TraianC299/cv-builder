import COLORS from '@/constants/COLORS'
import MEDIAQUERIES from '@/constants/MEDIAQUERIES'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { useCV } from '../../contexts/AppContext'
import CompletionProgress from '../createcv/CompletionProgress'
import Section from '../createcv/Section'
import EducationSection from '../createcv/sections/EducationSection'
import EmploymentSection from '../createcv/sections/EmploymentSection'
import InfoSection from '../createcv/sections/InfoSection'
import InternshipsSection from '../createcv/sections/InternshipsSection'
import LanguagesSection from '../createcv/sections/LanguagesSection'
import SkillsSection from '../createcv/sections/SkillsSection'
import AutosizeInput from '../ui/input/AutosizeInput'
import AddMoreSection from './sections/AddMoreSection'
import GeneralSection from './sections/GeneralSection'
import ProjectsSection from './sections/ProjectsSection'


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
  const { cvObject, setCvObject } = useCV()

  return (
    <>
      <ModalContainer>
        <CompletionProgress />
        <GeneralSection />
        <InfoSection />
        <Section title={t("professional-summary")} subtitle={t("professional-summary-subtitle")}>
          <AutosizeInput value={cvObject.summary} setValue={(v) => { setCvObject((prev) => ({ ...prev, summary: v })) }} label={t("summary")}></AutosizeInput>
        </Section>
        <Section title={t("hobbies")}>
          <AutosizeInput value={cvObject.hobbies} label={t("what-do-you-like")} setValue={(v) => { setCvObject((prev) => ({ ...prev, hobbies: v })) }}></AutosizeInput>
        </Section>
        {cvObject?.skills?.length ? <SkillsSection /> : null}
        {cvObject?.languages?.length ? <LanguagesSection /> : null}
        {cvObject?.employment?.length ? <EmploymentSection /> : null}
        {cvObject?.education?.length ? <EducationSection /> : null}
        {cvObject?.internships?.length ? <InternshipsSection /> : null}
        {cvObject?.projects?.length ? <ProjectsSection /> : null}
        <AddMoreSection></AddMoreSection>
      </ModalContainer>
    </>
  )
}

export default Form