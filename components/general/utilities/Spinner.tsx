import React from 'react'
import styled from 'styled-components'
import SpinnerSvg from "../../assets/svg/spinner.svg";
import { BLACKGREY } from '../../styles/styles';



const Rotation = styled(SpinnerSvg)`
animation: rotation 1s infinite;
height: 1.25rem;
width: 1.25rem;
*{
  fill: ${BLACKGREY};
}`

const Spinner = ({ className, ...props}) => {
  return (
    
      <Rotation {...props} className={className}></Rotation>
   
  )
}

export default Spinner