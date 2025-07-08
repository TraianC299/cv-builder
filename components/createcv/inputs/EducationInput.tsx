import { CvObjectType, EducationType } from 'interfaces/cv.types'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useCV } from '../../../contexts/AppContext'
import useDidMountEffect from '../../../hooks/useDidMountEffect'
import Input from '../../ui/input/Input'
import MonthYearSelector from '../../ui/input/MonthYearSelector'
import CollapseItem from '../CollapseItem'



const EducationInput = ({
    school,
    degree,
    city, 
    id,
    edit,
    startDate,
    endDate,
}:EducationType) => {
  const {t} = useTranslation(["create-cv", "common"])
    const {cvObject, setCvObject} = useCV()
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



const deleteEducation = () => {
  setCvObject((prev) => ({
    ...prev,
    education: prev.education.filter(el => el.id !== id)
  }))
}
  return (
    <CollapseItem 
    onDelete={deleteEducation}
      title={schoolState?`${schoolState} - ${degreeState}` : t("not-specified")} 
      subtitle={startDateState?`${startDateState} - ${endDateState}` : t("not-specified")} 
      open={open} 
      setOpen={setOpen}>
      <div className='flex flex-col gap-4'>
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