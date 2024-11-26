import React, { useState } from 'react'
import Input from '../../ui/input/Input'
import CollapseItem from '../CollapseItem'
import useDidMountEffect from '../../../hooks/useDidMountEffect'
import { CvObjectType, EmploymentType, useCV } from '../../../contexts/AppContext'
import AutosizeInput from '../../ui/input/AutosizeInput'
import MonthYearSelector from '../../ui/input/MonthYearSelector'
import { useTranslation } from 'next-i18next'




const EmploymentInput = ({title, employer,city, description, edit, startDate, endDate, id}:EmploymentType) => {
    const {cvObject, setCvObject} = useCV()
    const [open, setOpen] = useState(edit?true:false)
    const [titleState, setTitleState] = useState(title || "")
    const [employerState, setEmployerState] = useState(employer || "")
    const [descriptionState, setDescriptionState] = useState(description || "")
    const [cityState, setCityState] = useState(city || "")
    const [startDateState, setStartDateState] = useState(startDate || "")
    const [endDateState, setEndDateState] = useState(endDate || "")

    const {t} = useTranslation(["create-cv", "common"])

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
  setCvObject((prev)=>({
    ...prev, employment:skillsPlaceholder
  }))
},[titleState, descriptionState, cityState, startDateState, endDateState, employerState])

const deleteEmployment = () => {
  setCvObject((prev: CvObjectType) => ({
    ...prev,
    employment: prev.employment.filter(el => el.id !== id)
  }))
}

  return (
    <CollapseItem 
      onDelete={deleteEmployment}
      title={titleState || t("not-specified")} 
      subtitle={employerState || t("not-specified")} 
      open={open} 
      setOpen={setOpen}>
      <div className='flex column gap-4'>
        <div  className='flex gap-4'>
          <Input label={t("job-title")} value={titleState} setValue={setTitleState}></Input>
          <Input label={t("employer")} value={employerState} setValue={setEmployerState} ></Input>
        </div>
        <div  className='flex gap-4'>
          <div style={{ width:"100%"}} className='flex gap-4'>
              <MonthYearSelector  value={startDateState} setValue={setStartDateState} label="Start Date"></MonthYearSelector>
              <MonthYearSelector value={endDateState} setValue={setEndDateState} label={t("end-date")}></MonthYearSelector>
          </div>
          <Input label={t("city")} value={cityState} setValue={setCityState} ></Input>
        </div>
      <AutosizeInput label={t("description")} value={descriptionState} setValue={setDescriptionState}></AutosizeInput>
      </div>
    </CollapseItem>
  )
}








export default EmploymentInput