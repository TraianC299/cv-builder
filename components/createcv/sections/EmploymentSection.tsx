import React from 'react'
import Section from '../Section'
import { ReactSortable } from 'react-sortablejs'
import { CvObjectType, useCV } from '../../../contexts/AppContext'
import { nanoid } from 'nanoid'
import { useTranslation } from 'next-i18next'
import EmploymentInput from '../inputs/EmploymentInput'
const EmploymentSection = () => {
  const { cvObject, setCvObject } = useCV()
  const { t } = useTranslation(["create-cv", "common"])
  const addNewEmployment = () => {
    const noEditLanguages = cvObject.employment.map(el => ({
      ...el,
      edit: false
    }))
    setCvObject((prev) => ({
      ...prev,
      employment: [
        ...noEditLanguages, {
          id: nanoid(),
          title: "",
          employer: "",
          city: "",
          description: "",
          edit: true,
          startDate: "",
          endDate: ""
        }
      ]
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
        setList={(v) => { setCvObject((prev) => ({ ...prev, employment: v })) }}
        handle=".handle"
      >{cvObject?.employment?.map(el => <EmploymentSection.Input
        key={el.id}
        {...el}
        edit={el.edit }
      ></EmploymentSection.Input>)}</ReactSortable>
    </Section>
  )
}

export default EmploymentSection




EmploymentSection.Input = EmploymentInput