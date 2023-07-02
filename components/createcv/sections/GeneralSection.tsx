import React from 'react'
import Section from '../Section'
import OptionSelector from '@/components/system/input/OptionSelector'
import TemplateSelector from '../inputs/TemplateSelector'
import { useRouter } from 'next/router'
import LANGUAGES from '@/constants/LANGUAGES'
import { useTranslation } from 'next-i18next'
import ColorSelector from '@/components/system/input/ColorSelector'

const GeneralSection = () => {
    const { t } = useTranslation(["create-cv", "common"])
    const router = useRouter()
    const { pathname, asPath, query, locale } = router

  return (
    <Section title="General">
    <div className='flex column gap-4'>
      <ColorSelector></ColorSelector>
      <OptionSelector onChange={v=>router.push({ pathname, query }, asPath, { locale: v })} value={locale} label={t("language")} options={LANGUAGES.map(el=>({value:el.locale, label:`${el.emoji} ${t(el.translationKey)}`}))}/>
      <TemplateSelector></TemplateSelector>
    </div>
  </Section>
  )
}

export default GeneralSection