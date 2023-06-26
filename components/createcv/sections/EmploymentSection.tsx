import React from 'react'
import Section from '../Section'
import { ReactSortable } from 'react-sortablejs'
import { CvObjectType, useCV } from '../../../contexts/AppContext'
import { nanoid } from 'nanoid'
import EmploymentInput from '../inputs/EmploymentInput'
import { useTranslation } from 'next-i18next'
const EmploymentSection = () => {
    const {cvObject, setCvObject}:{cvObject:CvObjectType, setCvObject:React.Dispatch<React.SetStateAction<any>>} = useCV()
    const {t} = useTranslation("create-cv")
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

const deleteEmployment = (id:string) => {
    setCvObject((prev:CvObjectType)=>({
        ...prev,
        employment:prev.employment.filter(el=>el.id!==id)
    }))
}

  return (
    <Section deletable
    objectKey="employment"
    title={t("employment")}
    onClick={addNewEmployment}>
      <ReactSortable
      className='flex column gap-2'
      list={cvObject.employment}
      setList={(v)=>{setCvObject((prev:CvObjectType)=>({...prev, languages:v}))}}
      handle=".handle"
      >{cvObject?.employment?.map(el=><EmploymentInput
       key={el.id}  
       {...el} 
       edit={el.edit || false}
       onDelete={deleteEmployment}
       ></EmploymentInput>)}</ReactSortable>
    </Section>
  )
}

export default EmploymentSection