import { MouseEventHandler, ReactNode } from 'react'
import styled from 'styled-components'
import { Button } from '../../styles/global'
import {FaRegTrashAlt} from 'react-icons/fa'
import { CvObjectType, useCV } from '../../contexts/AppContext'
import { DefaultTFuncReturn } from 'i18next'
import { useTranslation } from 'next-i18next'
import COLORS from '@/constants/COLORS'
import Switch from '../system/input/Switch'







const TitleContainer = styled.div`
>svg{
  opacity: 1;
  cursor: pointer;
}
`

const Section = ({children, title, subtitle, onClick, objectKey, deletable}:{children:ReactNode, title?:string | DefaultTFuncReturn, subtitle?: string |DefaultTFuncReturn, onClick?:Function, 
  objectKey?:keyof CvObjectType, deletable?:boolean
}) => {
  const {cvObject, setCvObject} = useCV()
  const {t} = useTranslation(["create-cv", "common"])


  const onChange = (value:boolean)=>{
    console.log(value)
    if(value){
      setCvObject((prev:CvObjectType)=>{
        return {...prev, [objectKey as keyof CvObjectType]: []}
      })
    }else{
      const newCvObject = {...cvObject}
    delete newCvObject[objectKey as keyof CvObjectType]
    setCvObject(newCvObject)
    }
  
  }

  const isPresent = (key: string) => {
    return Object.keys(cvObject).includes(key)
  }

    return(
      <section>
        <div className='flex jsb ac mb-4'>
          <div>
            <TitleContainer className='flex ac jfs gap-4 transition'>
              {deletable && <Switch 
              value={isPresent(objectKey as string)} 
              onChange={value=>onChange(value)}/>}
              <h3 className='h5 font-normal'>{title}</h3>
            </TitleContainer>
            <p style={{color: COLORS.GREY}} className='sp'>{subtitle}</p>
          </div>
          {onClick && <Button className='small' disabled={!isPresent(objectKey as string)} onClick={e=>{e.preventDefault();onClick()}}>+ {t("add-new")}</Button>}
        </div>
        {children}
      </section>
    )
  }

  export default Section