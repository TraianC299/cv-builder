import React from 'react'
import styled from 'styled-components'
import { useCV } from '../../../contexts/AppContext'
import { useTranslation } from 'next-i18next'
import { Button } from '../../../styles/global'
import Section from '../Section'
import { initials } from '@/data/initals'
import { CvListKey } from '@/interfaces/cv.types'


const Container = styled.div`
display: flex;
flex-wrap: wrap;
`
const AddMoreSection = () => {
  const { t } = useTranslation(["create-cv", "common"])
  const { cvObject, addNew } = useCV()


  const isPresent = (key: CvListKey) => {
    return cvObject[key] && cvObject[key].length
  }

  const missing = Object.keys(initials).filter((el) => !isPresent(el as CvListKey))

  return (
    missing.length ? <Section title={t("others")}>
      <Container className='flex w-full max-w-full gap-4'>
        {missing.map(el => <Button type="button" className='ghost' key={el} onClick={() => addNew(el as CvListKey)}>+ {t(el)}</Button>)}
      </Container>
    </Section> : <></>
  )
}

export default AddMoreSection