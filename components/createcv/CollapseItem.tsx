import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { DARKGREY, GREYWHITE, MAINCOLOR } from '../../data/contants'
import Collapse from '../general/utilities/Collapse'



const Container = styled.div`
border: 2px solid ${GREYWHITE};
border-radius: 5px;
padding: 1rem;

.sp{
  color: ${DARKGREY};
}`


const MainContent = styled.div`
display: flex;
justify-content: space-between;

:hover{
  >div:first-child{
    cur
  }
  p{
    color: ${MAINCOLOR};
  }
}
`



const CollapseItem = ({children, title, subtitle, open, setOpen}:{
  children: ReactNode,
  title: string, 
  subtitle: string,
  open:boolean, 
  setOpen: Function
}) => {

  return (
    <Container>
        <MainContent onClick={()=>setOpen((p:boolean)=>!p)} className="flex ac pointer">
          <div>
            <p className='p t600'>{title}</p>
            <p className='sp'>{subtitle}</p>
          </div>
          <p >{open?"☝️":"👇"}</p>
        </MainContent>
        <Collapse on={open}>
          {children}
        </Collapse>
    </Container>
  )
}

export default CollapseItem