import React, { useState } from 'react'
import Input from '../../system/input/Input'
import CollapseItem from '../CollapseItem'
import useDidMountEffect from '../../../hooks/useDidMountEffect'
import { CvObjectType, EducationType, useCVcontext } from '../../../contexts/AppContext'
import AutosizeInput from '../../system/input/AutosizeInput'
import MonthYearSelector from '../../system/input/MonthYearSelector'
import { useTranslation } from 'next-i18next'



interface Props extends EducationType{
  onDelete?:Function
}
const EducationInput = ({
    school,
    degree,
    city, 
    description,
    id,
    edit,
    startDate,
    endDate,
    onDelete
}:Props) => {
  const {t} = useTranslation("create-cv")
    const {cvObject, setCvObject}:{cvObject:CvObjectType, setCvObject:React.Dispatch<React.SetStateAction<any>>} = useCVcontext()
    const [open, setOpen] = useState(edit?true:false)
    const [schoolState, setSchoolState] = useState(school || "")
    const [degreeState, setDegreeState] = useState(degree || "")
    const [descriptionState, setDescriptionState] = useState(description || "")
    const [cityState, setCityState] = useState(city)
    const [startDateState, setStartDateState] = useState(startDate || "")
    const [endDateState, setEndDateState] = useState(endDate || "")


useDidMountEffect(()=>{
  setOpen(edit)
},[edit])

useDidMountEffect(()=>{
  const index = cvObject.education.findIndex(el=>el.id===id)
  const skillsPlaceholder = [...cvObject.education]
  skillsPlaceholder[index] = {
    id:id,
    school:schoolState,
    degree: degreeState,
    city: cityState,
    edit: edit,
    description:descriptionState,
    startDate: startDateState,
    endDate: endDateState
  }
  setCvObject((prev:CvObjectType)=>({
    ...prev, education:skillsPlaceholder
  }))
},[schoolState, descriptionState, cityState, startDateState, endDateState, degreeState])



  return (
    <CollapseItem 
    onDelete={onDelete}
      title={schoolState?`${schoolState} - ${degreeState}` : t("not-specified")} 
      subtitle={startDateState?`${startDateState} - ${endDateState}` : t("not-specified")} 
      open={open} 
      setOpen={setOpen}>
      <div style={{columnGap:"0.5rem"}} className='flex'>
        <Input label="School" value={schoolState} setValue={setSchoolState}></Input>
        <Input label="Degree" value={degreeState} setValue={setDegreeState} ></Input>
      </div>
      <div style={{columnGap:"0.5rem"}} className='flex'>
        <div style={{columnGap:"0.5rem", width:"100%"}} className='flex'>
            <MonthYearSelector  value={startDateState} setValue={setStartDateState} label={t("start-date")}></MonthYearSelector>
            <MonthYearSelector value={endDateState} setValue={setEndDateState} label={t("end-date")}></MonthYearSelector>
        </div>
        <Input label={t("city")} value={cityState} setValue={setCityState} ></Input>
      </div>
      <AutosizeInput label={t("description")} value={descriptionState} setValue={setDescriptionState}></AutosizeInput>
    </CollapseItem>
  )
}








export default EducationInput