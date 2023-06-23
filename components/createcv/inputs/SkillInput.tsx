import React, { useEffect, useState } from 'react'
import Input from '../../system/input/Input'
import OptionSelector from '../../system/input/OptionSelector'
import CollapseItem from '../CollapseItem'
import useDidMountEffect from '../../../hooks/useDidMountEffect'
import { SkillType } from '../../../contexts/AppContext'
import { useTranslation } from 'next-i18next'



const experienceLevels = [
{label:"Novice", value:1},
{label:"Beginner", value:2},
{label:"Skillful", value:3},
{label:"Experienced", value:4},
{label:"Expert", value:5}]
const SkillInput = ({title, metric, skills, setSkills, edit, id}:{
    title: string,
    metric: number,
    id: string,
    skills: [SkillType] | [],
    setSkills: React.Dispatch<React.SetStateAction<SkillType[]>>,
    edit:boolean
}) => {
  const {t} = useTranslation("create-cv")
    const [open, setOpen] = useState(edit?true:false)
    const [titleState, setTitleState] = useState(title || "")
    const [metricState, setMetricState] = useState(metric || 0)


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
      subtitle={experienceLevels.find(el=>el.value===metricState)?.label || t("not-specified")} 
      open={open} 
      setOpen={setOpen}>
      <div style={{columnGap:"0.5rem"}} className='flex'>
        <Input  label="Title" value={titleState} setValue={setTitleState}></Input>
        <OptionSelector label={"Experience level"} value={metricState} setValue={setMetricState} options={experienceLevels}></OptionSelector>
      </div>
    </CollapseItem>
  )
}

export default SkillInput





