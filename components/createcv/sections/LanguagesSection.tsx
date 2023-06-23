import React from 'react'
import Section from '../Section'
import { ReactSortable } from 'react-sortablejs'
import { CvObjectType, useCVcontext } from '../../../contexts/AppContext'
import { nanoid } from 'nanoid'
import Skill from '../inputs/SkillInput'
import { useTranslation } from 'next-i18next'

const LanguagesSection = () => {
  const {cvObject, setCvObject}:{cvObject:CvObjectType, setCvObject:React.Dispatch<React.SetStateAction<any>>} = useCVcontext()
  const {t}= useTranslation("create-cv")
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
  return (
    <Section 
    objectKey="languages"
    title={t("languages")} onClick={addNewLanguage}>
      
        <ReactSortable
        className='flex column gap-2'
        list={cvObject.languages}
        setList={(v)=>{setCvObject((prev:CvObjectType)=>({...prev, languages:v}))}}
        handle=".handle"
        >
          {cvObject.languages && cvObject.languages.map(el=><Skill 
          
          skills={cvObject.languages} 
          setSkills={(v)=>{setCvObject((prev:CvObjectType)=>({...prev, languages:v}))}} 
          id={el.id} 
          edit={el.edit || false} 
          title={el.title} 
          metric={el.metric}
          key={el.id} ></Skill>)}
        </ReactSortable>
      

      </Section>
  )
}

export default LanguagesSection