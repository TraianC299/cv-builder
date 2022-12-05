import {  ReactPropTypes, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { DARKGREY } from "../../../data/contants";
import { InputStyle } from "../../../styles/global";

// Dealing with Textarea Height
function calcHeight(value:any) {
    let numberOfLineBreaks = (value.match(/\n/g) || []).length;
    // min-height + lines x line-height + padding + border
    let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
    return newHeight;
  }





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


const AutosizeTextArea = styled(InputStyle)`
  padding-top: 15px;
  padding-bottom:0;`


  interface Props {
      value: string,
      setValue: React.Dispatch<React.SetStateAction<string>>,
      label?: string
      validation?: Function,
        error?: string,
        setError?: Function,
  }
const AutosizeInput:React.FC<Props> = ({setValue, value,label, ...props}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);







    const onKeyUp = () => {
      if(textareaRef.current){
        textareaRef.current.style.height = calcHeight(textareaRef.current.value) + "px";
      }
    }



    return (
        <Container>
          <label htmlFor={label} className="sp">{label}</label>
          <AutosizeTextArea  onKeyUp={onKeyUp} as="textarea" value={value}  onChange={e=>setValue(e.target.value)} ref={textareaRef}></AutosizeTextArea>
        </Container>
    )
}


export default AutosizeInput
