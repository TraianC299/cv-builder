import React from 'react'
import styled from 'styled-components'
import spinnerSvg from "../../assets/svg/spinner.svg";
import COLORS from '@/constants/COLORS';
import Image from 'next/image';



const Rotation = styled.div`
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
    
      <Rotation {...props} className={`${className} animate-spin`}>
        <Image fill src={spinnerSvg} alt="Loading..." />

      </Rotation>
   
  )
}

export default Spinner