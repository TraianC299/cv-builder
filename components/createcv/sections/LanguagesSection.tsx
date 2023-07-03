import React from 'react'
import Section from '../Section'
import { ReactSortable } from 'react-sortablejs'
import { CvObjectType, useCV } from '../../../contexts/AppContext'
import { nanoid } from 'nanoid'
import SkillInput from '../inputs/SkillInput'
import { useTranslation } from 'next-i18next'
import LanguageInput from '../inputs/LanguageInput'

const LanguagesSection = () => {
  const {cvObject, setCvObject} = useCV()
  const {t}= useTranslation(["create-cv", "common"])
  const addNewLanguage = () => {
    const noEditLanguages = cvObject.languages.map(el=>({
      ...el,
      edit:false
    }))
    setCvObject((prev)=>({
      ...prev,
      languages:[
        ...noEditLanguages, {
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
    objectKey="languages"
    title={t("languages")} onClick={addNewLanguage}>
      
        <ReactSortable
        className='flex column gap-2'
        list={cvObject.languages}
        setList={(v)=>{setCvObject((prev)=>({...prev, languages:v}))}}
        handle=".handle"
        >
          {cvObject.languages && cvObject.languages.map(el=><LanguagesSection.Input 
          id={el.id} 
          edit={el.edit || false} 
          title={el.title} 
          metric={el.metric}
          key={el.id} ></LanguagesSection.Input>)}
        </ReactSortable>
      

      </Section>
  )
}

export default LanguagesSection


LanguagesSection.Input = LanguageInput