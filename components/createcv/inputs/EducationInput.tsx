import React, { useState } from 'react'
import Input from '../../system/input/Input'
import CollapseItem from '../CollapseItem'
import useDidMountEffect from '../../../hooks/useDidMountEffect'
import { CvObjectType, EducationType, useCV } from '../../../contexts/AppContext'
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
    id,
    edit,
    startDate,
    endDate,
    onDelete
}:Props) => {
  const {t} = useTranslation(["create-cv", "common"])
    const {cvObject, setCvObject}:{cvObject:CvObjectType, setCvObject:React.Dispatch<React.SetStateAction<any>>} = useCV()
    const [open, setOpen] = useState(edit?true:false)
    const [schoolState, setSchoolState] = useState(school || "")
    const [degreeState, setDegreeState] = useState(degree || "")
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
    startDate: startDateState,
    endDate: endDateState
  }
  setCvObject((prev:CvObjectType)=>({
    ...prev, education:skillsPlaceholder
  }))
},[schoolState, cityState, startDateState, endDateState, degreeState])



  return (
    <CollapseItem 
    onDelete={onDelete}
      title={schoolState?`${schoolState} - ${degreeState}` : t("not-specified")} 
      subtitle={startDateState?`${startDateState} - ${endDateState}` : t("not-specified")} 
      open={open} 
      setOpen={setOpen}>
      <div className='flex column gap-4'>
        <div className='flex gap-4'>
          <Input label="School" value={schoolState} setValue={setSchoolState}></Input>
          <Input label="Degree" value={degreeState} setValue={setDegreeState} ></Input>
        </div>
        <div className='flex gap-4'>
          <div style={{width:"100%"}} className='flex gap-4'>
              <MonthYearSelector  value={startDateState} setValue={setStartDateState} label={t("start-date")}></MonthYearSelector>
              <MonthYearSelector value={endDateState} setValue={setEndDateState} label={t("end-date")}></MonthYearSelector>
          </div>
          <Input label={t("city")} value={cityState} setValue={setCityState} ></Input>
        </div>
      </div>
    </CollapseItem>
  )
}








export default EducationInput