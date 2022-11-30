import { nanoid } from 'nanoid'
import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import Item from '../components/createcv/CollapseItem'
import CvTemplateOne from '../components/createcv/cvTemplates/CVtemplateOne'
import Section from '../components/createcv/Section'
import Skill from '../components/createcv/Skill'
import AutosizeInput from '../components/general/input/AutosizeInput'
import ButtonInputImage from '../components/general/input/ButtonImageInput'
import Input from '../components/general/input/Input'
import { CvObjectType, CVprovider, useCVcontext } from '../contexts/AppContext'
import {  GREYWHITE } from '../data/contants'



const MainContainer = styled.main`
display: grid;
height: 100vh;
overflow: hidden;
grid-template-columns: 1fr 1fr;`
const Main = () => {

  return (
    <CVprovider>
      <MainContainer className='flex'>
        <CreateCvModal/>
        <div style={{background: GREYWHITE}} className='flex jc ac'>
          <CvTemplateOne></CvTemplateOne>
        </div>
      </MainContainer>
    </CVprovider>
  )
}

export default Main




const ModalContainer = styled.form`
overflow: scroll;
background: white;
height: 100%;
padding: 1rem;
row-gap: 2rem;
display: flex;
flex-direction: column;
border-right: 2px dashed ${GREYWHITE};`

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


  return(
    <ModalContainer>
      <Section title='Personal Info'>
      <div className='flex jc ac' style={{columnGap:"8px"}}>
        <Input value={cvObject.jobTitle} setValue={(v:InputEvent)=>{setCvObject((prev:CvObjectType)=>({...prev, jobTitle:v}))}} placeholder='eg. Teacher' label="Job Title"></Input>
        <ButtonInputImage image={cvObject.profileImage}  setImage={(v:string | null)=>{setCvObject((prev:CvObjectType)=>({...prev, profileImage:v}))}} label='Your image'></ButtonInputImage>
      </div>
      <div className='flex' style={{columnGap:"8px"}}>
        <Input value={cvObject.name} setValue={(v:InputEvent)=>{setCvObject((prev:CvObjectType)=>({...prev, name:v}))}} label='First Name'></Input>
        <Input value={cvObject.surname}  setValue={(v:InputEvent)=>{setCvObject((prev:CvObjectType)=>({...prev, surname:v}))}} label="Last Name"></Input>
      </div>
      <div className='flex' style={{columnGap:"8px"}}>
        <Input value={cvObject.email}  setValue={(v:InputEvent)=>{setCvObject((prev:CvObjectType)=>({...prev, email:v}))}} label='Email'></Input>
        <Input value={cvObject.phone} setValue={(v:InputEvent)=>{setCvObject((prev:CvObjectType)=>({...prev, phone:v}))}} label="Phone"></Input>
      </div>
      <div className='flex' style={{columnGap:"8px"}}>
        <Input value={cvObject.country}  setValue={(v:InputEvent)=>{setCvObject((prev:CvObjectType)=>({...prev, country:v}))}} label='Country'></Input>
        <Input value={cvObject.city}  setValue={(v:InputEvent)=>{setCvObject((prev:CvObjectType)=>({...prev, city:v}))}} label="City"></Input>
      </div>
      </Section>
      <Section title="Professional Summary" subtitle="Write 2-4 short & energetic sentences to interest the reader! Mention your role, metric & most importantly - your biggest achievements, best qualities and skills.">
        <AutosizeInput value={cvObject.summary}  setValue={(v)=>{setCvObject((prev:CvObjectType)=>({...prev, summary:v}))}} label="Summary"></AutosizeInput>
      </Section>
      <Section title="Hobbies">
        <AutosizeInput value={cvObject.hobbies}  label="What do you like?" setValue={(v)=>{setCvObject((prev:CvObjectType)=>({...prev, hobbies:v}))}}></AutosizeInput>
      </Section>
      <Section title="Skills" onClick={addNewSkillFunction}>
        {cvObject.skills.map(el=><Skill skills={cvObject.skills} setSkills={(v)=>{setCvObject((prev:CvObjectType)=>({...prev, skills:v}))}} key={el.id} id={el.id} edit={el.edit || false} title={el.title} metric={el.metric}></Skill>)}
      </Section>
      <Section title="Languages" onClick={addNewLanguage}>
      {cvObject.languages.map(el=><Skill skills={cvObject.languages} setSkills={(v)=>{setCvObject((prev:CvObjectType)=>({...prev, languages:v}))}} key={el.id} id={el.id} edit={el.edit || false} title={el.title} metric={el.metric}></Skill>)}

      </Section>
    </ModalContainer>
  )
}

