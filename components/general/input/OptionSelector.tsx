import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import useClickOutside from '../../../hooks/useClickOutside'
 import { GREYWHITE, LIGHTGREY, MAINCOLOR, shadow600, WHITE } from '../../../data/contants'
import Input from './Input'

const Container = styled.div`
position: relative;
background-color: transparent;
height: fit-content;
width: 100%;
>.time-picker-button{
    position: absolute;
    top: calc(50% + 0.7rem);
    right: 0.5rem;
    border: none;
    background: transparent;
    transform: translateY(-50%);
    padding: 5px;

    >svg{
        fill: ${LIGHTGREY};
        *{
            fill: ${LIGHTGREY};
        }
    }
    
}
`

const StyledAutocompleteContainer = styled.div`
background: ${WHITE};
z-index: 2;
width: 100%;
height: fit-content;
position: absolute;
top:105%;
box-shadow:${shadow600};
max-height: 20rem;
overflow: scroll;
background-color: transparent;
border-radius: 0.5rem;

`
const TagContainer = styled.div`
text-align: left;
width: 100%;
display: flex;
align-items: center;
padding-left: 1rem;
background-color: white;
height: 3rem;
cursor: pointer;
position: relative;
:hover{
    background-color: ${GREYWHITE};
}
>img{
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    margin-right: 0.5rem;
}

&.selected{
    :before{
        content: "";
        position: absolute;
        top: calc(50% - 0.25rem);
        right: 1rem;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background-color: ${MAINCOLOR};
    }
}
`



const getInitialValue = (value, options) => {
    const option = options.find(option => option.value === value)
    return option?option.label:""
}


const OptionSelector = ({options=[], value, setValue, noAddOption, withImage, label, ...props}) => {
    const [relevantOptions, setRelevantOptions] = React.useState([...options])
    const [focus, setFocus] = React.useState(false)
    const [inputValue, setInputValue] = useState(value?getInitialValue(value, options):"")
    const ref = useRef(null);
    useClickOutside(ref.current, () => setFocus(false))




    useEffect(()=>{
        setRelevantOptions([...options])
    },[options])






    const complete = ({label, value}) => {
        setFocus(false)
        setInputValue(label)
        setValue(value)
    }
   

    return (
            <Container ref={ref} >
            <Input  label={label}  placeholder={label} value={inputValue}  setValue={()=>{}}  onFocusCapture={()=>setFocus(true)} {...props} ></Input>
            {focus?<StyledAutocompleteContainer style={{pointerEvents:focus?"all":"none", opacity:focus?"1":"0"}} styledHeight={relevantOptions.length}>
                {relevantOptions.map(option => <Tag 
                    onClick={()=>complete({...option})} 
                    key={option.label}
                    label={option.label}
                    value={option.value}
                    withImage={withImage}
                    image={option.image}
                    selected={value?value===option.value:false}
                    ></Tag>)}
            </StyledAutocompleteContainer>:null}
            <button className="time-picker-button pointer" onClick={(e)=>{e.preventDefault();setFocus(previous=>!previous)}} color={GREYWHITE} >{focus?<p>-</p>:<p>+</p>}</button>
            </Container>
    )
}

export default OptionSelector


const Tag = ({label, selected, withImage, image, onClick}) => {
    

    return (
        <TagContainer className={selected?"selected":""} onClick={onClick}>{withImage?<img src={image}></img>:null}<p>{label}</p></TagContainer>
    )
}










