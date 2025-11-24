import React from 'react'
import Section from '../Section'
import { ReactSortable } from 'react-sortablejs'
import { useCV } from '../../../contexts/AppContext'
import SkillInput from '../inputs/SkillInput'
import { useTranslation } from 'next-i18next'


const SkillsSection = () => {
  const { cvObject, setCvObject, addNew } = useCV()
  const { t } = useTranslation(["create-cv", "common"])

  return (
    <Section
      deletable
      objectKey="skills"
      title={t("skills")}
      onClick={() => addNew('skills')}>
      <ReactSortable
        className='flex flex-col'
        list={cvObject.skills}
        setList={(v) => { setCvObject((prev) => ({ ...prev, skills: v })) }}
        handle=".handle"
      >{cvObject?.skills?.map(el => <SkillsSection.Input
        key={el.id}
        id={el.id}
        edit={el.edit || false}
        title={el.title}
        metric={el.metric}></SkillsSection.Input>)}</ReactSortable>
    </Section>
  )
}

export default SkillsSection


SkillsSection.Input = SkillInput