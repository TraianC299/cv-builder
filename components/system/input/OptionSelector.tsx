import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import useClickOutside from '../../../hooks/useClickOutside'
import Input from './Input'
import COLORS from '@/constants/COLORS'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

const Container = styled.div`
position: relative;
background-color: transparent;
height: fit-content;
width: 100%;
>.time-picker-button{
    position: absolute;
    bottom: 0px;
    right: 0.5rem;
    border: none;
    background: transparent;
    padding: 0.75rem 0;
}
`


const StyledAutocompleteContainer = styled.div`
background: ${COLORS.WHITE};
z-index: 3;
width: 100%;
height: fit-content;
position: absolute;
top:105%;
max-height: 20rem;
overflow: scroll;
background-color: transparent;
border-radius: 0.5rem;
background: ${COLORS.WHITE};
padding: 0.5rem;


`
const TagContainer = styled.div`
text-align: left;
width: 100%;
display: flex;
align-items: center;
padding-left: 1rem;
height: 3rem;
cursor: pointer;
position: relative;

:hover{
    background-color: ${COLORS.MAINCOLOR}20;
}
>img{
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    margin-right: 0.5rem;
}

&.selected{
    background-color: ${COLORS.MAINCOLOR};
    color: white;
}
`



const getInitialValue = (value:OptionSelectorProps["value"], options:OptionSelectorProps["options"]) => {
    const option = options.find(option => option.value === value)
    return option?option.label:""
}


type OptionSelectorProps = {
    options: {label:string, value:any}[] | [],
    value: any,
    onChange: (value:any) => void,
    noAddOption?: boolean,
    label: string,
    props?: React.PropsWithChildren[]
}

const OptionSelector = ({options=[], value, noAddOption, label, onChange, ...props}:OptionSelectorProps) => {
    const [relevantOptions, setRelevantOptions] = React.useState([...options])
    const [focus, setFocus] = React.useState(false)
    const [inputValue, setInputValue] = useState<string>(value?getInitialValue(value, options):"")
    const ref = useRef(null);
    useClickOutside(ref.current, () => setFocus(false))




    useEffect(()=>{
        setRelevantOptions([...options])
    },[options])






    const complete = ({label, value}:{label:OptionSelectorProps["label"], value:OptionSelectorProps["value"]}) => {
        setFocus(false)
        setInputValue(label)
        onChange(value)
    }
   

    return (
            <Container ref={ref} >
            <Input  label={label}  placeholder={label} value={inputValue}  setValue={()=>{}}  onFocusCapture={()=>setFocus(true)} {...props} ></Input>
            {focus?<StyledAutocompleteContainer style={{pointerEvents:focus?"all":"none", opacity:focus?"1":"0"}} className='shadow-md'>
                {relevantOptions.map(option => <Tag 
                    onClick={()=>complete({...option})} 
                    key={option.label}
                    label={option.label}
                    selected={value?value===option.value:false}
                    ></Tag>)}
            </StyledAutocompleteContainer>:null}
            <button className="time-picker-button pointer" onClick={(e)=>{e.preventDefault();setFocus(previous=>!previous)}} color={COLORS.LIGHTGREY} >{focus?<BiChevronUp className='h6'/>:<BiChevronDown className='h6'/>}</button>
            </Container>
    )
}

export default OptionSelector


const Tag = ({label, selected, image, onClick}:{
    label: string,
    selected:boolean, 
    image?: string,
    onClick: MouseEventHandler<HTMLDivElement>
}) => {
    

    return (
        <TagContainer className={`rounded-sm ${selected?"selected":""}`} onClick={onClick}>{image?<img src={image}></img>:null}<p>{label}</p></TagContainer>
    )
}










