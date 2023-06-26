import React from 'react'
import styled from 'styled-components'
import SpinnerSvg from "../../assets/svg/spinner.svg";
import COLORS from '@/constants/COLORS';



const Rotation = styled(SpinnerSvg)`
animation: rotation 1s infinite;
height: 1.25rem;
width: 1.25rem;
*{
  fill: ${COLORS.BLACKGREY};
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