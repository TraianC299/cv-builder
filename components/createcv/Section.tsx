import COLORS from '@/constants/COLORS'
import { CvListKey } from '@/interfaces/cv.types'
import { ReactNode } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import styled from 'styled-components'
import { useCV } from '../../contexts/AppContext'
import { Button } from '../../styles/global'


const TitleContainer = styled.div`
>svg{
  opacity: 1;
  cursor: pointer;
}
`

const Section = ({ children, title, subtitle, onClick, objectKey, deletable }: {
  children: ReactNode, 
  title?: string, 
  subtitle?: string, 
  onClick?: Function,
  objectKey?: CvListKey,
  deletable?: boolean
}) => {
  const { cvObject, setCvObject } = useCV()


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