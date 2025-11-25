import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { CvObjectType, EducationType, EmploymentType, ProjectType, SkillType } from '@/interfaces/cv.types'
import { useTranslation } from 'next-i18next'
import COLORS from '@/constants/COLORS'
import FontScaleWrapper from '../createcv/FontScaleWrapper'



const Container = styled(FontScaleWrapper)`
display: grid;
grid-template-columns: 330px 193px;
padding: 24px;
padding-top: 0;
justify-content: center;
column-gap: 24px;
background: white;
position: relative;
overflow: hidden;
>div{
  display: flex;
  flex-direction: column;
  row-gap:16px;
}


`


const Container2 = styled.div`
padding-top: 24px;`

const SkillsContainer = styled.div`
display: flex;
flex-direction: column;
row-gap: 8px;`
const TemplateZero = ({cvObject, className}:{cvObject:CvObjectType, className?:string}) => {
  const { t } = useTranslation("create-cv")



  return (
    <Container 
    id="cv-preview" 
    className={className}
    color={cvObject.color}
    >
        <div>
          <ProfileSection name={cvObject.name} surname={cvObject.surname} jobTitle={cvObject.jobTitle} image={cvObject.profileImage}></ProfileSection>
            <Section title={t("professional-summary")}>
              <p className='sp preline'>{cvObject.summary}</p>
            </Section>
            {cvObject.employment?.length > 0 && <Section title={t("employment")}>
            {cvObject.employment.map((el:EmploymentType)=><EmploymentItem {...el} key={el.id}></EmploymentItem>)}
            </Section>}
            {cvObject.internships?.length > 0 && <Section title={t("internships")}>
            {cvObject.internships.map((el:EmploymentType)=><EmploymentItem {...el} key={el.id}></EmploymentItem>)}
            </Section>}
            {cvObject.education?.length > 0 && <Section title={t("education")}>
            {cvObject.education.map((el:EducationType)=><EducationItem {...el} key={el.id}></EducationItem>)}
            </Section>}
            {cvObject.projects?.length > 0 && <Section title={t("projects")}>
            {cvObject.projects.map((el)=><ProjectItem {...el} key={el.id}></ProjectItem>)}
            </Section>}
            
        </div>
        <Container2 className='relative'>
        <Section title={t("personal-info")}>
          <p className='sp'>{t("location")}: {cvObject.city}, {cvObject.country}</p>
          <p className='sp'>{t("phone")}: {cvObject.phone}</p>
          <p className='sp'>{t("email")}: {cvObject.email}</p>
        </Section>
        <Section title={t("hobbies")}>
          <p className='sp'>{cvObject.hobbies}</p>
        </Section>
        {cvObject.skills&&<Section title={t("skills")}>
          <SkillsContainer>
            {cvObject.skills.map((el:SkillType)=><SkillInstance key={el.id} title={el.title} grade={el.metric}></SkillInstance>)}
          </SkillsContainer>
        </Section>}
        {cvObject.languages && <Section title={t("languages")}>
          <SkillsContainer>
            {cvObject.languages.map((el:SkillType)=><SkillInstance key={el.id} title={el.title} grade={el.metric}></SkillInstance>)}
          </SkillsContainer>
        </Section>}
        

        </Container2>
    </Container>
  )
}


export default TemplateZero


const Section = ({children, title}:{
  children:ReactNode,
  title: string
})=> {
  return(
    <div>
      <p className='p font-semibold'>{title}</p>
      {children}
    </div>
  )
}



const ProfileSectionContainer = styled.div`
column-gap: 0.5rem;
padding: 1rem;
z-index:999;
background: ${props=>props.theme.color||COLORS.MAINCOLOR};
position: relative;
left: -34px;
padding-left: 34px;
width: calc(100% + 34px);
border-radius: 0 0 16px 0;
min-height: 100px;
display: flex;
align-items: center;
justify-content: flex-start;
word-break: break-word;
.image-container{
    height: 50px;
  width: 50px;
  border-radius: 50%;
  overflow: hidden;
    margin-left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  >img{
    height: 100%;
    width: fit-content;
  }
}


`
const ProfileSection = ({name, surname, jobTitle, image}:{
  name:string,
  surname:string,
  jobTitle:string,
  image: string
}) => {

  return(
    <ProfileSectionContainer className='flex'>
      <div className='image-container'><img src={image || "/user-image.png"}></img></div>
      <div className='flex justify-start flex-col'>
        <p className='h5 font-semibold leading-none' style={{color:COLORS.WHITE}}>{name} {surname}</p>
        <p className='sp' style={{color:COLORS.WHITE}}>{jobTitle}</p>
      </div>
    </ProfileSectionContainer>
  )
}



const SkillInstanceContainer = styled.div`
width:100%;
row-gap: 4px;
>div{
  width:100%;
  background: ${COLORS.LIGHTGREY};
  height: 5px;
  border-radius: 444px;
  overflow: hidden;
  >div{
    height: 5px;
    background: ${props=>props.theme.color||COLORS.MAINCOLOR};
  }
}`
const SkillInstance = ({title, grade}:{
  title:string, 
  grade: SkillType["metric"] 
}) => {
  return(
    <SkillInstanceContainer className='flex flex-col'>
      <p className='sp'>{title}</p>
      <div>
          <div style={{width: `${grade?grade*20:0}%`}}></div>
      </div>
    </SkillInstanceContainer>
  )
}






const EmploymentItem = ({title, startDate, endDate,description, employer, city}:EmploymentType) => {
  const { t } = useTranslation("create-cv")

  return(<div>
      <div>
        <p className='sp font-semibold'>{title} {t("at")} {employer} ({city})</p>  
        <p className='caption'>{startDate} - {endDate}</p>
      </div>
      <p className='sp'>{description}</p>
      
  </div>)
}

const ProjectItem = ({title, startDate, endDate,description}:ProjectType) => {

  return(<div>
      <div>
        <p className='sp font-semibold'>{title}</p>  
        <p className='caption'>{startDate} - {endDate}</p>
      </div>
      <p className='sp'>{description}</p>
      
  </div>)
}


const EducationItem = ({school, degree, city, startDate, endDate}:EducationType) => {
  const { t } = useTranslation("create-cv")

  return(
    <div>
      <div>
        <p className='sp font-semibold'>{degree} {t("at")} {school} ({city})</p>  
        <p className='caption'>{startDate} - {endDate}</p>
      </div>
      
  </div>
  )
}



