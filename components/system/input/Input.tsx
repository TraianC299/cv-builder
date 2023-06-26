import React, { ReactNode } from 'react'
import styled from "styled-components"
import { InputStyle } from '../../../styles/global'
import COLORS from '@/constants/COLORS'


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

>input{
  :focus{
    + div {
      opacity: 1;
      transform: scaleX(1);


    }
  }
}

`







interface  InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  value: string,
  setValue:Function,
  label?: string | ReactNode,
  error?:string,
  setError?:Function,
  rows?:number,
  rowsMax?:number, 
  helperText?: string,
  validation?:Function, 
  placeholder?:string,
  props?: any[]
} 

const Input= ({value, setValue, label, error, setError, disabled, rows, rowsMax, helperText, validation,placeholder, ...props}:InputProps) => {

 
      return(
        <Input.Wrapper>
          {label&&<Input.Label>{label}</Input.Label>}
          <Input.Input
          value={value}
          setValue={setValue}
          placeholder={placeholder}
          {...props}
          />
          {error&&<Input.Error error={error}/>}
        </Input.Wrapper>
      )
    }
    
    
    export default Input
    


    Input.Wrapper = ({children}:{
      children: React.ReactNode
    }) => {
      return(
        <Container>{children}</Container>
      )
    }


    const LabelStyles = styled.label`
    color: ${COLORS.GREY};
    margin-bottom: 0.4rem;
    line-height: 20px;
    `
    Input.Label = ({children, ...rest}:{
      children:ReactNode
      [x:string]:any
    })=> {
      return(
        <LabelStyles className={`sp ${rest.className}`} {...rest}>{children}</LabelStyles>
      )
    }

    Input.Error = ({error}:{
      error:string
    })=> {

      return(
        <p style={{color: "red", }}>{error}</p>
      )
    }

    Input.Input = ({value, setValue, placeholder, ...props}:{
      value:string,
      setValue:Function,
      placeholder?:string,
      props?:any[]
    })=> {
      return(
        <InputStyle
        onChange={(e)=>setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
        {...props}
        ></InputStyle>
      )
    }



   