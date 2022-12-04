import React, { useState } from 'react'
import Input from '../general/input/Input'
import CollapseItem from './CollapseItem'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import { CvObjectType, EmploymentType, useCVcontext } from '../../contexts/AppContext'
import AutosizeInput from '../general/input/AutosizeInput'
import MonthYearSelector from '../general/input/MonthYearSelector'




const EmploymentInstance = ({title, employer,city, description, edit, startDate, endDate, id}:EmploymentType) => {
    const {cvObject, setCvObject}:{cvObject:CvObjectType, setCvObject:React.Dispatch<React.SetStateAction<any>>} = useCVcontext()
    const [open, setOpen] = useState(edit?true:false)
    const [titleState, setTitleState] = useState(title || "")
    const [employerState, setEmployerState] = useState(employer || "")
    const [descriptionState, setDescriptionState] = useState(description || "")
    const [cityState, setCityState] = useState(city || "")
    const [startDateState, setStartDateState] = useState(startDate || "")
    const [endDateState, setEndDateState] = useState(endDate || "")


useDidMountEffect(()=>{
  setOpen(edit)
},[edit])

useDidMountEffect(()=>{
  const index = cvObject.employment.findIndex(el=>el.id===id)
  const skillsPlaceholder = [...cvObject.employment]
  skillsPlaceholder[index] = {
    id:id,
    title:titleState,
    employer: employerState,
    city: cityState,
    edit: edit,
    description:descriptionState,
    startDate: startDateState,
    endDate: endDateState
  }
  setCvObject((prev:CvObjectType)=>({
    ...prev, employment:skillsPlaceholder
  }))
},[titleState, descriptionState, cityState, startDateState, endDateState, employerState])



  return (
    <CollapseItem 
      title={titleState || "Not Specified"} 
      subtitle={employerState || "Not Specified either"} 
      open={open} 
      setOpen={setOpen}>
      <div style={{columnGap:"0.5rem"}} className='flex'>
        <Input label="Job title" value={titleState} setValue={setTitleState}></Input>
        <Input label="Employer" value={employerState} setValue={setEmployerState} ></Input>
      </div>
      <div style={{columnGap:"0.5rem"}} className='flex'>
        <div style={{columnGap:"0.5rem", width:"100%"}} className='flex'>
            <MonthYearSelector  value={startDateState} setValue={setStartDateState} label="Start Date"></MonthYearSelector>
            <MonthYearSelector value={endDateState} setValue={setEndDateState} label="End Date"></MonthYearSelector>
        </div>
        <Input label="City" value={cityState} setValue={setCityState} ></Input>
      </div>
      <AutosizeInput label='Description' value={descriptionState} setValue={setDescriptionState}></AutosizeInput>
    </CollapseItem>
  )
}








export default EmploymentInstance