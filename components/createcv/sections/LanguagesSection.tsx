import React from 'react'
import Section from '../Section'
import { ReactSortable } from 'react-sortablejs'
import { useCV } from '../../../contexts/AppContext'
import { useTranslation } from 'next-i18next'
import LanguageInput from '../inputs/LanguageInput'

const LanguagesSection = () => {
  const {cvObject, setCvObject, addNew} = useCV()
  const {t}= useTranslation(["create-cv", "common"])

  return (
    <Section 
    deletable
    objectKey="languages"
    title={t("languages")} onClick={()=>addNew('languages')}>
      
        <ReactSortable
        className='flex flex-col'
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