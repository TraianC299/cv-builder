import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { CvObjectType, EducationType, EmploymentType, SkillType, useCVcontext } from '../../../contexts/AppContext'
import { GREEN, GREYWHITE, WHITE, YELLOW } from '../../../data/contants'




const Container = styled.div`
height: 842px;
width: 595px;
padding: 48px;
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
grid-template-columns: 137px 338px;
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


  return (
    <Container id="cv-preview" 
    className={className}
    // style={{transform: `scale(${height ? height/842 - 0.1 : 1})`}}
    >
        <ProfileSection name={cvObject.name} surname={cvObject.surname} jobTitle={cvObject.jobTitle} image={cvObject.profileImage}></ProfileSection>
      <Container2>
        <ColoredSection>
          <Section title={"Personal Info"}>
            <div className='flex column gap05'>
              <p className='sp'>Location: {cvObject.city}, {cvObject.country}</p>
              <p className='sp'>Phone: {cvObject.phone}</p>
              <p className='sp'>Email: {cvObject.email}</p>
            </div>
          </Section>
          <Section title={"Hobbies"}>
            <p className='sp'>{cvObject.hobbies}</p>
          </Section>
        
          <Section title="Languages">
            <div className='flex column gap05'>
              {cvObject.languages.map((el:SkillType)=><SkillInstance title={el.title} grade={el.metric}></SkillInstance>)}
            </div>
          </Section>
        
          </ColoredSection>
          <div>
              <Section title={"Professional Summary"}>
                <p className='sp'>{cvObject.summary}</p>
              </Section>
              <Section title={"Employment History"}>
              {cvObject.employment.map((el:EmploymentType)=><EmploymentItem {...el} key={el.id}></EmploymentItem>)}
              </Section>
              <Section title={"Education History"}>
              {cvObject.education.map((el:EducationType)=><EducationItem {...el} key={el.id}></EducationItem>)}
              </Section>
              <Section title="Skills">
            <SkillsContainer>
              {cvObject.skills.map((el:SkillType)=><SkillInstance title={el.title} grade={el.metric}></SkillInstance>)}
            </SkillsContainer>
          </Section>
        
          </div>
      </Container2>
        
    </Container>
  )
}

export default TemplateTwo


const Section = ({children, title}:{
  children:ReactNode,
  title: string
})=> {
  return(
    <div>
      <p className='p t600'>{title}</p>
      {children}
    </div>
  )
}



const ProfileSectionContainer = styled(Container2)`

margin-bottom: 8px;
margin-top:8px;
z-index:999;
>div{
  row-gap: 0rem;
}
>img{
  height: 100px;
  width: 100px;
  border-radius: 50%;
  object-fit: cover;
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
        <p className='h4 t600' >{name} {surname}</p>
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
      {Array.from(Array(5).keys()).map((el, index)=><div className='circle' style={{background:index+1<grade?YELLOW:GREYWHITE}}></div>)}
        
      </div>
    </SkillInstanceContainer>
  )
}




const EmploymentItemContainer = styled.div``


const EmploymentItem = ({title, startDate, endDate,description, employer, city}:EmploymentType) => {
  return(<EmploymentItemContainer>
      <div>
        <p className='sp t600'>{title} at {employer} ({city})</p>  
        <p className='caption'>{startDate} - {endDate}</p>
      </div>
      <p className='sp'>{description}</p>
      
  </EmploymentItemContainer>)
}


const EducationItem = ({school, degree, city, startDate, endDate, description}:EducationType) => {
  return(
    <EmploymentItemContainer>
      <div>
        <p className='sp t600'>{degree} at {school} ({city})</p>  
        <p className='caption'>{startDate} - {endDate}</p>
      </div>
      <p className='sp'>{description}</p>
      
  </EmploymentItemContainer>
  )
}



