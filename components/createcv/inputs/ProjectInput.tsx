import AutosizeInput from '@/components/ui/input/AutosizeInput'
import Input from '@/components/ui/input/Input'
import { ProjectType } from 'interfaces/cv.types'
import { useTranslation } from 'next-i18next'
import { useCV } from '../../../contexts/AppContext'
import CollapseItem from '../CollapseItem'

interface InputProps extends ProjectType {
  onDelete?: () => void,
}

const ProjectInput = ({ title, description, edit, startDate, endDate, id, onDelete }: InputProps) => {
  const { t } = useTranslation(["create-cv", "common"])
  const { changeCvObject } = useCV()


  function changeProject(key: string, value: any) {
    changeCvObject(key, value, id, 'projects')
  }

  return (
    <CollapseItem
      onDelete={onDelete}
      subtitle=''
      title={title || t("not-specified")}
      open={edit}
      setOpen={(value) => changeProject("edit", value)}>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <Input label={t("job-title")} value={title} setValue={(value) => changeProject("title", value)} ></Input>
        </div>
        <div className='flex gap-4'>
          <Input value={startDate}
            setValue={(value) => changeProject("startDate", value)}
            label={t("start-date")}></Input>
          <Input value={endDate}
            setValue={(value) => changeProject("endDate", value)}
            label={t("end-date")}></Input>
        </div>
        <AutosizeInput label={t("description")} value={description}
          setValue={(value) => changeProject("description", value)}
        ></AutosizeInput>
      </div>
    </CollapseItem>
  )
}


export default ProjectInput