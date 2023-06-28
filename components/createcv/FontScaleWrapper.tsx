import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
p{
    font-size: 0.7rem !important;
}
.h1{
  font-size: 40px !important;
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
.p {
  font-size: 0.7rem !important;
}
.sp{
  font-size: 0.6rem !important;
}

.ssp{
  font-size: 0.5rem !important;
}
`

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    className?: string,
} 
const FontScaleWrapper = ({children,className}:Props) => {
  return (
    <Container className={className}>{children}</Container>
  )
}

export default FontScaleWrapper