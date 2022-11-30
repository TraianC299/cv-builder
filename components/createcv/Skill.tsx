import React, { useEffect, useState } from 'react'
import Input from '../general/input/Input'
import OptionSelector from '../general/input/OptionSelector'
import CollapseItem from './CollapseItem'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import { SkillType } from '../../contexts/AppContext'



const experienceLevels = [{label:"Novice", value:1},
{label:"Beginner", value:2},
{label:"Skillful", value:3},
{label:"Experienced", value:4},
{label:"Expert", value:5}]
const Skill = ({title, metric, skills, setSkills, edit, id}:{
    title: string,
    metric: number,
    id: string,
    skills: [SkillType] | [],
    setSkills: React.Dispatch<React.SetStateAction<SkillType[]>>,
    edit:boolean
}) => {
    const [open, setOpen] = useState(edit?true:false)
    const [titleState, setTitleState] = useState(title || "Not specified")
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
    metric:metricState
  }
  setSkills(skillsPlaceholder)
},[titleState, metricState])



  return (
    <CollapseItem 
      title={titleState || "Not Specified"} 
      subtitle={experienceLevels.find(el=>el.value===metricState)?.label || "Not Specified either"} 
      open={open} 
      setOpen={setOpen}>
      <div style={{columnGap:"0.5rem"}} className='flex'>
        <Input value={titleState} setValue={setTitleState}></Input>
        <OptionSelector value={metricState} setValue={setMetricState} options={experienceLevels}></OptionSelector>
      </div>
    </CollapseItem>
  )
}

export default Skill





