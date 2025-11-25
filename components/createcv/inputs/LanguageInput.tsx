import LevelSelector from '@/components/ui/input/LevelSelector'
import LEVELS from '@/constants/LEVELS'
import MEDIAQUERIES from '@/constants/MEDIAQUERIES'
import { LanguageType } from '@/interfaces/cv.types'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { useCV } from '../../../contexts/AppContext'
import Input from '../../ui/input/Input'
import CollapseItem from '../CollapseItem'
const Container = styled.div`
flex-direction: column;
@media ${MEDIAQUERIES.laptopSmall}{
    flex-direction: row;
}`




const LanguageInput = ({ title, metric, edit, id }: LanguageType) => {
  const { t } = useTranslation(["create-cv", "common"])
  const { setCvObject, changeCvObject } = useCV()


  function changeLanguage(key: string, value: any) {
    changeCvObject(key, value, id, 'languages')
  }


  const onDelete = () => {
    setCvObject(prev => ({
      ...prev,
      languages: prev.languages.filter(el => el.id !== id)
    }))
  }




  return (
    <CollapseItem
      onDelete={onDelete}
      title={title || t("not-specified")}
      subtitle={metric ? LEVELS[metric] : t("not-specified")}
      open={edit}
      setOpen={(value) => changeLanguage("edit", value)}>
      <Container className='flex gap-4'>
        <Input label={t('language')} value={title} setValue={(value) => changeLanguage("title", value)} />
        <LevelSelector label={t('level')} value={metric} onChange={(v) => changeLanguage("metric", v)} />
      </Container>
    </CollapseItem>
  )
}

export default LanguageInput





