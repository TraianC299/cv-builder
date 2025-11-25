import { EmploymentType } from '@/interfaces/cv.types'
import { useTranslation } from 'next-i18next'
import { useCV } from '../../../contexts/AppContext'
import AutosizeInput from '../../ui/input/AutosizeInput'
import Input from '../../ui/input/Input'
import CollapseItem from '../CollapseItem'


interface Props extends EmploymentType {
  onDelete?: Function,
  edit: boolean,
  id: string,
  title: string,
  employer: string,
  city: string,
  description: string,
  startDate: string,
  endDate: string

}


const InternshipInput = ({ title, employer, city, description, edit, startDate, endDate, id, onDelete }: Props) => {
  const { t } = useTranslation(["create-cv", "common"])
  const { changeCvObject } = useCV()


  function changeInternnship(key: string, value: any) {
    changeCvObject(key, value, id, 'internships')
  }


  return (
    <CollapseItem
      onDelete={onDelete}
      title={title || t("not-specified")}
      subtitle={employer || t("not-specified")}
      open={edit}
      setOpen={(value) => changeInternnship("edit", value)}>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <Input label={t("job-title")} value={title} setValue={(value) => changeInternnship("title", value)} ></Input>
          <Input label={t("employer")} value={employer} setValue={(value) => changeInternnship("employer", value)} ></Input>
        </div>
        <div className='flex gap-4'>
          <div className='flex gap-4 w-full'>
            <Input value={startDate} setValue={(value) => changeInternnship("startDate", value)}
              label={t("start-date")}></Input>
            <Input value={endDate}
              setValue={(value) => changeInternnship("endDate", value)}
              label={t("end-date")}></Input>
          </div>
          <Input label={t("city")} value={city}
            setValue={(value) => changeInternnship("city", value)}
          ></Input>
        </div>
        <AutosizeInput label={t("description")} value={description}
          setValue={(value) => changeInternnship("description", value)}
        ></AutosizeInput>
      </div>
    </CollapseItem>
  )
}








export default InternshipInput