import COLORS from '@/constants/COLORS'
import { useCV } from 'contexts/AppContext'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import Input from './Input'



const ColorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.5rem;
  row-gap: 0.5em;
  width: 100%;
  .selected{
    border: 2px solid white;
    outline: 2px solid ${COLORS.BLACK};
}
  `
const availableColors = ['#0d6efd',
  '#6f42c1',
  '#dc3545',
  '#fd7e14',
  COLORS.YELLOW,
  COLORS.DARKGREEN,
  COLORS.GREEN,
  COLORS.NAVY,
  '#6c757d',
  '#000000']
const ColorSelector = () => {
  const { t } = useTranslation("create-cv")
  const { cvObject, setCvObject } = useCV()
  return (
    <Input.Wrapper>
      <Input.Label
        htmlFor='color'
      >{t("color")}</Input.Label>
      <ColorsContainer>
        <div className='bg-lightgrey flex items-center justify-between px-2 gap-2 min-w-20 rounded-full overflow-hidden cursor-pointer flex-1 h-8'>
          <span >{t("custom")}</span>
          <InputColor
            name='color'
            color={(cvObject.color && availableColors.includes(cvObject.color)) ? COLORS.LIGHTGREY : cvObject.color}
            value={cvObject.color}
            onChange={(e) => setCvObject({ ...cvObject, color: e.target.value })}
            type='color'></InputColor>
        </div>
        {availableColors.map((el, i) => <SingleColor key={i} color={el} onClick={() => {
          setCvObject({ ...cvObject, color: el })
        }} selected={
          cvObject.color === el
        }></SingleColor>)}
      </ColorsContainer>
    </Input.Wrapper>
  )
}

const Color = styled.div`
width: 2rem;
height: 2rem;
border-radius: 999px;

:hover{
    transform: scale(1.5);
}

`

const InputColor = styled.input`
position: relative;
padding: 0;
margin: 0;
border: none;
width: 1.25rem;
height: 1.25rem;
outline: none;
cursor: pointer;
background: none;
appearance: none;
-moz-appearance: none;
-webkit-appearance: none;
-webkit-tap-highlight-color: transparent;
border-radius: 999px;
&::-webkit-color-swatch-wrapper {
  padding: 0;
}
&::-webkit-color-swatch {
  border: none;
  border-radius: 999px;
  background: ${props => props.color || COLORS.LIGHTGREY};
}
&:focus{
  outline: none;
  box-shadow: none;       
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










const SingleColor = ({ color, onClick, selected }: any) => {
  return (
    <Color onClick={onClick} className={`w-8 h-8 rounded-sm cursor-pointer ${selected ? 'selected' : ''}`} style={{ backgroundColor: color }}></Color>
  )
}

export default ColorSelector