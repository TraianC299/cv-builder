import React, { useEffect } from 'react'
import ImageInput from './ImageInput'
import styled from 'styled-components'
import { InputStyle } from '../../../styles/global'
import { useTranslation } from 'next-i18next'
import COLORS from '@/constants/COLORS'
import { ImSpinner2 } from 'react-icons/im'
import { BiCheck } from 'react-icons/bi'



const Container = styled.div`
display: flex;
flex-direction:column;
justify-content: flex-start;
align-items: flex-start;
position:relative;
height: fit-content;
width: 100%;
>p{
  font-size: 0.8rem;
  padding: 0.1rem 0.5rem;
}
>label{
  color: ${COLORS.GREY};
  margin-bottom: 0.4rem;
  line-height: 20px;
}
`


const SelectImageLabel = styled(InputStyle)`
display: flex;
justify-content: center;
align-items: center;
background:white;
transition: all 0.3s;
cursor: pointer;
box-shadow: inset 0px 0px 0px 2px ${COLORS.BLACK};

>*{
  color: ${COLORS.BLACK};
}


&.selected{
  background: ${COLORS.BLACK};
  >*{
    color:white;
  }
}


`
type ButtonInputImageProps = {
  image: string,
  setImage: (image: string) => void,
  imageError?: string,
  setImageError?: (error: string) => void,
  label: string,
  postInputLabel?: string
  [key: string]: any

}
const ButtonInputImage = ({image, setImage, imageError, setImageError, label, postInputLabel, ...props}:ButtonInputImageProps) => {
    const [loading, setLoading] = React.useState(false)
    const {t} = useTranslation("create-cv")
 
  return (
   <ImageInput resize={400} loading={loading} setLoading={setLoading} imageUrl={image} setImageUrl={setImage}  {...props}>
    <Container>
      <img style={{display: "none"}} onError={()=>setImage("")} src={image}></img>
      <label className='sp'>{t("your-photo")}</label>
      <SelectImageLabel as="label"  style={{borderColor: imageError?COLORS.RED:loading?COLORS.GREY:COLORS.BLACK}}   className={`${image?"selected":""}`}>
      {loading &&<ImSpinner2 className='h6' style={{animation:"rotation 1s infinite"}}/>}
      {image && <BiCheck className='h6' color='white'/>}
      {!loading && !image && <p style={{color: imageError?COLORS.RED:COLORS.BLACK}}>{imageError ? "..." : label }</p>}
      </SelectImageLabel>
    </Container>
</ImageInput>
  )
}

export default ButtonInputImage