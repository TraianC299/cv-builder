import React from 'react'
import Section from '../Section'
import { ReactSortable } from 'react-sortablejs'
import { useCV } from '../../../contexts/AppContext'
import { useTranslation } from 'next-i18next'
import EducationInput from '../inputs/EducationInput'
const EducationSection = () => {
  const { t } = useTranslation(["create-cv", "common"])
  const { cvObject, setCvObject, addNew } = useCV()


  return (
    <Section
      deletable
      objectKey="education"
      title={t("education")}
      onClick={() => addNew('education')}>
      <ReactSortable
        className='flex column gap-2'
        list={cvObject.education}
        setList={(v) => { setCvObject((prev) => ({ ...prev, education: v })) }}
        handle=".handle">
        {cvObject?.education?.map(el => <EducationSection.Input
          key={el.id}
          {...el}
        ></EducationSection.Input>)}
      </ReactSortable>

    </Section>
  )
}

export default EducationSection





EducationSection.Input = EducationInput





