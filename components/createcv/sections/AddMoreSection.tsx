import React from 'react'
import styled from 'styled-components'
import { CVcategories, CvObjectType, useCVcontext } from '../../../contexts/AppContext'
import { useTranslation } from 'next-i18next'
import { Button } from '../../../styles/global'


const Container = styled.div`
display: flex;
flex-wrap: wrap;
`
const AddMoreSection = () => {
    const { t } = useTranslation("create-cv")
    const { cvObject, setCvObject }: { cvObject: CvObjectType, setCvObject: React.Dispatch<React.SetStateAction<any>> } = useCVcontext()
  
  
    const isPresent = (key: string) => {
        return Object.keys(cvObject).includes(key)
      }
    
  return (
    <Container className='flex w-full max-w-full gap-4'>
    {CVcategories.filter(el => !isPresent(el)).map(el => <Button type="button" className='ghost' key={el} onClick={() => { setCvObject((prev: CvObjectType) => ({ ...prev, [el]: [] })) }}>+ {t(el)}</Button>)
    }
  </Container>
  )
}

export default AddMoreSection