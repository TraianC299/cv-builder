import { ReactNode } from 'react'
import styled from 'styled-components'
import { Button } from '../../styles/global'
import { useCV } from '../../contexts/AppContext'
import { DefaultTFuncReturn } from 'i18next'
import { useTranslation } from 'next-i18next'
import COLORS from '@/constants/COLORS'
import { CvListKey } from 'interfaces/cv.types'


const TitleContainer = styled.div`
>svg{
  opacity: 1;
  cursor: pointer;
}
`

const Section = ({ children, title, subtitle, onClick, objectKey, deletable }: {
  children: ReactNode, 
  title?: string | DefaultTFuncReturn, 
  subtitle?: string | DefaultTFuncReturn, 
  onClick?: Function,
  objectKey?: CvListKey,
  deletable?: boolean
}) => {
  const { cvObject, setCvObject } = useCV()
  const { t } = useTranslation(["create-cv", "common"])


  const isPresent = (key: CvListKey) => {
    return Object.keys(cvObject).includes(key)
  }

  return (
    <section>
      <div className='flex jsb ac mb-4'>
        <div>
          <TitleContainer className='flex ac jfs gap-4 transition'>
            {deletable && <Button
              type='button'
              onClick={() => setCvObject((prev) => { const newCvObject = { ...prev }; newCvObject[objectKey as CvListKey] = []; return newCvObject })}
            >delete</Button>
            }
            <h3 className='h5 font-normal'>{title}</h3>
          </TitleContainer>
          <p style={{ color: COLORS.GREY }} className='sp'>{subtitle}</p>
        </div>
        {onClick && <Button className='small' disabled={!isPresent(objectKey as CvListKey)} onClick={e => { e.preventDefault(); onClick() }}>+ {t("add-new")}</Button>}
      </div>
      {children}
    </section>
  )
}

export default Section