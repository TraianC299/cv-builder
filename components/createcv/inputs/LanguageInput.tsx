import React, {  useState } from 'react'
import Input from '../../system/input/Input'
import CollapseItem from '../CollapseItem'
import useDidMountEffect from '../../../hooks/useDidMountEffect'
import {  CvObjectType, LanguageType, useCV } from '../../../contexts/AppContext'
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




const LanguageInput = ({title, metric, edit, id}:LanguageType) => {
  const {t} = useTranslation(["create-cv", "common"])
  const [open, setOpen] = useState(edit?true:false)
  const [titleState, setTitleState] = useState(title || "")
  const [metricState, setMetricState] = useState<LanguageType["metric"]>(metric || null)
  const {cvObject,setCvObject} = useCV()
  const languages= cvObject.languages

useDidMountEffect(()=>{
  setOpen(edit)
},[edit])

useDidMountEffect(()=>{
  const index = languages.findIndex(el=>el.id===id)
  const languagesPlaceholder = [...languages]
  languagesPlaceholder[index] = {
    id:id,
    title:titleState,
    metric:metricState,
    edit: edit
  }
  setCvObject((prev)=>({
    ...prev,
    languages:languagesPlaceholder,
    }))

},[titleState, metricState])

const onDelete = ()=>{
    setCvObject(prev=>({
        ...prev,
        languages:prev.languages.filter(el=>el.id!==id)
    }))
}




  return (
    <CollapseItem 
        onDelete={onDelete} 
      title={titleState || t("not-specified")} 
      subtitle={metricState?LEVELS[metricState]:t("not-specified")}
      open={open} 
      setOpen={setOpen}>
      <Container className='flex gap-4'>
        <Input  label="Title" value={titleState} setValue={setTitleState}></Input>
        <LevelSelector label={"Experience level"} value={metricState} onChange={(v)=>{
          setMetricState(v)
        }}/>
      </Container>
    </CollapseItem>
  )
}

export default LanguageInput





