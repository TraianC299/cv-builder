import React from 'react'
import Section from '../Section'
import { ReactSortable } from 'react-sortablejs'
import { useCV } from '../../../contexts/AppContext'
import { useTranslation } from 'next-i18next'
import EmploymentInput from '../inputs/EmploymentInput'
const EmploymentSection = () => {
  const { cvObject, setCvObject, addNew } = useCV()
  const { t } = useTranslation(["create-cv", "common"])



  return (
    <Section deletable
      objectKey="employment"
      title={t("employment")}
      onClick={() => addNew('employment')}>
      <ReactSortable
        className='flex flex-col'
        list={cvObject.employment}
        setList={(v) => { setCvObject((prev) => ({ ...prev, employment: v })) }}
        handle=".handle"
      >{cvObject?.employment?.map(el => <EmploymentSection.Input
        key={el.id}
        {...el}
        edit={el.edit}
      ></EmploymentSection.Input>)}</ReactSortable>
    </Section>
  )
}

export default EmploymentSection




EmploymentSection.Input = EmploymentInput