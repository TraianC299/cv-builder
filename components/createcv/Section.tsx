import { MouseEventHandler, ReactNode } from 'react'
import styled from 'styled-components'
import { Button } from '../../styles/global'
import {FaRegTrashAlt} from 'react-icons/fa'
import { CvObjectType, useCV } from '../../contexts/AppContext'
import { DefaultTFuncReturn } from 'i18next'
import { useTranslation } from 'next-i18next'
import COLORS from '@/constants/COLORS'







const TitleContainer = styled.div`
>svg{
  opacity: 0;
  cursor: pointer;
}
:hover{
  >svg{
    opacity: 1;
  }
}`

const Section = ({children, title, subtitle, onClick, objectKey, deletable}:{children:ReactNode, title?:string | DefaultTFuncReturn, subtitle?: string |DefaultTFuncReturn, onClick?:Function, 
  objectKey?:"summary" | "hobbies" | "skills" | "languages" | "employment" | "education" | "internships", deletable?:boolean
}) => {
  const {cvObject, setCvObject}:{cvObject:CvObjectType, setCvObject:React.Dispatch<React.SetStateAction<any>>} = useCV()
  const {t} = useTranslation("create-cv")
  const onDelete:MouseEventHandler<SVGSVGElement> = (e)=>{
    e.preventDefault()
    e.stopPropagation()
    console.log(objectKey)
    if(!objectKey) return
    const newCvObject = {...cvObject}
    delete newCvObject[objectKey]
    setCvObject(newCvObject)
  }

    return(
      <section>
        <div className='flex jsb ac mb-4'>
          <div>
            <TitleContainer className='flex ac jfs gap-4 transition'>
              <h3 className='h5 font-normal'>{title}</h3>
              {deletable && <FaRegTrashAlt onClick={onDelete} className='transition' color='red'/>}
            </TitleContainer>
            <p style={{color: COLORS.GREY}} className='sp'>{subtitle}</p>
          </div>
          {onClick && <Button className='small' onClick={e=>{e.preventDefault();onClick()}}>+ {t("add-new")}</Button>}
        </div>
        {children}
      </section>
    )
  }

  export default Section