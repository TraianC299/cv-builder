import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import useDidMountEffect from '../../../hooks/useDidMountEffect'
import { GREY, GREYWHITE, MAINCOLOR, shadow600 } from '../../../data/contants'
import Input from './Input'
import useClickOutside from '../../../hooks/useClickOutside'





const Container = styled.div`
max-width: 100%;
display: flex;
flex-direction: column;
flex-wrap: wrap;
position: relative;
background-color: transparent;
>input{
    padding-bottom: -10px;
}
`

const StyledAutocompleteContainer = styled.div`
background: #fff;
z-index: 2;
width: 100%;
height: fit-content;
position: absolute;
top:105%;
mix-blend-mode: normal;
box-shadow: ${shadow600};
max-height: 25vh;
overflow: scroll;
background-color: transparent;
border-radius: 5px;

`
const TagContainer = styled.div`
text-align: left;
width: 100%;
display: flex;
align-items: center;
padding-left: 10px;
background-color: white;
min-height: 5vh;
cursor: pointer;
border-bottom: 0.5px solid ${GREYWHITE};
justify-content:space-between ;
>p{
    color:${GREY};
    font-size: 0.8rem;
}
:hover{
    background-color: ${GREYWHITE};
}
>img{
    height: 3vh;
    width: 3vh;
    border-radius: 50%;
    margin-right: 10px;
}
>.currencySymbol{
    height: 3vh;
    width: 5ch;
    display:flex;
    align-items: center;
    justify-content: flex-end;
    border-radius: 50%;
    margin-right: 10px;
    color:${MAINCOLOR};
    font-weight: 600;
}
`



interface Props {
    value: {title:string, id:string},
    setValue: Function,
    label: string,
    error?: string,
    setError?: Function,
    options: any[],
    withImage?: boolean,
    noAddOption?: boolean,
    noAutocomplete?: boolean,
    disabled?: boolean,
    defaultValue?: string,
    rows?: number,
    rowsMax?: number,
    helperText?: string,
    validation?: Function,
}

const Autocomplete:React.FC<Props> = ({options, value, setValue, noAddOption, withImage, label, error, setError, noAutocomplete, ...props}) => {
    const [relevantOptions, setRelevantOptions] = React.useState([...options])
    const [focus, setFocus] = React.useState<Boolean>(false)
    const [inputValue, setInputValue] = useState(value.title)
    const ref  = useRef(null)
    useClickOutside(ref.current, () => setFocus(false))
    // useDidMountEffect(()=>{
    //     if(inputValue && !noAutocomplete){
    //         setRelevantOptions(previous=>options.filter(element => {
    //             return element.title.includes(inputValue)
    //         }))
    //     }else{
    //         setRelevantOptions([...options])
    //     }
    // },[inputValue])


    useDidMountEffect(()=>{
        if(value && value.title){
            setInputValue(value.title)
        }
    },[value])





    useEffect(()=>{
        setRelevantOptions([...options])
    },[options])



    const complete = (value:any) => {
        setFocus(false)
        setInputValue(value.title)
        setValue({title: value.title, id: value.id})
    }
   

    return (
      
            <Container ref={ref}>
            <Input 
                error={error} 
                setError={setError} 
                placeholder={label} 
                value={inputValue}  
                setValue={setInputValue} 
                onFocusCapture={()=>setFocus(true)}></Input>
            {<StyledAutocompleteContainer style={{pointerEvents:focus?"all":"none", opacity:focus?"1":"0"}} >
                {relevantOptions.map(option => <TagContainer onClick={()=>complete(option)} key={option.id}>{withImage?<img src={option.image}></img>:null}<p>{option.title}</p><div className='currencySymbol'>{option.symbol}</div></TagContainer>)}
                {relevantOptions.length==0 && <TagContainer onClick={()=>noAddOption?null:complete(inputValue)} ><p>{noAddOption?"No such option":"Add new tag: "+ inputValue}</p></TagContainer>}
            </StyledAutocompleteContainer>}
            </Container>
    )
}

export default Autocomplete
