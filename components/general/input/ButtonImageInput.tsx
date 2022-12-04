import React, { useEffect } from 'react'
import ImageInput from './ImageInput'
import styled from 'styled-components'
import { DARKGREY, LIGHTGREY, MAINCOLOR, RED } from '../../../data/contants'
import { InputStyle } from '../../../styles/global'



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
  color: ${DARKGREY};
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
box-shadow: inset 0px 0px 0px 2px ${MAINCOLOR};

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

 

    // useEffect(()=>{
    //   setImage("")
    // },[])
  return (
   <ImageInput resize={200} loading={loading} setLoading={setLoading} imageUrl={image} setImageUrl={setImage}  {...props}>
    <Container>
      <img style={{display: "none"}} onError={()=>setImage("")} src={image}></img>
      <label className='sp'>Your photo</label>
      <SelectImageLabel as="label"  style={{borderColor: imageError?RED:loading?LIGHTGREY:MAINCOLOR}}   className={`${image?"selected":""}`}>
      {loading?
      // <Spinner style={{animation:"rotation 1s infinite"}}></Spinner>
      <p style={{animation:"rotation 1s infinite"}}>⌛</p>
      :<p style={{color: imageError?RED:image?"white":MAINCOLOR}}>{imageError ? "Nicio Imagine" : image ? postInputLabel : label }</p>}
      </SelectImageLabel>
    </Container>
</ImageInput>
  )
}

export default ButtonInputImage