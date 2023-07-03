import React, { ReactNode, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { CvObjectType, EducationType, EmploymentType, ProjectType, SkillType, useCV } from '../../contexts/AppContext'
import { useTranslation } from 'next-i18next'
import COLORS from '@/constants/COLORS'
import FontScaleWrapper from '../createcv/FontScaleWrapper'




const Container = styled(FontScaleWrapper)`
padding: 24px;
background: white;
position: relative;
column-gap: 24px;
`

const Container2 = styled.div`
display: grid;
grid-template-columns: 137px 364px;
column-gap: 24px;
>div{
  display: flex;
  flex-direction: column;
  row-gap:1rem;
}
`







const ColoredSection = styled.div`
overflow: hidden;
`
const TemplateTwo = ({ cvObject, className }: { cvObject: CvObjectType, className?: string }) => {
  const { t } = useTranslation("create-cv")

  return (
    <Container 
    color={cvObject.color}
    id="cv-preview"
      className={className}
    >
      <ProfileSection name={cvObject.name} surname={cvObject.surname} jobTitle={cvObject.jobTitle} image={cvObject.profileImage}></ProfileSection>
      <Container2>
        <ColoredSection>
          <Section title={t("personal-info")}>
            <div className='flex column gap-2'>
              <p className='sp'>{t("location")}: {cvObject.city}, {cvObject.country}</p>
              <p className='sp'>{t("phone")}: {cvObject.phone}</p>
              <p className='sp'>{t("email")}:: {cvObject.email}</p>
            </div>
          </Section>
          <Section title={t("hobbies")}>
            <p className='sp'>{cvObject.hobbies}</p>
          </Section>

          {cvObject.languages && <Section title={t("languages")}>
            <div className='flex column gap-2'>
              {cvObject.languages.map((el: SkillType) => <SkillInstance key={el.id} title={el.title} grade={el.metric}></SkillInstance>)}
            </div>
          </Section>}
          {cvObject.skills && <Section title={t("skills")}>
          <div className='flex column gap-2'>
              {cvObject.skills.map((el: SkillType) => <SkillInstance key={el.id} title={el.title} grade={el.metric}></SkillInstance>)}
              </div>
          </Section>}

        </ColoredSection>
        <div>
          <Section title={t("professional-summary")}>
            <p className='sp preline'>{cvObject.summary}</p>
          </Section>
          {cvObject.employment && <Section title={t("employment")}>
            {cvObject.employment.map((el: EmploymentType) => <EmploymentItem {...el} key={el.id}></EmploymentItem>)}
          </Section>}
          {cvObject.internships && <Section title={t("internships")}>
            {cvObject.internships.map((el: EmploymentType) => <EmploymentItem {...el} key={el.id}></EmploymentItem>)}
          </Section>}
          {cvObject.education &&<Section title={t("education")}>
            {cvObject.education.map((el: EducationType) => <EducationItem {...el} key={el.id}></EducationItem>)}
          </Section>}
          {cvObject.projects && <Section title={t("projects")}>
            {cvObject.projects.map((el: ProjectType) => <ProjectItem {...el} key={el.id}></ProjectItem>)}
          </Section>}
         
          

        </div>
      </Container2>

    </Container>
  )
}

export default TemplateTwo



const SectionTitle = styled.p`
:after{
  content: "";
  display: block;
  width: 30px;
  height: 2px;
  background: ${props=>props.theme.color || COLORS.YELLOW};
  margin-top: 4px;
  margin-bottom: 4px;

}

`
const Section = ({ children, title }: {
  children: ReactNode,
  title: string
}) => {
  return (
    <div>
      <SectionTitle className='p font-semibold'>{title}</SectionTitle>
      {children}
    </div>
  )
}



const ProfileSectionContainer = styled(Container2)`
margin-bottom: 16px;
margin-top:8px;
z-index:999;
justify-content: start;
position: relative;
>div{
  row-gap: 0rem;
}
>img{
  height: 100px;
  width: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: auto;
  margin-right: auto;
}
.yellow-ball{
  height: 300px;
  width: 100px;
  background:${props=>props.theme.color || COLORS.YELLOW};
  position: absolute;
  top: -200px;
  left: 18px;
  border-radius: 888px;
  z-index: -1;

}
p{
    text-align:left;
}

`
const ProfileSection = ({ name, surname, jobTitle, image }: {
  name: string,
  surname: string,
  jobTitle: string,
  image: string
}) => {
  return (
    <ProfileSectionContainer className='flex column ac jc'>
      <img src={image || "https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png"}></img>
      <div className='yellow-ball'></div>
      <div className='flex js column'>
        <p className='h4 font-semibold' >{name} {surname}</p>
        <p className='h6' >{jobTitle}</p>
      </div>
    </ProfileSectionContainer>
  )
}



const SkillInstanceContainer = styled.div`
width:100%;
row-gap: 0.25rem;;
display: flex;
justify-content: space-between;
.circle{
  height: 8px;
  width: 8px;
  border-radius: 50%;
}
>div{
  gap: 0.25rem;
}`
const SkillInstance = ({ title, grade }: {
  title: string,
  grade: SkillType["metric"] 
}) => {
  const theme = useContext(ThemeContext)
  return (
    <SkillInstanceContainer className='flex ac jsb'>
      <p className='sp'>{title}</p>
      <div className='flex'>
        {Array.from(Array(5).keys()).map((el, index) => <div key={el.toString()} className='circle' style={{ background: index + 1 < (grade ||0) ? (theme.color || COLORS.YELLOW) : COLORS.LIGHTGREY }}></div>)}

      </div>
    </SkillInstanceContainer>
  )
}




const EmploymentItemContainer = styled.div``


const EmploymentItem = ({ title, startDate, endDate, description, employer, city }: EmploymentType) => {
  const { t } = useTranslation("create-cv")

  return (<EmploymentItemContainer>
    <div>
      <p className='sp font-semibold'>{title} {t("at")} {employer} ({city})</p>
      <p className='caption'>{startDate} - {endDate}</p>
    </div>
    <p className='sp'>{description}</p>

  </EmploymentItemContainer>)
}


const ProjectItem = ({ title, startDate, endDate, description }: ProjectType) => {

  return (<div>
    <div>
      <p className='sp font-semibold'>{title}</p>
      <p className='caption'>{startDate} - {endDate}</p>
    </div>
    <p className='sp'>{description}</p>

  </div>)
}


const EducationItem = ({ school, degree, city, startDate, endDate }: EducationType) => {
  const { t } = useTranslation("create-cv")

  return (
    <EmploymentItemContainer>
      <div>
        <p className='sp font-semibold'>{degree} {t("at")} {school} ({city})</p>
        <p className='caption'>{startDate} - {endDate}</p>
      </div>

    </EmploymentItemContainer>
  )
}



