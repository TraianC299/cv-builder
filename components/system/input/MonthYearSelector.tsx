import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import useClickOutside from '../../../hooks/useClickOutside'
import useDidMountEffect from '../../../hooks/useDidMountEffect'
import Input from './Input'
import COLORS from '@/constants/COLORS'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'



const Container = styled.div`
position: relative;
width: 100%;`

const Modal = styled.div`
overflow: hidden;
border-radius: 10px;
background: ${COLORS.GREYWHITE};
position: absolute;
top: calc(100% + 0.5rem);
width: fit-content;
padding: 0.5rem;
z-index:99;
`


const YearContainer = styled.div`
height: fit-content;
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
div{
    background: ${COLORS.MAINCOLOR};
    padding: 0.25rem 0.5rem;
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
    :hover{
        color: ${COLORS.MAINCOLOR};
    }
    &.selected{
        background: ${COLORS.MAINCOLOR};
        color: white;
    }
}
`

const months = [
"Jan",
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
        <Input value={value} onFocus={(e: { preventDefault: () => void })=>{e.preventDefault();setOpen(prev=>!prev)}} label={label} setValue={()=>{}}></Input>
        {open?<Modal className='shadow-md'>
            <YearContainer>
                <BiChevronLeft className="h6 pointer" onClick={(e)=>{e.preventDefault();setYear(prev=>--prev)}}></BiChevronLeft>
                <div className='flex jc ac p rounded-sm'>{year}</div>
                <BiChevronRight className="h6 pointer" onClick={(e)=>{e.preventDefault();setYear(prev=>++prev)}}></BiChevronRight>
            </YearContainer>
            <MonthGrid>
                {months.map((el:string)=><div key={el} className={`sp rounded-sm p-2 pointer ${month===el?"selected":""}`} onClick={(e)=>{e.preventDefault();setMonth(el)}}>{el}</div>)}
            </MonthGrid>
        </Modal>:null}
    </Container>
  )
}

export default MonthYearSelector