import styled from "styled-components";
import {  coloredShadow, device, GREYWHITE, LIGHTGREY, MAINCOLOR, WHITE } from "../data/contants";

export const InputStyle = styled.input`

  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  border-radius: 0.25rem;
  font-size: 1rem;
  padding: 1rem ;
  background: ${GREYWHITE};
  border:none;
  position: relative;
  line-height: 1rem;
  ::placeholder{
    color: #9CA9B4;
    font-weight: 500;
  }
 
 
  
  
 
  
 
  :focus{
    /* outline: none;
    ::after{
    z-index:99;
    position: absolute;
    content: '';
    bottom:0;
    left:0;
    width: 100%;
    height: 2px;
    border-bottom: 2px solid ${MAINCOLOR};
  } */
  }
 `



export const Button = styled.button`
padding: 0.5rem 1rem;
background-color: ${MAINCOLOR};
color: white;
border: none;
border-radius: 10rem;
font-size: 1rem;
font-weight: 600;
min-height: 42px;
cursor: pointer;
transition:   all 0.3s ease-in-out;
box-shadow: ${coloredShadow};


&.small{
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;

}
&.ghost{
  border: 1px solid ${MAINCOLOR};
  background-color: transparent;
  color: ${MAINCOLOR};
  box-shadow: none;
}
&.text{
  border: none;
  background-color: transparent;
  color: ${MAINCOLOR};
  box-shadow: none;
}

:disabled{
  background-color: ${LIGHTGREY};
  color: ${WHITE};
  cursor: not-allowed;
  box-shadow: none;
  
}
@media ${device.tabletSmallPortrait}{
  padding: 1.2rem 2rem;
}
@media ${device.laptopSmall}{
    padding: 1rem 2rem;

  :hover{
    transform: scale(1.1);
}
}


`
