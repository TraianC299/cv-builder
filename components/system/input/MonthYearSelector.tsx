import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { GREYWHITE, MAINCOLOR } from '../../../data/contants'
import useClickOutside from '../../../hooks/useClickOutside'
import useDidMountEffect from '../../../hooks/useDidMountEffect'
import Input from './Input'



const Container = styled.div`
position: relative;
width: 100%;`

const Modal = styled.div`
overflow: hidden;
border-radius: 10px;
background: ${GREYWHITE};
position: absolute;
top: 100%;
width: fit-content;
padding: 1rem;
z-index:99;
`


const YearContainer = styled.div`
height: fit-content;
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
div{
    background: ${MAINCOLOR};
    padding: 0.5rem 1rem;
    border-radius: 66px;
    color: white;
}
`

const MonthGrid = styled.div`
display: grid;
grid-template-rows: repeat(3, 5ch);
grid-template-columns: repeat(4, 5ch);
justify-items: center;
align-items: center;
>div{
    padding: 5px;
    border-radius: 10px;
    :hover{
        color: ${MAINCOLOR};
        cursor: pointer;
    }
    &.selected{
        background: ${MAINCOLOR};
        color: white;
    }
}
`

const months = ["Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun",
"Jul",
"Aug",
"Sep",
"Oct",
"Nov",
"Dec"]
const MonthYearSelector = ({value, setValue, label}:{
    value: string, 
    setValue: React.Dispatch<React.SetStateAction<string>>,
    label: string
}) => {
    const ref = useRef(null)
    const [open, setOpen] = useState(false)
    const [year, setYear] = useState(Number(value.split(" ")[1]) || new Date().getFullYear())
    const [month, setMonth] = useState(value.split(" ")[0] || months[new Date().getMonth()])
    useClickOutside(ref.current, () => setOpen(false))

    useDidMountEffect(()=>{
        setValue(month+" "+year)
    }, [year, month])
    


  return (
    <Container ref={ref}>
        <Input value={value} onFocusCapture={(e: { preventDefault: () => void })=>{e.preventDefault();setOpen(prev=>!prev)}} label={label} setValue={()=>{}}></Input>
        {open?<Modal>
            <YearContainer>
                <p className='pointer' onClick={(e)=>{e.preventDefault();setYear(prev=>--prev)}}>-</p>
                <div className='flex jc ac'>{year}</div>
                <p className='pointer' onClick={(e)=>{e.preventDefault();setYear(prev=>++prev)}}>+</p>
            </YearContainer>
            <MonthGrid>
                {months.map((el:string)=><div className={month===el?"selected":""} onClick={(e)=>{e.preventDefault();setMonth(el)}}>{el}</div>)}
            </MonthGrid>
        </Modal>:null}
    </Container>
  )
}

export default MonthYearSelector