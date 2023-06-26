import React from 'react'
import Section from '../Section'
import { ReactSortable } from 'react-sortablejs'
import { CvObjectType, useCV } from '../../../contexts/AppContext'
import { nanoid } from 'nanoid'
import EducationInput from '../inputs/EducationInput'
import { useTranslation } from 'next-i18next'
const EducationSection = () => {
  const {t} = useTranslation("create-cv")
    const {cvObject, setCvObject}:{cvObject:CvObjectType, setCvObject:React.Dispatch<React.SetStateAction<any>>} = useCV()
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


      const deleteEducation = (id:string) => {
        setCvObject((prev:CvObjectType)=>({
          ...prev,
          education:prev.education.filter(el=>el.id!==id)
        }))
      }
  return (
    <Section 
    deletable
    objectKey="education"
    title={t("education")}
    onClick={addNewEducation}>
      <ReactSortable
      className='flex column gap-2'
      list={cvObject.education}
      setList={(v)=>{setCvObject((prev:CvObjectType)=>({...prev, languages:v}))}}
      handle=".handle">
        {cvObject?.education?.map(el=><EducationInput
         key={el.id}  {...el}
         onDelete={deleteEducation}></EducationInput>)}
      </ReactSortable>

      </Section>
  )
}

export default EducationSection