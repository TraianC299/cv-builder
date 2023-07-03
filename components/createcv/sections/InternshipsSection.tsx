import React from 'react'
import Section from '../Section'
import { ReactSortable } from 'react-sortablejs'
import { CvObjectType, useCV } from '../../../contexts/AppContext'
import { nanoid } from 'nanoid'
import { useTranslation } from 'next-i18next'
import InternshipInput from '../inputs/InternshipInput'


const InternshipsSection = () => {
  const {t} = useTranslation(["create-cv", "common"])
    const {cvObject, setCvObject} = useCV()
    const addInternship = () => {
      const noEditInternships = cvObject.internships.map(el=>({
        ...el,
        edit:false
      }))
      setCvObject((prev)=>({
        ...prev,
        internships:[
          ...noEditInternships, {
            id:nanoid(),
            title: "",
        employer: "",
        city: "", 
        description: "",
        edit:true,
        startDate: "",
        endDate: ""
      }
        ]
      }))
    }

    const deleteInternship = (id:string) => {
      setCvObject((prev)=>({
        ...prev,
        internships:prev.internships.filter(el=>el.id!==id)
      }))
    }
  return (
    <Section 
    deletable
    objectKey="internships"
    title={t("internships")}
    onClick={addInternship}>
    <ReactSortable
    className='flex column gap-2'
    list={cvObject.internships}
    setList={(v)=>{setCvObject((prev)=>({...prev, internships:v}))}}
    handle=".handle"
    >{cvObject?.internships?.map(el=><InternshipsSection.Input 
      onDelete={()=>deleteInternship(el.id)}
      {...el}
      key={el.id}  
      ></InternshipsSection.Input>)}</ReactSortable>

    </Section>
  )
}

export default InternshipsSection




 InternshipsSection.Input = InternshipInput







