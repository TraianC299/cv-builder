import React from 'react'
import Section from '../Section'
import { ReactSortable } from 'react-sortablejs'
import { CvObjectType, useCV } from '../../../contexts/AppContext'
import { nanoid } from 'nanoid'
import SkillInput from '../inputs/SkillInput'
import { useTranslation } from 'next-i18next'


const SkillsSection = () => {
    const {cvObject, setCvObject}:{cvObject:CvObjectType, setCvObject:React.Dispatch<React.SetStateAction<any>>} = useCV()
    const {t} = useTranslation(["create-cv", "common"])
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
  return (
    <Section 
    deletable
    objectKey="skills"
    title={t("skills")}
    onClick={addNewSkillFunction}>
        <ReactSortable
        className='flex column gap-2'
        list={cvObject.skills}
        setList={(v)=>{setCvObject((prev:CvObjectType)=>({...prev, skills:v}))}}
        handle=".handle"
        >{cvObject?.skills?.map(el=><SkillsSection.Input skills={cvObject.skills} setSkills={(v)=>{setCvObject((prev:CvObjectType)=>({...prev, skills:v}))}} key={el.id} id={el.id} edit={el.edit || false} title={el.title} metric={el.metric}></SkillsSection.Input>)}</ReactSortable>
      </Section>
  )
}

export default SkillsSection


SkillsSection.Input = SkillInput