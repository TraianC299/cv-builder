import React from 'react'
import Section from '../Section'
import { ReactSortable } from 'react-sortablejs'
import { CvObjectType, useCV } from '../../../contexts/AppContext'
import { nanoid } from 'nanoid'
import { useTranslation } from 'next-i18next'
import EducationInput from '../inputs/EducationInput'
const EducationSection = () => {
  const { t } = useTranslation(["create-cv", "common"])
  const { cvObject, setCvObject } = useCV()
  const addNewEducation = () => {
    const noEditEducation = cvObject.education.map(el => ({
      ...el,
      edit: false,
    }))
    setCvObject((prev) => ({
      ...prev,
      education: [
        ...noEditEducation, {
          id: nanoid(),
          school: "",
          degree: "",
          city: "",
          edit: true,
          startDate: "",
          endDate: ""
        }
      ]
    }))
  }


  const deleteEducation = (id: string) => {
    setCvObject((prev: CvObjectType) => ({
      ...prev,
      education: prev.education.filter(el => el.id !== id)
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
        setList={(v) => { setCvObject((prev) => ({...prev, education: v })) }}
        handle=".handle">
        {cvObject?.education?.map(el => <EducationSection.Input
          key={el.id}  {...el}
          onDelete={deleteEducation}></EducationSection.Input>)}
      </ReactSortable>

    </Section>
  )
}

export default EducationSection





EducationSection.Input = EducationInput





