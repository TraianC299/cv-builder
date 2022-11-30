import React, { useEffect, useRef } from 'react'
import styled from "styled-components"
import { GREYWHITE, LIGHTGREY, MAINCOLOR } from '../../data/colors'
import {  RED } from '../../styles/styles'


const InputContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
>p{
    font-size: 0.9rem;
}`


const InputStyle = styled.input`
width: 100%;
padding: 0.55rem;
border: none;
border-bottom: 1.5px solid ${MAINCOLOR};
font-size: 1rem;
font-family: inherit;
font-size: inherit;
:focus{
    outline: none;
}

&.error{
    border-bottom: 1.5px solid ${RED};
}
`



const LineInput = ({button, error, setError, placeholder, value, setValue, ...props}) => {
    const textArea = useRef(null)

    useEffect(()=>{
        textArea.current.style.height = "auto";
        textArea.current.style.height = textArea.current.scrollHeight + "px";
    },[value])
    return (
        <InputContainer>
            <InputStyle 
            as="textarea"
            ref={textArea}
            onFocus={()=>{setError("")}}
            rows={1}
            maxLength={100}
            placeholder={placeholder}
            value={value}
            className={`lineInput ${error?"error":""}`}
            role="textbox"
            onChange={(e)=>setValue(e.target.value)}
            {...props}>
            </InputStyle>
            <p style={{color: RED}}>{error} </p>
        </InputContainer>
    )
}



export default LineInput