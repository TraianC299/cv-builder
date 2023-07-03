import COLORS from '@/constants/COLORS'
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'


const Container = styled.div`
height: 842px;
width: 595px;
transform-origin:0 0;

.ssp{
  font-size: 0.5rem !important;
}
.sp{
  font-size: 0.6rem !important;
}
p{
    font-size: 0.7rem !important;
}
.h1{
  font-size: 40px !important;
  line-height: 1.2;
}
.h2 {
font-size: 30px !important;
}
.h3 {
  font-size: 2rem !important;
}
.h4 {
  
  font-size: 1.4rem !important;
}
.h5 {
  
  font-size: 1.2rem !important;
}
.h6 {
  font-size: 1rem !important;
}
*{
  white-space: pre-line;
  word-wrap: break-word;
}

`

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    className?: string,
    color?: string
} 
const FontScaleWrapper = ({children,className, color}:Props) => {
  const theme = {
    color: color
  };
  
  return (
    <ThemeProvider theme={theme}>

      <Container className={className}>{children}</Container>
    </ThemeProvider>
  )
}

export default FontScaleWrapper