import React from 'react'
import Section from '../Section'
import { ReactSortable } from 'react-sortablejs'
import { CvObjectType, EducationType, useCV } from '../../../contexts/AppContext'
import { nanoid } from 'nanoid'
import { useTranslation } from 'next-i18next'
import EducationInput from '../inputs/EducationInput'
const EducationSection = () => {
  const {t} = useTranslation("create-cv")
    const {cvObject, setCvObject}:{cvObject:CvObjectType, setCvObject:React.Dispatch<React.SetStateAction<any>>} = useCV()
    const addNewEducation = () => {
        const noEditEducation = cvObject.education.map(el=>({
          school: el.school,
          degree: el.degree,
          city: el.city, 
          id: el.id,
          edit:false
        }))
        setCvObject((prev:CvObjectType)=>({
          ...prev,
          education:[
            ...noEditEducation, {
              id:nanoid(),
              school: "",
              degree: "",
              city: "", 
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
        {cvObject?.education?.map(el=><EducationSection.Input
         key={el.id}  {...el}
         onDelete={deleteEducation}></EducationSection.Input>)}
      </ReactSortable>

      </Section>
  )
}

export default EducationSection





EducationSection.Input = EducationInput





