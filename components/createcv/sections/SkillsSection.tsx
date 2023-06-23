import React from 'react'
import Section from '../Section'
import { ReactSortable } from 'react-sortablejs'
import { CvObjectType, useCVcontext } from '../../../contexts/AppContext'
import { nanoid } from 'nanoid'
import SkillInput from '../inputs/SkillInput'
import { useTranslation } from 'next-i18next'


const SkillsSection = () => {
    const {cvObject, setCvObject}:{cvObject:CvObjectType, setCvObject:React.Dispatch<React.SetStateAction<any>>} = useCVcontext()
    const {t} = useTranslation("create-cv")
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
    objectKey="skills"
    title={t("skills")}
    onClick={addNewSkillFunction}>
        <ReactSortable
        className='flex column gap-2'
        list={cvObject.languages}
        setList={(v)=>{setCvObject((prev:CvObjectType)=>({...prev, languages:v}))}}
        handle=".handle"
        >{cvObject.skills.map(el=><SkillInput skills={cvObject.skills} setSkills={(v)=>{setCvObject((prev:CvObjectType)=>({...prev, skills:v}))}} key={el.id} id={el.id} edit={el.edit || false} title={el.title} metric={el.metric}></SkillInput>)}</ReactSortable>
      </Section>
  )
}

export default SkillsSection