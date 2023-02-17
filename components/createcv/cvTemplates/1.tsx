import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { CvObjectType, EducationType, EmploymentType, SkillType, useCVcontext } from '../../../contexts/AppContext'
import { DARKBLUE, YELLOW } from '../../../data/contants'
import { WHITE } from '../../../data/contants'




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
background: ${DARKBLUE};
*{
  color: white;
}
`
const TemplateOne = ({cvObject, className}:{cvObject:CvObjectType, className?:string}) => {


  return (
    <Container id="cv-preview" 
    className={className}
    // style={{transform: `scale(${height ? height/842 - 0.1 : 1})`}}
    ><ColoredSection>
        <ProfileSection name={cvObject.name} surname={cvObject.surname} jobTitle={cvObject.jobTitle} image={cvObject.profileImage}></ProfileSection>

        <Section title={"Personal Info"}>
          <p className='sp'>Location: {cvObject.city}, {cvObject.country}</p>
          <p className='sp'>Phone: {cvObject.phone}</p>
          <p className='sp'>Email: {cvObject.email}</p>
        </Section>
        <Section title={"Hobbies"}>
          <p className='sp'>{cvObject.hobbies}</p>
        </Section>
        <Section title="Skills">
          <SkillsContainer>
            {cvObject.skills.map((el:SkillType)=><SkillInstance title={el.title} grade={el.metric}></SkillInstance>)}
          </SkillsContainer>
        </Section>
        <Section title="Languages">
          <SkillsContainer>
            {cvObject.languages.map((el:SkillType)=><SkillInstance title={el.title} grade={el.metric}></SkillInstance>)}
          </SkillsContainer>
        </Section>
        

        </ColoredSection>
        <div>
            <Section title={"Professional Summary"}>
              <p className='sp'>{cvObject.summary}</p>
            </Section>
            <Section title={"Employment History"}>
            {cvObject.employment.map((el:EmploymentType)=><EmploymentItem {...el} key={el.id}></EmploymentItem>)}
            </Section>
            <Section title={"Internships"}>
            {cvObject.internships.map((el:EmploymentType)=><EmploymentItem {...el} key={el.id}></EmploymentItem>)}
            </Section>
            <Section title={"Education History"}>
            {cvObject.education.map((el:EducationType)=><EducationItem {...el} key={el.id}></EducationItem>)}
            </Section>
            
        </div>
        
    </Container>
  )
}

export default TemplateOne


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
  background: ${WHITE}50;
  height: 5px;
  border-radius: 444px;
  overflow: hidden;
  >div{
    height: 5px;
    background: ${WHITE};
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
  return(<EmploymentItemContainer>
      <div>
        <p className='sp font-semibold'>{title} at {employer} ({city})</p>  
        <p className='caption'>{startDate} - {endDate}</p>
      </div>
      <p className='sp'>{description}</p>
      
  </EmploymentItemContainer>)
}


const EducationItem = ({school, degree, city, startDate, endDate, description}:EducationType) => {
  return(
    <EmploymentItemContainer>
      <div>
        <p className='sp font-semibold'>{degree} at {school} ({city})</p>  
        <p className='caption'>{startDate} - {endDate}</p>
      </div>
      <p className='sp'>{description}</p>
      
  </EmploymentItemContainer>
  )
}



