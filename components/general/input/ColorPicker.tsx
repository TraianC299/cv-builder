import React from 'react'
import styled from 'styled-components'
import { MAINCOLOR } from '../../../data/contants'
import { InputStyle } from '../../../styles/global'



const Container = styled.div`
width: 100%;
height: fit-content;
position: relative;

input {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  opacity: 0;
  padding: 14px 0;
  cursor: pointer;
}


`


const ColorInput = styled(InputStyle)`
display: flex;
justify-content: center;
align-items: center;
background:white;
transition: all 0.3s;
cursor: pointer;
color:${MAINCOLOR};

>*{
  color:${MAINCOLOR};
}

&.selected{
  background: ${MAINCOLOR};
  color: white;
  >*{
    color:white;
  }
}
`


const Color = styled.div`
position: absolute;
height: 20px;
width: 20px;
border-radius: 50%;
background: ${props => props.color};
right: 10%;`


type ColorPickerProps = {
  color:string,
  setColor: React.Dispatch<React.SetStateAction<string>>
  label:string
}
const ColorPicker = ({color, setColor, label}:ColorPickerProps) => {
    return (
        <Container  className={color?"selected":''}>
            <input 
                onChange={(e)=>setColor(e.target.value)} 
                type="color" 
                id="color" 
                name="head"
                value={color}/>
                <ColorInput  as="label" htmlFor="color" className='p t400 dashedBorder'>{label}<Color color={color}></Color></ColorInput>
        </Container> 
    )
}

export default ColorPicker
