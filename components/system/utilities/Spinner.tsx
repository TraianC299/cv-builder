import React from 'react'
import styled from 'styled-components'
import { BLACKGREY } from '../../../data/contants';
import SpinnerSvg from "../../assets/svg/spinner.svg";



const Rotation = styled(SpinnerSvg)`
animation: rotation 1s infinite;
height: 1.25rem;
width: 1.25rem;
*{
  fill: ${BLACKGREY};
}`

const Spinner = ({ className, ...props}:{
  className?: string
  props: any[]
}) => {
  return (
    
      <Rotation {...props} className={className}></Rotation>
   
  )
}

export default Spinner