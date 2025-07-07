import COLORS from "@/constants/COLORS";
import styled from "styled-components";


export const InputStyle = styled.input`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  /* border-radius: 0.25rem; */
  font-size: 1rem;
padding: 0.75rem 1rem;
  background: ${COLORS.LIGHTGREY};
  border:none;
  position: relative;
  outline: none;
  border-radius: 0.25rem;
  min-width: 3rem;
 
  ::placeholder{
    color: #9CA9B4;
  }
 `



export const Button = styled.button<{ background?: string }>`
padding: 0.75rem 1rem;
background-color: ${props => props.background ? props.background : COLORS.MAINCOLOR};
color: white;
border: none;
border-radius: 0.25rem;
font-size: 1rem;
font-weight: 500;
cursor: pointer;
transition:   all 0.1s ease-in-out;
&.small{
  padding: 0.5rem 0.5rem;
  font-size: 0.75rem;
}

&.ghost{
  border: 1px solid ${COLORS.MAINCOLOR};
  background-color: transparent;
  color: ${COLORS.MAINCOLOR};
}
&.text{
  border: none;
  background-color: transparent;
  color: ${COLORS.MAINCOLOR};
  padding-left:0;
}
&.icon{
  height: 2rem;
  width: 2rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}


:disabled{
  background-color: ${COLORS.MAINCOLOR}50;
  cursor: not-allowed;
}
`
