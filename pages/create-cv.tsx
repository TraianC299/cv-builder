import { nanoid } from 'nanoid'
import React from 'react'
import styled from 'styled-components'
import CvTemplateZero from '../components/createcv/cvTemplates/0'
import EducationInstance from '../components/createcv/EducationInstance'
import EmploymentInstance from '../components/createcv/EmploymentInstance'
import Section from '../components/createcv/Section'
import Skill from '../components/createcv/Skill'
import AutosizeInput from '../components/general/input/AutosizeInput'
import ButtonInputImage from '../components/general/input/ButtonImageInput'
import Input from '../components/general/input/Input'
import { CvObjectType, CVprovider, useCVcontext } from '../contexts/AppContext'
import {  GREY, GREYWHITE } from '../data/contants'
import { Button } from '../styles/global'
import useWindowSize from '../hooks/useWindowSize'
import TemplateOne from '../components/createcv/cvTemplates/1'
import CvPreview from '../components/createcv/CvPreview'
import InternshipInstance from '../components/createcv/InternshipInstance'
import { NextPage } from 'next'



const SkillsContainer = styled.div`
display: flex;
flex-direction: column;
row-gap: 8px;
`


const MainContainer = styled.main`
display: grid;
height: 100vh;
overflow: hidden;
grid-template-columns: 600px 1fr;
`








const Main = () => {

  const {height, width} = useWindowSize()
  const {cvObject, setCvObject} = useCVcontext()



  return (
      <MainContainer className='flex'>
        <CreateCvModal/>
        <CvPreview></CvPreview>

      </MainContainer>
  )
}


const ContextMain = () => {
  return(<CVprovider>
    <Main></Main>
  </CVprovider>)
}

export default ContextMain




const ModalContainer = styled.form`
overflow: scroll;
background: white;
height: 100%;
padding: 2rem;
row-gap: 2rem;
display: flex;
flex-direction: column;
`

