import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { CvObjectType, EducationType, EmploymentType, SkillType, useCV } from '../../contexts/AppContext'
import { useTranslation } from 'next-i18next'
import COLORS from '@/constants/COLORS'




const Container = styled.div`
height: 842px;
width: 595px;

display: grid;
grid-template-columns: 222px 373px;

background: white;
position: relative;
transform-origin:0 0;
>div{
  display: flex;
  flex-direction: column;
  row-gap:16px;
  padding: 1.5rem;
}


`


const SkillsContainer = styled.div`
display: flex;
flex-direction: column;
row-gap: 8px;`


const ColoredSection = styled.div`
background: ${COLORS.DARKBLUE};
*{
  color: white;
}
`
const TemplateOne = ({cvObject, className}:{cvObject:CvObjectType, className?:string}) => {

  const { t } = useTranslation("create-cv")
  return (
    <Container id="cv-preview" 
    className={className}
    // style={{transform: `scale(${height ? height/842 - 0.1 : 1})`}}
    ><ColoredSection>
        <ProfileSection name={cvObject.name} surname={cvObject.surname} jobTitle={cvObject.jobTitle} image={cvObject.profileImage}></ProfileSection>

        <Section title={t("personal-info")}>
          <p className='sp'>{t("location")}: {cvObject.city}, {cvObject.country}</p>
          <p className='sp'>{t("phone")}: {cvObject.phone}</p>
          <p className='sp'>{t("email")}: {cvObject.email}</p>
        </Section>
        <Section title={t("hobbies")}>
          <p className='sp'>{cvObject.hobbies}</p>
        </Section>
        {cvObject.skills &&<Section title="Skills">
          <SkillsContainer>
            {cvObject.skills.map((el:SkillType)=><SkillInstance key={el.id} title={el.title} grade={el.metric}></SkillInstance>)}
          </SkillsContainer>
        </Section>}
        {cvObject.languages && <Section title="Languages">
          <SkillsContainer>
            {cvObject.languages.map((el:SkillType)=><SkillInstance key={el.id} title={el.title} grade={el.metric}></SkillInstance>)}
          </SkillsContainer>
        </Section>}
        

        </ColoredSection>
        <div>
            <Section title={t("professional-summary")}>
              <p className='sp'>{cvObject.summary}</p>
            </Section>
            {cvObject.employment && <Section title={t("employment")}>
            {cvObject.employment.map((el:EmploymentType)=><EmploymentItem {...el} key={el.id}></EmploymentItem>)}
            </Section>}
            {cvObject.internships && <Section title={t("internships")}>
            {cvObject.internships.map((el:EmploymentType)=><EmploymentItem {...el} key={el.id}></EmploymentItem>)}
            </Section>}
            {cvObject.education && <Section title={t("education")}>
            {cvObject.education.map((el:EducationType)=><EducationItem {...el} key={el.id}></EducationItem>)}
            </Section>}
            
        </div>
        
    </Container>
  )
}

export default TemplateOne





const Section = ({children, title}:{
  children:ReactNode,
  title: string
})=> {
  const {t} = useTranslation()

  return(
    <div>
      <p className='p font-semibold'>{title}</p>
      {children}
    </div>
  )
}



const ProfileSectionContainer = styled.div`
column-gap: 0.5rem;
margin-bottom: 8px;
margin-top:8px;
z-index:999;
>img{
  height: 80px;
  width: 80px;
  border-radius: 50%;
  object-fit: cover;
}
p{
    text-align:center;
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
    <ProfileSectionContainer className='flex column ac jc'>
      <img src={image || "https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png"}></img>
      <div className='flex js column'>
        <p className='h6 font-semibold' >{name} {surname}</p>
        <p className='sp' >{jobTitle}</p>
      </div>
    </ProfileSectionContainer>
  )
}



const SkillInstanceContainer = styled.div`
width:100%;
row-gap: 4px;
>div{
  width:100%;
  background: ${COLORS.WHITE}50;
  height: 5px;
  border-radius: 444px;
  overflow: hidden;
  >div{
    height: 5px;
    background: ${COLORS.WHITE};
  }
}`
const SkillInstance = ({title, grade}:{
  title:string, 
  grade: SkillType["metric"] 
}) => {
  const {t} = useTranslation()

  return(
    <SkillInstanceContainer className='flex column'>
      <p className='sp'>{title}</p>
      <div>
          <div style={{width: `${grade?grade*20:0}%`}}></div>
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



