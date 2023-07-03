import React from 'react'
import Section from '../Section'
import { ReactSortable } from 'react-sortablejs'
import { CvObjectType, useCV } from '../../../contexts/AppContext'
import { nanoid } from 'nanoid'
import SkillInput from '../inputs/SkillInput'
import { useTranslation } from 'next-i18next'


const SkillsSection = () => {
    const {cvObject, setCvObject} = useCV()
    const {t} = useTranslation(["create-cv", "common"])
    const addNewSkillFunction = () => {
        const noEditSkills = cvObject.skills.map(el=>({
          ...el,
          edit:false
        }))
        setCvObject((prev)=>({
          ...prev,
          skills:[
            ...noEditSkills, {
              id:nanoid(), 
              title:"", 
              metric:null, 
              edit:true
            }
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
        >{cvObject?.skills?.map(el=><SkillsSection.Input 
        key={el.id}
        id={el.id}
        edit={el.edit || false}
        title={el.title}
        metric={el.metric}></SkillsSection.Input>)}</ReactSortable>
      </Section>
  )
}

export default SkillsSection


SkillsSection.Input = SkillInput