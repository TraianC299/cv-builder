import {  ReactPropTypes, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { InputStyle } from "../../../styles/global";


const AutosizeTextArea = styled(InputStyle).attrs({
    as: "textarea"
  })`
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
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    },[value])


    const onKeyPressEnterNewLine = useCallback((e:React.KeyboardEvent) => {
        if(e.key === "Enter"){
            e.preventDefault();
            setValue(value+"\n")
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    },[value])



    return (
        <AutosizeTextArea  
            ref={textareaRef}
            onChange={e=>setValue(e.target.value)} 
            value={value} 
            onKeyDownCapture={(e)=>onKeyPressEnterNewLine(e)}
            label={label}
            {...props}
            ></AutosizeTextArea>
    )
}


export default AutosizeInput
