import { ReactNode } from 'react'
import styled from 'styled-components'
import { Button } from '../../styles/global'
import { useCV } from '../../contexts/AppContext'
import { DefaultTFuncReturn } from 'i18next'
import { useTranslation } from 'next-i18next'
import COLORS from '@/constants/COLORS'
import { CvListKey } from 'interfaces/cv.types'
import { FiTrash2 } from 'react-icons/fi'


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
      <div className='flex justify-between items-center mb-4'>
        <div>
          <TitleContainer className='flex items-center justify-start gap-4 transition'>
            {deletable && <Button
            background={COLORS.RED}
              type='button'
              className='small icon'
              onClick={() => setCvObject((prev) => { const newCvObject = { ...prev }; newCvObject[objectKey as CvListKey] = []; return newCvObject })}
            ><FiTrash2 color={COLORS.WHITE}/></Button>
            }
            <h3 className='text-2xl font-normal'>{title}</h3>
          </TitleContainer>
          <p style={{ color: COLORS.GREY }} className='text-sm'>{subtitle}</p>
        </div>
        {onClick && <Button className='small icon' disabled={!isPresent(objectKey as CvListKey)} onClick={e => { e.preventDefault(); onClick() }}>+</Button>}
      </div>
      {children}
    </section>
  )
}

export default Section