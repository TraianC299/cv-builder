import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { CvObjectType, SkillType, useCVcontext } from '../../../contexts/AppContext'
import { GREEN, GREYWHITE } from '../../../data/contants'
import useWindowSize from '../../../hooks/useWindowSize'



const Container = styled.div`
height: 842px;
width: 595px;
padding: 2rem;
display: grid;
grid-template-columns: 306px 205px;
column-gap: 1rem;
background: white;
position: relative;
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
  height: 135px;
  width: 338px;
  background: ${GREEN};
  z-index:-1;
  border-radius: 0 0 20px 0;
}
`


const SkillsContainer = styled.div`
row-gap: 90px;`
const CvTemplateOne = () => {
  const {height} = useWindowSize()
  const {cvObject, setCvObject}:{cvObject:CvObjectType, setCvObject:React.Dispatch<React.SetStateAction<any>>} = useCVcontext()


  return (
    <Container style={{transform: `scale(${height ? height/842 - 0.1 : 1})`}}>
        <div>
          <ProfileSection name={cvObject.name} surname={cvObject.surname} jobTitle={cvObject.jobTitle} image={cvObject.profileImage}></ProfileSection>
            {/* <Section title={"Personal Info"}>
              <p>{cvObject.summary}</p>
            </Section>
             */}
        </div>
        <div>
        {/* <Section title={"Personal Info"}>
          <p>Location: {cvObject.city}, {cvObject.country}</p>
          <p>Phone: {cvObject.phone}</p>
          <p>Email: {cvObject.email}</p>
        </Section>
        <Section title={"Hobbies"}>
          <p>{cvObject.hobbies}</p>
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
        </Section> */}


        </div>
    </Container>
  )
}

export default CvTemplateOne


const Section = ({children, title}:{
  children:ReactNode,
  title: string
})=> {
  return(
    <div>
      <p className='p t600'>{title}</p>
      <p className='sp'>{children}</p>
    </div>
  )
}



const ProfileSectionContainer = styled.div`
column-gap: 0.5rem;
margin-bottom: 32px;
margin-top:8px;
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
  return(
    <ProfileSectionContainer className='flex'>
      <img src={image || "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"}></img>
      <div className='flex js column'>
        <p className='h5 t600'>{name} {surname}</p>
        <p className='sp'>{jobTitle}</p>
      </div>
    </ProfileSectionContainer>
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
  >div{
    height: 5px;
    background: ${GREEN};
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




