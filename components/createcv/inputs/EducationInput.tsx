import { CvObjectType, EducationType } from '@/interfaces/cv.types'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useCV } from '../../../contexts/AppContext'
import useDidMountEffect from '../../../hooks/useDidMountEffect'
import Input from '../../ui/input/Input'
import CollapseItem from '../CollapseItem'



const EducationInput = ({
  school,
  degree,
  city,
  id,
  edit,
  startDate,
  endDate,
}: EducationType) => {
  const { t } = useTranslation(["create-cv", "common"])
  const { setCvObject, changeCvObject } = useCV()



  const deleteEducation = () => {
    setCvObject((prev) => ({
      ...prev,
      education: prev.education.filter(el => el.id !== id)
    }))
  }


  function changeCV(key: string, value: any) {
    changeCvObject(key, value, id, 'education')
  }


  return (
    <CollapseItem
      onDelete={deleteEducation}
      title={school ? `${school} - ${degree}` : t("not-specified")}
      subtitle={startDate ? `${startDate} - ${endDate}` : t("not-specified")}
      open={edit}
      setOpen={(value) => changeCV("edit", value)}>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <Input label="School" value={school} setValue={(value) => changeCV("school", value)} />
          <Input label="Degree" value={degree} setValue={(value) => changeCV("degree", value)} />
        </div>
        <div className='flex gap-4'>
          <div style={{ width: "100%" }} className='flex gap-4'>
            <Input value={startDate} setValue={(value) => changeCV("startDate", value)}
            label={t("start-date")}></Input>
            <Input value={endDate} setValue={(value) => changeCV("endDate", value)}
            label={t("end-date")}></Input>
          </div>
          <Input label={t("city")} value={city} setValue={(value) => changeCV("city", value)}
          ></Input>
        </div>
      </div>
    </CollapseItem>
  )
}








export default EducationInput