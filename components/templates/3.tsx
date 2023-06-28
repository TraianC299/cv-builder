import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { CvObjectType, EducationType, EmploymentType, ProjectType, SkillType } from '../../contexts/AppContext'
import { useTranslation } from 'next-i18next'
import COLORS from '@/constants/COLORS'
import FontScaleWrapper from '../createcv/FontScaleWrapper'




const Container = styled(FontScaleWrapper)`
height: 842px;
width: 595px;
padding: 1rem;
background: white;
position: relative;
transform-origin:0 0;
*{
  white-space: normal;
  word-wrap: break-word;
}



`

const InfoSection = styled.div`
width: 100%;
justify-content: space-between;
display: grid;
grid-template-columns: 167px 396px;
column-gap: 0px;
margin-top: 24px;
>div{
  display: flex;
  flex-direction: column;
  row-gap:2px;
}
`





const SecondContainer = styled.div`
div:last-child{
    border: none !important;
}
`


const Template = ({ cvObject, className }: { cvObject: CvObjectType, className?: string }) => {
  const { t } = useTranslation("create-cv")

  return (
      <Container id="cv-preview"
        className={className}
      >
        <ProfileSection
        email={cvObject.email}
        phone={cvObject.phone}
        city={cvObject.city}
        country={cvObject.country}
        name={cvObject.name}
        surname={cvObject.surname}
        jobTitle={cvObject.jobTitle}
        image={cvObject.profileImage}></ProfileSection>
        <InfoSection>
          <div >
            <Section style={{ borderTop: "2px solid black" }} title={t("hobbies")}>
              <p className='sp'>{cvObject.hobbies}</p>
            </Section>
            {cvObject.languages && <Section title={t("languages")}>
              <div className='flex column gap-2'>
                {cvObject.languages.map((el: SkillType) => <SkillInstance key={el.id} title={el.title} grade={el.metric}></SkillInstance>)}
              </div>
            </Section>}
            {cvObject.skills && <Section title="Skills">
              <div className='flex column gap-2'>
                {cvObject.skills.map((el: SkillType) => <SkillInstance key={el.id} title={el.title} grade={el.metric}></SkillInstance>)}
              </div>
            </Section>}
          </div>
          <SecondContainer style={{ borderLeft: "2px solid black" }}>
            <Section style={{ borderTop: "2px solid black" }} title={t("professional-summary")}>
              <p className='sp'>{cvObject.summary}</p>
            </Section>
            {cvObject.employment &&<Section title={t("employment")}>
              {cvObject.employment.map((el: EmploymentType) => <EmploymentItem {...el} key={el.id}></EmploymentItem>)}
            </Section>}
            {cvObject.internships && <Section title={t("internships")}>
              {cvObject.internships && cvObject.internships.map((el: EmploymentType) => <EmploymentItem {...el} key={el.id}></EmploymentItem>)}
            </Section>}
           {cvObject.education && <Section title={t("education")}>
              {cvObject.education.map((el: EducationType) => <EducationItem {...el} key={el.id}></EducationItem>)}
            </Section>}
            {cvObject.projects &&<Section title={t("projects")}>
              {cvObject.projects.map((el: ProjectType) => <ProjectItem {...el} key={el.id}></ProjectItem>)}
            </Section>}
          </SecondContainer>
        </InfoSection>
      </Container>
  )
}

export default Template







const Section = ({ children, title, style }: {
  children: ReactNode,
  title: string,
  style?: Object
}) => {
  return (
    <div className='p-3' style={{ borderBottom: "2px solid black", ...style }}>
      <p className='sp font-semibold uppercase pb-4'>{title}</p>
      {children}
    </div>
  )
}




const ProfileSection = ({ name, surname, jobTitle, city, country, phone, email }: {
  name: string,
  surname: string,
  jobTitle: string,
  image: string,
  city: string,
  country: string,
  phone: string,
  email: string
}) => {
  const { t } = useTranslation("create-cv")

  return (
    <div className='flex row ac jsb'>
      {/* <img src={image || "https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png"}></img> */}
      <div className='flex js column name-position' style={{ maxWidth: "50%" }}>
        <p className='h4 font-semibold uppercase' >{name} {surname}</p>
        <p className='sp uppercase' >{jobTitle}</p>
      </div>
      <div>
        <div className='ssp' ><p className='font-semibold' style={{ color: COLORS.BLACK }}>{t("location")}:</p> {city} {country}</div>
        <div className='ssp' ><p className='font-semibold' style={{ color: COLORS.BLACK }}>{t("phone")}:</p> {phone}</div>
        <div className='ssp' ><p className='font-semibold' style={{ color: COLORS.BLACK }}>{t("email")}:</p> {email}</div>
      </div>
    </div>
  )
}



const SkillInstanceContainer = styled.div`
width:100%;
row-gap: 4px;
>div{
  width:100%;
  background: ${COLORS.LIGHTGREY};
  height: 5px;
  overflow: hidden;
  >div{
    height: 5px;
    background: ${COLORS.BLACK};
  }
}`
const SkillInstance = ({ title, grade }: {
  title: string,
  grade: SkillType["metric"] 
}) => {
  return (
    <SkillInstanceContainer className='flex column'>
      <p className='sp'>{title}</p>
      <div>
        <div style={{ width: `${grade?grade * 20:0}%` }}></div>
      </div>
    </SkillInstanceContainer>
  )
}





const EmploymentItem = ({ title, startDate, endDate, description, employer, city }: EmploymentType) => {
  const { t } =useTranslation("create-cv")

  return (
  <div>
    <div>
      <p className='sp font-semibold'>{title} {t("at")} {employer} ({city})</p>
      <p className='caption'>{startDate} - {endDate}</p>
    </div>
    <p className='sp'>{description}</p>
  </div>)
}



const ProjectItem = ({ title, startDate, endDate, description }: ProjectType) => {

  return (
  <div>
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
    <div>
      <div>
        <p className='sp font-semibold'>{degree} {t("at")} {school} ({city})</p>
        <p className='caption'>{startDate} - {endDate}</p>
      </div>
    </div>
  )
}