const CreateCvModal = () => {
  const {cvObject, setCvObject}:{cvObject:CvObjectType, setCvObject:React.Dispatch<React.SetStateAction<any>>} = useCVcontext()

  



  const addNewSkillFunction = () => {
    const noEditSkills = cvObject.skills.map(el=>({
      id:el.id,
      title:el.title, 
      metric: el.metric,
      edit:false
    }))
    setCvObject((prev:CvObjectType)=>({
      ...prev,
      skills:[
        ...noEditSkills, {id:nanoid(), title:"", metric:0, edit:true}
      ]
    }))
  }


  const addNewLanguage = () => {
    const noEditLanguages = cvObject.languages.map(el=>({
      id:el.id,
      title:el.title, 
      metric: el.metric,
      edit:false
    }))
    setCvObject((prev:CvObjectType)=>({
      ...prev,
      languages:[
        ...noEditLanguages, {id:nanoid(), title:"", metric:0, edit:true}
      ]
    }))
  }


  const addNewEmployment = () => {
    const noEditLanguages = cvObject.employment.map(el=>({
      title: el.title,
      employer: el.employer,
      city: el.city, 
      description: el.description,
      id: el.id,
      edit:false
    }))
    setCvObject((prev:CvObjectType)=>({
      ...prev,
      employment:[
        ...noEditLanguages, {
          id:nanoid(),
          title: "",
      employer: "",
      city: "", 
      description: "",
           edit:true}
      ]
    }))
  }


  const addInternship = () => {
    const noEditInternships = cvObject.internships.map(el=>({
      title: el.title,
      employer: el.employer,
      city: el.city, 
      description: el.description,
      id: el.id,
      edit:false
    }))
    setCvObject((prev:CvObjectType)=>({
      ...prev,
      internships:[
        ...noEditInternships, {
          id:nanoid(),
          title: "",
      employer: "",
      city: "", 
      description: "",
      edit:true}
      ]
    }))
  }

  const addNewEducation = () => {
    const noEditLanguages = cvObject.education.map(el=>({
      school: el.school,
      degree: el.degree,
      city: el.city, 
      description: el.description,
      id: el.id,
      edit:false
    }))
    setCvObject((prev:CvObjectType)=>({
      ...prev,
      education:[
        ...noEditLanguages, {
          id:nanoid(),
          school: "",
          degree: "",
          city: "", 
          description: "",
           edit:true}
      ]
    }))
  }


  
  


  return(
    <ModalContainer>

      <Section title='Personal Info'>
      <div className='flex column' style={{rowGap:"0.5rem"}}>
        <div className='flex jc ac' style={{columnGap:"1rem"}}>
          <Input value={cvObject.jobTitle} setValue={(v:InputEvent)=>{setCvObject((prev:CvObjectType)=>({...prev, jobTitle:v}))}} placeholder='eg. Teacher' label="Job Title"></Input>
          <ButtonInputImage image={cvObject.profileImage}  setImage={(v:string | null)=>{setCvObject((prev:CvObjectType)=>({...prev, profileImage:v}))}} label='Choosle your image' postInputLabel='Image chosen'></ButtonInputImage>
        </div>
        <div className='flex' style={{columnGap:"1rem"}}>
          <Input value={cvObject.name} setValue={(v:InputEvent)=>{setCvObject((prev:CvObjectType)=>({...prev, name:v}))}} label='First Name'></Input>
          <Input value={cvObject.surname}  setValue={(v:InputEvent)=>{setCvObject((prev:CvObjectType)=>({...prev, surname:v}))}} label="Last Name"></Input>
        </div>
        <div className='flex' style={{columnGap:"1rem"}}>
          <Input value={cvObject.email}  setValue={(v:InputEvent)=>{setCvObject((prev:CvObjectType)=>({...prev, email:v}))}} label='Email'></Input>
          <Input value={cvObject.phone} setValue={(v:InputEvent)=>{setCvObject((prev:CvObjectType)=>({...prev, phone:v}))}} label="Phone"></Input>
        </div>
        <div className='flex' style={{columnGap:"1rem"}}>
          <Input value={cvObject.country}  setValue={(v:InputEvent)=>{setCvObject((prev:CvObjectType)=>({...prev, country:v}))}} label='Country'></Input>
          <Input value={cvObject.city}  setValue={(v:InputEvent)=>{setCvObject((prev:CvObjectType)=>({...prev, city:v}))}} label="City"></Input>
        </div>
      </div>
      </Section>
      <Section title="Professional Summary" subtitle="Write 2-4 short & energetic sentences to interest the reader! Mention your role, metric & most importantly - your biggest achievements, best qualities and skills.">
        <AutosizeInput value={cvObject.summary}  setValue={(v)=>{setCvObject((prev:CvObjectType)=>({...prev, summary:v}))}} label="Summary"></AutosizeInput>
      </Section>
      <Section title="Hobbies">
        <AutosizeInput value={cvObject.hobbies}  label="What do you like?" setValue={(v)=>{setCvObject((prev:CvObjectType)=>({...prev, hobbies:v}))}}></AutosizeInput>
      </Section>
      <Section title="Skills" onClick={addNewSkillFunction}>
        <SkillsContainer>{cvObject.skills.map(el=><Skill skills={cvObject.skills} setSkills={(v)=>{setCvObject((prev:CvObjectType)=>({...prev, skills:v}))}} key={el.id} id={el.id} edit={el.edit || false} title={el.title} metric={el.metric}></Skill>)}</SkillsContainer>
      </Section>
      <Section title="Languages" onClick={addNewLanguage}>
      <SkillsContainer>{cvObject.languages.map(el=><Skill skills={cvObject.languages} setSkills={(v)=>{setCvObject((prev:CvObjectType)=>({...prev, languages:v}))}} key={el.id} id={el.id} edit={el.edit || false} title={el.title} metric={el.metric}></Skill>)}</SkillsContainer>

      </Section>
      <Section title="Employment history" onClick={addNewEmployment}>
      <SkillsContainer >
        {cvObject.employment.map(el=><EmploymentInstance key={el.id}  {...el} edit={el.edit || false}></EmploymentInstance>)}
      </SkillsContainer>
      </Section>
      <Section title="Education" onClick={addNewEducation}>
      {cvObject.education.map(el=><EducationInstance key={el.id}  {...el}></EducationInstance>)}

      </Section>
      <Section title="Internships" onClick={addInternship}>
      {cvObject.internships.map(el=><InternshipInstance key={el.id}  {...el}></InternshipInstance>)}

      </Section>

      
    </ModalContainer>
  )
}

ContextMain.getLayout = function getLayout(page:NextPage) {
  return (
      page
  )
}
