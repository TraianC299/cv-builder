import { CvObjectType, EmploymentType } from '@/interfaces/cv.types'
import { useTranslation } from 'next-i18next'
import { useCV } from '../../../contexts/AppContext'
import AutosizeInput from '../../ui/input/AutosizeInput'
import Input from '../../ui/input/Input'
import CollapseItem from '../CollapseItem'


const EmploymentInput = ({ title, employer, city, description, edit, startDate, endDate, id }: EmploymentType) => {
  const { changeCvObject, setCvObject } = useCV()
  const { t } = useTranslation(["create-cv", "common"])


  function changeSkills(key: string, value: any) {
    changeCvObject(key, value, id, 'employment')
  }

  const deleteEmployment = () => {
    setCvObject((prev: CvObjectType) => ({
      ...prev,
      employment: prev.employment.filter(el => el.id !== id)
    }))
  }


  return (
    <CollapseItem
      onDelete={deleteEmployment}
      title={title || t("not-specified")}
      subtitle={employer || t("not-specified")}
      open={edit}
      setOpen={(value) => changeSkills("edit", value)}>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <Input label={t("job-title")} value={title} setValue={(value) => changeSkills("title", value)} ></Input>
          <Input label={t("employer")} value={employer} setValue={(value) => changeSkills("employer", value)} ></Input>
        </div>
        <div className='flex gap-4'>
          <div className='flex gap-4 w-full'>
            <Input
              value={startDate}
              setValue={(value) => changeSkills("startDate", value)}
              label={t('start-date')}></Input>
            <Input value={endDate}
              setValue={(value) => changeSkills("endDate", value)}
              label={t("end-date")}></Input>

          </div>
          <Input label={t("city")}
            value={city}
            setValue={(value) => changeSkills("city", value)}
          ></Input>
        </div>
        <AutosizeInput label={t("description")}
          value={description}
          setValue={(value) => changeSkills("description", value)}
        ></AutosizeInput>
      </div>
    </CollapseItem>
  )
}








export default EmploymentInput