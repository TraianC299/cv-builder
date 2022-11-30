import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { DARKGREY, GREYWHITE } from '../../data/contants'
import Collapse from '../general/utilities/Collapse'



const Container = styled.div`
border: 1px solid ${GREYWHITE};
padding: 1rem;
.sp{
  color: ${DARKGREY};
}`


const MainContent = styled.div`
display: flex;
justify-content: space-between;`



const CollapseItem = ({children, title, subtitle, open, setOpen}:{
  children: ReactNode,
  title: string, 
  subtitle: string,
  open:boolean, 
  setOpen: Function
}) => {

  return (
    <Container>
        <MainContent onClick={()=>setOpen((p:boolean)=>!p)}>
          <div>
            <p className='p'>{title}</p>
            <p className='sp'>{subtitle}</p>
          </div>
          <p>-</p>
        </MainContent>
        <Collapse on={open}>
          {children}
        </Collapse>
    </Container>
  )
}

export default CollapseItem