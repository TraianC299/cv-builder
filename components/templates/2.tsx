import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { CvObjectType, EducationType, EmploymentType, SkillType, useCVcontext } from '../../contexts/AppContext'
import { useTranslation } from 'next-i18next'
import COLORS from '@/constants/COLORS'




const Container = styled.div`
height: 842px;
width: 595px;
padding: 24px;
background: white;
position: relative;
transform-origin:0 0;
column-gap: 24px;
*{
  white-space: normal;
  font-family: 'Montserrat', sans-serif;
  word-wrap: break-word;
}

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


const SkillsContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 1rem;
`




const ColoredSection = styled.div`
overflow: hidden;
`
const TemplateTwo = ({cvObject, className}:{cvObject:CvObjectType, className?:string}) => {
  const {t} = useTranslation()

  return (
    <Container id="cv-preview" 
    className={className}
    // style={{transform: `scale(${height ? height/842 - 0.1 : 1})`}}
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
        
          {cvObject.languages &&<Section title={t("languages")}>
            <div className='flex column gap-2'>
              {cvObject.languages.map((el:SkillType)=><SkillInstance key={el.id} title={el.title} grade={el.metric}></SkillInstance>)}
            </div>
          </Section>}
        
          </ColoredSection>
          <div>
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
              <Section title="Skills">
            <SkillsContainer>
              {cvObject.skills.map((el:SkillType)=><SkillInstance key={el.id} title={el.title} grade={el.metric}></SkillInstance>)}
            </SkillsContainer>
          </Section>
        
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
  background: ${COLORS.YELLOW};
  margin-top: 4px;
  margin-bottom: 4px;

}`
const Section = ({children, title}:{
  children:ReactNode,
  title: string
})=> {
  return(
    <div>
      <SectionTitle className='p font-semibold'>{title}</SectionTitle>
      {children}
    </div>
  )
}



const ProfileSectionContainer = styled(Container2)`
margin-bottom: 8px;
margin-top:8px;
z-index:999;
justify-content: start;
>div{
  row-gap: 0rem;
}
>img{
  height: 100px;
  width: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: auto;
}
p{
    text-align:left;
}

`
const ProfileSection = ({name, surname, jobTitle, image}:{
  name:string,
  surname:string,
  jobTitle:string,
  image: string
}) => {
  return(
    <ProfileSectionContainer className='flex column ac jc'>
      <img src={image || "https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png"}></img>
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
const SkillInstance = ({title, grade}:{
  title:string, 
  grade:number
}) => {
  return(
    <SkillInstanceContainer className='flex ac jsb'>
      <p className='sp'>{title}</p>
      <div className='flex'>
      {Array.from(Array(5).keys()).map((el, index)=><div className='circle' style={{background:index+1<grade?COLORS.YELLOW:COLORS.GREYWHITE}}></div>)}
        
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



