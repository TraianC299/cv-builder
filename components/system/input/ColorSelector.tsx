import COLORS from '@/constants/COLORS'
import { useCV } from 'contexts/AppContext'
import React from 'react'
import styled from 'styled-components'
import Input from './Input'
import { useTranslation } from 'next-i18next'



  const ColorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  column-gap: 0.5rem;
  row-gap: 0.5em;
  .selected{
    border: 2px solid white;
  outline: 2px solid ${COLORS.BLACKGREY};
}
  `
const availableColors = ['#0d6efd', '#6f42c1', '#dc3545', '#fd7e14', COLORS.YELLOW, COLORS.DARKGREEN, COLORS.GREEN, '#0dcaf0', '#6c757d', '#000000']
const ColorSelector = () => {
  const {t} = useTranslation("create-cv")
    const {cvObject,setCvObject} = useCV()
  return (
    <Input.Wrapper>
      <Input.Label>{t("color")}</Input.Label>
      <ColorsContainer>
      <None onClick={() => setCvObject({...cvObject, color: ''})} className={`rounded-sm pointer ${cvObject.color === '' ? 'selected' : ''}`} >None</None>
          {availableColors.map((el, i) => <SingleColor key={i} color={el} onClick={() => {
              setCvObject({...cvObject, color: el})
           }} selected={
              cvObject.color === el
          }></SingleColor>)}
          <InputColor 
          value={cvObject.color}
          onChange={(e)=>setCvObject({...cvObject, color: e.target.value})}
          type='color'></InputColor>
      </ColorsContainer>
    </Input.Wrapper>
  )
}

const Color = styled.div`
width: 2rem;
height: 2rem;
:hover{
    transform: scale(1.05);
}

`

const InputColor = styled.input`
width: 2rem;
height: 2rem;
position: relative;
padding: 0;
margin: 0;
border: none;
outline: none;
cursor: pointer;

:after{
    content: '+';
    width: 2rem;
    height: 2rem;
    position: absolute;
    top:0;
    left:0;
    background: ${COLORS.LIGHTGREY};
    border-radius: 0.25rem;
    border: 2px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;

}

`

const None = styled(Color)`
width:fit-content;
height: 2rem;
max-height: 2rem;
padding: 0.5rem;
display: flex;
align-items: center;
justify-content: center;
background: ${COLORS.LIGHTGREY};
padding: 0.5rem;

`










const SingleColor = ({color, onClick, selected}:any) => {
    return (
        <Color onClick={onClick} className={`w-8 h-8 rounded-sm pointer ${selected ? 'selected' : ''}`} style={{backgroundColor: color}}></Color>
    )
    }

export default ColorSelector