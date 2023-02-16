import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { CvObjectType, EducationType, EmploymentType, SkillType, useCVcontext } from '../../../contexts/AppContext'
import {  BLACK, GREYWHITE, WHITE, YELLOW } from '../../../data/contants'




const Container = styled.div`
height: 842px;
width: 595px;
padding: 1rem;
background: white;
position: relative;
transform-origin:0 0;
*{
  white-space: normal;
  font-family: 'Montserrat', sans-serif;
  word-wrap: break-word;
}

.h6{
    font-size: 0.8rem;
}

.sp{
    font-size: 0.8rem;
    margin: 0;
    padding: 0;
}
`

const Container2 = styled.div`
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


const SkillsContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 1rem;
`





const TemplateTwo = ({cvObject, className}:{cvObject:CvObjectType, className?:string}) => {


  return (
    <Container id="cv-preview" 
    className={className}
    // style={{transform: `scale(${height ? height/842 - 0.1 : 1})`}}
    >
        <ProfileSection name={cvObject.name} surname={cvObject.surname} jobTitle={cvObject.jobTitle} image={cvObject.profileImage}></ProfileSection>
      <Container2>
        <div >
          <Section style={{borderTop:"2px solid black"}} title={"Hobbies"}>
            <p className='sp'>{cvObject.hobbies}</p>
          </Section>
        
          <Section title="Languages">
            <div className='flex column gap-2'>
              {cvObject.languages.map((el:SkillType)=><SkillInstance title={el.title} grade={el.metric}></SkillInstance>)}
            </div>
          </Section>
        
          </div>
          <div style={{borderLeft:"2px solid black"}}>
              <Section style={{borderTop:"2px solid black"}} title={"Professional Summary"}>
                <p className='sp'>{cvObject.summary}</p>
              </Section>
              <Section title={"Employment History"}>
              {cvObject.employment.map((el:EmploymentType)=><EmploymentItem {...el} key={el.id}></EmploymentItem>)}
              </Section>
              <Section title={"Internships"}>
            {cvObject.internships && cvObject.internships.map((el:EmploymentType)=><EmploymentItem {...el} key={el.id}></EmploymentItem>)}
            </Section>
              <Section title={"Education History"}>
              {cvObject.education.map((el:EducationType)=><EducationItem {...el} key={el.id}></EducationItem>)}
              </Section>
              <Section style={{border:"none"}} title="Skills">
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




const Section = ({children, title, style}:{
  children:ReactNode,
  title: string,
  style?: Object
})=> {
  return(
    <div className='p-4' style={{borderBottom:"2px solid black",...style}}>
      <p className='sp font-semibold uppercase pb-4'>{title}</p>
      {children}
    </div>
  )
}




const ProfileSection = ({name, surname, jobTitle, image}:{
  name:string,
  surname:string,
  jobTitle:string,
  image: string
}) => {
  return( 
    <div className='flex row ac jsb'>
      {/* <img src={image || "https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png"}></img> */}
      <div className='flex js column name-position' style={{maxWidth:"50%"}}>
        <p className='h4 font-semibold uppercase' >{name} {surname}</p>
        <p className='sp uppercase' >{jobTitle}</p>
      </div>
      <div>
      <div className='ssp' ><p className='font-semibold' style={{color:BLACK}}>Location:</p> Chisinau, Republic of Moldova</div>
      <div className='ssp' ><p className='font-semibold' style={{color:BLACK}}>Phone:</p> +37369513786</div>
      <div className='ssp' ><p className='font-semibold' style={{color:BLACK}}>Email:</p> traianciochina@gmail.com</div>
      </div>
    </div>
  )
}



const SkillInstanceContainer = styled.div`
width:100%;
row-gap: 4px;
>div{
  width:100%;
  background: ${GREYWHITE};
  height: 5px;
  border-radius: 444px;
  overflow: hidden;
  >div{
    height: 5px;
    background: ${BLACK};
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



