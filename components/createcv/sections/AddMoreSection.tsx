import React from 'react'
import styled from 'styled-components'
import { CVcategories, CvObjectType, useCV } from '../../../contexts/AppContext'
import { useTranslation } from 'next-i18next'
import { Button } from '../../../styles/global'
import Section from '../Section'


const Container = styled.div`
display: flex;
flex-wrap: wrap;
`
const AddMoreSection = () => {
    const { t } = useTranslation("create-cv")
    const { cvObject, setCvObject }: { cvObject: CvObjectType, setCvObject: React.Dispatch<React.SetStateAction<any>> } = useCV()
  
  
    const isPresent = (key: string) => {
        return Object.keys(cvObject).includes(key)
      }
    
    const missing = CVcategories.filter(el => !isPresent(el))
    
  return (
    missing.length?<Section title={t("others")}>
      <Container className='flex w-full max-w-full gap-4'>
      {missing.map(el => <Button type="button" className='ghost' key={el} onClick={() => { setCvObject((prev: CvObjectType) => ({ ...prev, [el]: [] })) }}>+ {t(el)}</Button>)}
        </Container>
    </Section>:<></>
  )
}

export default AddMoreSection