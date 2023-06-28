import React from 'react'
import Input from './Input'
import styled from 'styled-components'
import COLORS from '@/constants/COLORS'
import LEVELS from '@/constants/LEVELS'

const values = {
    1: {
        name: LEVELS[1],
        color: COLORS.RED,
    },
    2: {
        name: LEVELS[2],
        color: COLORS.ORANGE,
    },
    3: {
        name: LEVELS[3],
        color: COLORS.YELLOW,
    },
    4: {
        name: LEVELS[4],
        color: COLORS.GREEN,
    },
    5: {
        name: LEVELS[5],
        color: COLORS.PURPLE,
    },

}

const Option = styled.button`
    width: 100%;
    height: 3rem;
    border:none;
    background: ${COLORS.LIGHTGREY};
    :hover{
        background: ${COLORS.MAINCOLOR}30;
    }
    `
const OptionsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    position: relative;
    overflow: hidden;

    `

const Line = styled.div`
 position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 50%;
        background: ${COLORS.BORDERCOLOR};
        transform: translateY(50%);`

const LevelIndicator = styled.div`
position: absolute;
bottom: 0;
left: 0;
width: 100%;
height: 3rem;
pointer-events: none;
transition: transform 0.3s ease-in-out;
`
interface LevelSelectorProps {
    value: 1 | 2 | 3 | 4 | 5 | null,
    onChange: Function,
    label: string,
}
const LevelSelector = ({value, onChange, label}:LevelSelectorProps) => {

    
  return (
    <Input.Wrapper>
    <Input.Label >{label}: {values[value || 1]?.name || "..."}</Input.Label>
        <OptionsContainer className='flex rounded-sm'>
            {Object.keys(values).map((key, index) => {
                return <Option key={index} type='button'  onClick={() => onChange(key)} ></Option>
            })}
        {new Array(4).fill(0).map((_, index) => {
            return <Line key={index} style={{left: `${(index + 1) * 20}%`}}></Line>
        })
        }
        {value &&<LevelIndicator style={{width: `${value * 20}%`, background: `${values[value]?.color ||""}30`}} ></LevelIndicator>}
        </OptionsContainer>
    </Input.Wrapper>
  )
}

export default LevelSelector