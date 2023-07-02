import React, {  useState } from 'react'
import Input from '../../system/input/Input'
import CollapseItem from '../CollapseItem'
import useDidMountEffect from '../../../hooks/useDidMountEffect'
import {  SkillType } from '../../../contexts/AppContext'
import { useTranslation } from 'next-i18next'
import LevelSelector from '@/components/system/input/LevelSelector'
import LEVELS from '@/constants/LEVELS'
import styled from 'styled-components'
import MEDIAQUERIES from '@/constants/MEDIAQUERIES'
const Container = styled.div`
flex-direction: column;
@media ${MEDIAQUERIES.laptopSmall}{
    flex-direction: row;
}`


interface SkillInputProps {
    title: string,
    metric: SkillType["metric"],
    id: string,
    skills: [SkillType] | [],
    setSkills: React.Dispatch<React.SetStateAction<SkillType[]>>,
    edit: boolean
}

const SkillInput = ({title, metric, skills, setSkills, edit, id}:SkillInputProps) => {
  const {t} = useTranslation(["create-cv", "common"])
    const [open, setOpen] = useState(edit?true:false)
    const [titleState, setTitleState] = useState(title || "")
    const [metricState, setMetricState] = useState<SkillInputProps["metric"]>(metric || null)


useDidMountEffect(()=>{
  setOpen(edit)
},[edit])

useDidMountEffect(()=>{
  const index = skills.findIndex(el=>el.id===id)
  const skillsPlaceholder = [...skills]
  skillsPlaceholder[index] = {
    id:id,
    title:titleState,
    metric:metricState,
    edit: edit
  }
  setSkills(skillsPlaceholder)
},[titleState, metricState])



  return (
    <CollapseItem 
    onDelete={()=>setSkills(skills.filter(el=>el.id!==id))} 
      title={titleState || t("not-specified")} 
      subtitle={metricState?LEVELS[metricState]:t("not-specified")}
      open={open} 
      setOpen={setOpen}>
      <Container className='flex gap-4'>
        <Input  label="Title" value={titleState} setValue={setTitleState}></Input>
        <LevelSelector label={"Experience level"} value={metricState} onChange={(v:SkillType["metric"])=>{
          setMetricState(v)
        }}/>
      </Container>
    </CollapseItem>
  )
}

export default SkillInput





