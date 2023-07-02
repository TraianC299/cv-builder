import React, { useState } from 'react'
import { CvObjectType, ProjectType, useCV } from '../../../contexts/AppContext'
import { useTranslation } from 'next-i18next'
import useDidMountEffect from 'hooks/useDidMountEffect'
import Input from '@/components/system/input/Input'
import CollapseItem from '../CollapseItem'
import AutosizeInput from '@/components/system/input/AutosizeInput'
import MonthYearSelector from '@/components/system/input/MonthYearSelector'

interface InputProps extends ProjectType{
    onDelete?: ()=>void
    }

const ProjectInput = ({title, description, edit, startDate, endDate, id, onDelete}:InputProps) => {
        const {t} = useTranslation(["create-cv", "common"])
          const {cvObject, setCvObject}:{cvObject:CvObjectType, setCvObject:React.Dispatch<React.SetStateAction<any>>} = useCV()
          const [open, setOpen] = useState(edit?true:false)
          const [titleState, setTitleState] = useState(title || "")
          const [descriptionState, setDescriptionState] = useState(description || "")
          const [startDateState, setStartDateState] = useState(startDate || "")
          const [endDateState, setEndDateState] = useState(endDate || "")
      
      
      useDidMountEffect(()=>{
        setOpen(edit)
      },[edit])
      
      useDidMountEffect(()=>{
        const index = cvObject.projects.findIndex(el=>el.id===id)
        const projectsPlaceholder = [...cvObject.projects]
        projectsPlaceholder[index] = {
          id:id,
          title:titleState,
          edit: edit,
          description:descriptionState,
          startDate: startDateState,
          endDate: endDateState
        }
        setCvObject((prev:CvObjectType)=>({
          ...prev, projects:projectsPlaceholder
        }))
      },[titleState, descriptionState, startDateState, endDateState])
      
      
      
        return (
          <CollapseItem
          onDelete={onDelete}
          subtitle=''
            title={titleState || t("not-specified")} 
            open={open} 
            setOpen={setOpen}>
            <div className='flex column gap-4'>
              <div className='flex gap-4'>
                <Input label={t("job-title")} value={titleState} setValue={setTitleState}></Input>
              </div>
              <div className='flex gap-4'>
                    <MonthYearSelector  value={startDateState} setValue={setStartDateState} label={t("start-date")}></MonthYearSelector>
                    <MonthYearSelector value={endDateState} setValue={setEndDateState} label={t("end-date")}></MonthYearSelector>
              </div>
              <AutosizeInput label={t("description")} value={descriptionState} setValue={setDescriptionState}></AutosizeInput>
            </div>
          </CollapseItem>
        )
      }


      export default ProjectInput