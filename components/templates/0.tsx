import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { CvObjectType, EducationType, EmploymentType, SkillType, useCVcontext } from '../../contexts/AppContext'
import { useTranslation } from 'next-i18next'
import COLORS from '@/constants/COLORS'




const Container = styled.div`
height: 842px;
width: 595px;
padding: 2rem;
display: grid;
grid-template-columns: 306px 205px;
column-gap: 1rem;
background: white;
position: relative;
transform-origin:0 0;
overflow: hidden;
>div{
  display: flex;
  flex-direction: column;
  row-gap:16px;
}

::after{
  content:"";
  position: absolute;
  top:0;
  left:0;
  height: 150px;
  width: 338px;
  background: ${COLORS.MAINCOLOR};
  z-index:0;
  border-radius: 0 0 20px 0;
}
`


const SkillsContainer = styled.div`
display: flex;
flex-direction: column;
row-gap: 8px;`
const TemplateZero = ({cvObject, className}:{cvObject:CvObjectType, className?:string}) => {
  const {t} = useTranslation()
  return (
    <Container id="cv-preview" 
    className={className}
    >
        <div>
          <ProfileSection name={cvObject.name} surname={cvObject.surname} jobTitle={cvObject.jobTitle} image={cvObject.profileImage}></ProfileSection>
            <Section title={t("professional-summary")}>
              <p className='sp'>{cvObject.summary}</p>
            </Section>
            <Section title={t("employment")}>
            {cvObject.employment.map((el:EmploymentType)=><EmploymentItem {...el} key={el.id}></EmploymentItem>)}
            </Section>
            <Section title={t("internships")}>
            {cvObject.internships.map((el:EmploymentType)=><EmploymentItem {...el} key={el.id}></EmploymentItem>)}
            </Section>
            <Section title={t("education")}>
            {cvObject.education.map((el:EducationType)=><EducationItem {...el} key={el.id}></EducationItem>)}
            </Section>
            
        </div>
        <div>
        <Section title={t("personal-info")}>
          <p className='sp'>{t("location")}: {cvObject.city}, {cvObject.country}</p>
          <p className='sp'>{t("phone")}: {cvObject.phone}</p>
          <p className='sp'>{t("email")}: {cvObject.email}</p>
        </Section>
        <Section title={t("hobbies")}>
          <p className='sp'>{cvObject.hobbies}</p>
        </Section>
        <Section title="Skills">
          <SkillsContainer>
            {cvObject.skills.map((el:SkillType)=><SkillInstance key={el.id} title={el.title} grade={el.metric}></SkillInstance>)}
          </SkillsContainer>
        </Section>
        {cvObject.languages && <Section title="Languages">
          <SkillsContainer>
            {cvObject.languages.map((el:SkillType)=><SkillInstance key={el.id} title={el.title} grade={el.metric}></SkillInstance>)}
          </SkillsContainer>
        </Section>}
        

        </div>
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
margin-bottom: 32px;
margin-top:8px;
z-index:999;
>img{
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
}

`
const ProfileSection = ({name, surname, jobTitle, image}:{
  name:string,
  surname:string,
  jobTitle:string,
  image: string
}) => {
  const {t} = useTranslation()

  return(
    <ProfileSectionContainer className='flex'>
      <img src={image || "https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png"}></img>
      <div className='flex js column'>
        <p className='h5 font-semibold' style={{color:COLORS.WHITE}}>{name} {surname}</p>
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
  background: ${COLORS.WHITE};
  height: 5px;
  border-radius: 444px;
  overflow: hidden;
  >div{
    height: 5px;
    background: ${COLORS.MAINCOLOR};
  }
}`
const SkillInstance = ({title, grade}:{
  title:string, 
  grade:number
}) => {
  return(
    <SkillInstanceContainer className='flex column'>
      <p className='sp'>{title}</p>
      <div>
          <div style={{width: `${grade*20}%`}}></div>
      </div>
    </SkillInstanceContainer>
  )
}




const EmploymentItemContainer = styled.div``


const EmploymentItem = ({title, startDate, endDate,description, employer, city}:EmploymentType) => {
  const {t} = useTranslation()

  return(<EmploymentItemContainer>
      <div>
        <p className='sp font-semibold'>{title} {t("at")} {employer} ({city})</p>  
        <p className='caption'>{startDate} - {endDate}</p>
      </div>
      <p className='sp'>{description}</p>
      
  </EmploymentItemContainer>)
}


const EducationItem = ({school, degree, city, startDate, endDate, description}:EducationType) => {
  const {t} = useTranslation()

  return(
    <EmploymentItemContainer>
      <div>
        <p className='sp font-semibold'>{degree} {t("at")} {school} ({city})</p>  
        <p className='caption'>{startDate} - {endDate}</p>
      </div>
      <p className='sp'>{description}</p>
      
  </EmploymentItemContainer>
  )
}



