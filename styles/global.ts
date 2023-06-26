import styled from "styled-components";
import COLORS from "@/constants/COLORS";
import MEDIAQUERIES from "@/constants/MEDIAQUERIES";


export const InputStyle = styled.input`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  /* border-radius: 0.25rem; */
  font-size: 1rem;
  padding: 0.75rem ;
  background: ${COLORS.GREYWHITE};
  border:none;
  position: relative;
  line-height: 1rem;
  outline: none;
  font-family: 'Poppins', sans-serif;
  border-radius: 0.25rem;
  ::placeholder{
    color: #9CA9B4;
    font-weight: 500;
  }
 `



export const Button = styled.button`
padding: 0.5rem 1rem;
background-color: ${COLORS.MAINCOLOR};
color: white;
border: none;
border-radius: 0.25rem;
font-size: 1rem;
font-weight: 600;
min-height: 42px;
cursor: pointer;
transition:   all 0.1s ease-in-out;


&.small{
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

&.big{
  padding: 1.2rem 2rem;
}

&.ghost{
  border: 1px solid ${COLORS.MAINCOLOR};
  background-color: transparent;
  color: ${COLORS.MAINCOLOR};
  box-shadow: none;
}
&.text{
  border: none;
  background-color: transparent;
  color: ${COLORS.MAINCOLOR};
  box-shadow: none;
  padding-left:0;
}

:disabled{
  background-color: ${COLORS.LIGHTGREY};
  color: ${COLORS.WHITE};
  cursor: not-allowed;
  box-shadow: none;
  
}
@media ${MEDIAQUERIES.tabletSmallPortrait}{
  padding: 1.2rem 2rem;
}
@media ${MEDIAQUERIES.laptopSmall}{
    padding: 0.75rem 1.25rem;
    .big{
      padding: 1rem 2rem;
    }


}


`
