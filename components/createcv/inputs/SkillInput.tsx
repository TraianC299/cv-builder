import React, { useState } from 'react'
import Input from '../../ui/input/Input'
import CollapseItem from '../CollapseItem'
import useDidMountEffect from '../../../hooks/useDidMountEffect'
import { useCV } from '../../../contexts/AppContext'
import { useTranslation } from 'next-i18next'
import LevelSelector from '@/components/ui/input/LevelSelector'
import LEVELS from '@/constants/LEVELS'
import styled from 'styled-components'
import MEDIAQUERIES from '@/constants/MEDIAQUERIES'
import { SkillType } from 'interfaces/cv.types'
const Container = styled.div`
flex-direction: column;
@media ${MEDIAQUERIES.laptopSmall}{
    flex-direction: row;
}`


const SkillInput = ({ title, metric, edit, id }: SkillType) => {
  const { t } = useTranslation(["create-cv", "common"])
  const { setCvObject, changeCvObject } = useCV()



  const onDelete = () => {
    setCvObject((prev) => ({
      ...prev, skills: prev.skills.filter(el => el.id !== id)
    }))
  }


  function changeSkill(key: string, value: any) {
    changeCvObject(key, value, id, 'skills')
  }




  return (
    <CollapseItem
      onDelete={onDelete}
      title={title|| t("not-specified")}
      subtitle={metric? LEVELS[metric] : t("not-specified")}
      open={edit}
      setOpen={(value) => changeSkill("edit", value)}
      >
      <Container className='flex gap-4'>
        <Input label={t('title')} value={title} 
        setValue={(value) => changeSkill("title", value)}
        ></Input>
        <LevelSelector label={t('level')} value={metric} 
        onChange={(v) => changeSkill("metric", v)}
        ></LevelSelector>
      </Container>
    </CollapseItem>
  )
}

export default SkillInput





