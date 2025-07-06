import COLORS from '@/constants/COLORS'
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import styled from 'styled-components'
import { InputStyle } from 'styles/global'
import useClickOutside from '../../../hooks/useClickOutside'
import Input from './Input'


const OptionSelectorInput = styled(InputStyle).attrs({ as: "div" })`
cursor: pointer;
display: flex;
justify-content: space-between;
align-items: center;
gap: 0.25rem;
&.small{
    padding: 0.5rem 1rem;
    font-size: 1rem;
    +*>.tag{
        height: 2rem !important;
    }
  }
`



const StyledAutocompleteContainer = styled.ul`
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
min-width: max-content;



`
const TagContainer = styled.li`
text-align: left;
width: 100%;
display: flex;
align-items: center;
padding-left: 0.5rem;
height: 3rem;
cursor: pointer;
position: relative;
min-width: max-content;
&:hover{
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



const getInitialValue = (value: OptionSelectorProps["value"], options: OptionSelectorProps["options"]) => {
    const option = options.find(option => option.value === value)
    return option ? option.label : ""
}


type OptionSelectorProps = {
    options: { label: string, value: any }[] | [],
    value: any,
    onChange: (value: any) => void,
    noAddOption?: boolean,
    label: string,
    [key: string]: any
}

const OptionSelector = ({ options = [], value, noAddOption, label, onChange, ...props }: OptionSelectorProps) => {
    const [relevantOptions, setRelevantOptions] = React.useState([...options])
    const [focus, setFocus] = React.useState(false)
    const [inputValue, setInputValue] = useState<string>(value ? getInitialValue(value, options) : "")
    const ref = useRef(null);
    useClickOutside(ref.current, () => setFocus(false))




    useEffect(() => {
        setRelevantOptions([...options])
    }, [options])






    const complete = ({ label, value }: { label: OptionSelectorProps["label"], value: OptionSelectorProps["value"] }) => {
        setFocus(false)
        setInputValue(label)
        onChange(value)
    }


    return (
        <Input.Wrapper
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={focus}
            aria-owns="listbox"
            aria-controls="listbox"
            aria-label={label}
            aria-activedescendant={value}
            aria-autocomplete="list"
            aria-multiline={false}
            aria-readonly={false}
            ref={ref} >
            {label && <Input.Label>{label}</Input.Label>}
            <OptionSelectorInput onClick={(e) => { e.preventDefault(); setFocus(previous => !previous) }} as="button" type='button'  {...props}>
                {inputValue}
                {focus ? <BiChevronUp /> : <BiChevronDown />}
            </OptionSelectorInput>
            {/* <Input  label={label}  placeholder={label} value={inputValue}  setValue={()=>{}}  onFocusCapture={()=>setFocus(true)} {...props} ></Input> */}
            {focus ? <StyledAutocompleteContainer style={{ pointerEvents: focus ? "all" : "none", opacity: focus ? "1" : "0" }} className='shadow-md'>
                {relevantOptions.map(option => <Tag
                    onClick={() => complete({ ...option })}
                    key={option.label}
                    label={option.label}
                    selected={value ? value === option.value : false}
                ></Tag>)}
            </StyledAutocompleteContainer> : null}
        </Input.Wrapper>
    )
}

export default OptionSelector


const Tag = ({ label, selected, image, onClick }: {
    label: string,
    selected: boolean,
    image?: string,
    onClick: MouseEventHandler<HTMLLIElement>
}) => {


    return (
        <TagContainer
            className={`rounded-sm tag ${selected ? "selected" : ""}`}
            onClick={onClick}>
            {image ? <img src={image}></img> : null}
            <p>{label}</p>
        </TagContainer>
    )
}










