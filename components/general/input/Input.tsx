import React from 'react'
import styled from "styled-components"
import {  DARKGREY, MAINCOLOR, RED } from '../../../data/contants'
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
>div{
  position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 2px;
    background-color: ${MAINCOLOR};
    border-radius: 0px 0px 2px 2px;
    pointer-events: none;
    opacity: 0;
    transform: scaleX(0.5);
    transition: 0.1s;
}
>input{
  :focus{
    + div {
      opacity: 1;
      transform: scaleX(1);


    }
  }
}

`







interface  InputProps{
  value: string,
  setValue:Function,
  label?: string,
  error?:string,
  setError?:Function,
  disabled?: boolean,
  defaultValue?: string,
  rows?:number,
  rowsMax?:number, 
  helperText?: string,
  validation?:Function, 
  placeholder?:string,
  onFocusCapture?:Function,
  props?: any[]
}

const Input:React.FC<InputProps> = ({value, setValue, label, error, setError, disabled, rows, rowsMax, helperText, validation,placeholder,onFocusCapture, ...props}) => {

    // function handleChange (e:InputEvent){
    //   e.preventDefault()
    
    // if (typeof(e.target.value)==undefined || !setValue){
    //     return null
    // }else{
    //     setValue(e.target.value)
    //    }}
    
    
    
    const validationnn = () => {
     if(validation&&setError){
       validation(value)?setError(validation(value)):setError(null)
     }else{
       return null
     }
    }
    
    const onFocus = (e:React.FocusEvent<HTMLInputElement, Element>) => {
      e.preventDefault()
    
      if(setError){
        setError(false)
      }
    }
    const onBlur = (e:React.FocusEvent<HTMLInputElement, Element>) => {
      e.preventDefault()
      validationnn()
    }
    
    
      return(
        <Container >
          <label htmlFor={label} className="sp">{label}</label>
          <InputStyle
          id={label} name={label}
          onChange={(e)=>setValue(e.target.value)}
          onBlur={(e)=>onBlur(e)}
          onFocus={(e)=>onFocus(e)}
          value={value}
          placeholder={placeholder}
          onFocusCapture={(e)=>onFocusCapture?onFocusCapture(e):null}
          {...props}
          

          ></InputStyle>
          {/* <p style={{color: RED}}>{error}</p> */}
          <div ></div>
          
        </Container>
      )
    }
    
    
    export default Input
    