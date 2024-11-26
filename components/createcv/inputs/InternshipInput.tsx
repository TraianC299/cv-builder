import { EmploymentType } from 'interfaces/cv.types'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useCV } from '../../../contexts/AppContext'
import useDidMountEffect from '../../../hooks/useDidMountEffect'
import AutosizeInput from '../../ui/input/AutosizeInput'
import Input from '../../ui/input/Input'
import MonthYearSelector from '../../ui/input/MonthYearSelector'
import CollapseItem from '../CollapseItem'


interface Props extends EmploymentType{
  onDelete?:Function,
  edit:boolean,
  id:string,
  title:string,
  employer:string,
  city:string,
  description:string,
  startDate:string,
  endDate:string

}


const InternshipInput = ({title, employer,city, description, edit, startDate, endDate, id, onDelete}:Props) => {
  const {t} = useTranslation(["create-cv", "common"])
    const {cvObject, setCvObject} = useCV()
    const [open, setOpen] = useState<boolean>(edit?true:false)
    const [titleState, setTitleState] = useState<string>(title || "")
    const [employerState, setEmployerState] = useState<string>(employer || "")
    const [descriptionState, setDescriptionState] = useState<string>(description || "")
    const [cityState, setCityState] = useState<string>(city || "")
    const [startDateState, setStartDateState] = useState<string>(startDate || "")
    const [endDateState, setEndDateState] = useState<string>(endDate || "")


useDidMountEffect(()=>{
  setOpen(edit)
},[edit])

useDidMountEffect(()=>{
  const index = cvObject.internships.findIndex(el=>el.id===id)
  const internshipsPlaceholder = [...cvObject.internships]
  internshipsPlaceholder[index] = {
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
    ...prev,
    internships:internshipsPlaceholder,
    }))
},[titleState, descriptionState, cityState, startDateState, endDateState, employerState])



  return (
    <CollapseItem 
    onDelete={onDelete}
      title={titleState || t("not-specified")} 
      subtitle={employerState || t("not-specified")} 
      open={open} 
      setOpen={setOpen}>
      <div className='flex column gap-4'>
        <div className='flex gap-4'>
          <Input label={t("job-title")} value={titleState} setValue={setTitleState}></Input>
          <Input label={t("employer")} value={employerState} setValue={setEmployerState} ></Input>
        </div>
        <div className='flex gap-4'>
          <div style={{width:"100%"}} className='flex gap-4'>
              <MonthYearSelector  value={startDateState} setValue={setStartDateState} label={t("start-date")}></MonthYearSelector>
              <MonthYearSelector value={endDateState} setValue={setEndDateState} label={t("end-date")}></MonthYearSelector>
          </div>
          <Input label={t("city")} value={cityState} setValue={setCityState} ></Input>
        </div>
        <AutosizeInput label={t("description")} value={descriptionState} setValue={setDescriptionState}></AutosizeInput>
      </div>
    </CollapseItem>
  )
}








export default InternshipInput