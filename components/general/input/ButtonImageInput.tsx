import React from 'react'
import ImageInput from './ImageInput'
import styled from 'styled-components'
import { LIGHTGREY, MAINCOLOR, RED } from '../../../data/contants'
import { InputStyle } from '../../../styles/global'


const SelectImageLabel = styled(InputStyle)`
display: flex;
justify-content: center;
align-items: center;
background:white;
transition: all 0.3s;
cursor: pointer;
margin-top: 1.3rem;
>*{
  color: ${MAINCOLOR};
}


&.selected{
  background: ${MAINCOLOR};
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
  return (
   <ImageInput resize={200} loading={loading} setLoading={setLoading} imageUrl={image} setImageUrl={setImage}  {...props}>
    <SelectImageLabel as="label"  style={{borderColor: imageError?RED:loading?LIGHTGREY:MAINCOLOR}}   className={`dashedBorder ${image?"selected":""}`}>
    {loading?
    // <Spinner style={{animation:"rotation 1s infinite"}}></Spinner>
    <p style={{animation:"rotation 1s infinite"}}>⌛</p>
    :<p style={{color: imageError?RED:image?"white":MAINCOLOR}}>{imageError ? "Nicio Imagine" : image ? postInputLabel : label }</p>}
    </SelectImageLabel>
</ImageInput>
  )
}

export default ButtonInputImage