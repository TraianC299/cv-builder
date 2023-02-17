import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { GREY, GREYWHITE, MAINCOLOR } from '../../data/contants'
import Collapse from '../general/utilities/Collapse'



const Container = styled.div`
border: 1px solid ${GREYWHITE};
border-radius: 5px;
padding: 1rem;
flex-grow: 1;
.sp{
  color: ${GREY};
}`


const MainContent = styled.div`
display: flex;
justify-content: space-between;

:hover{
  >div:first-child{

  }
  p{
    color: ${MAINCOLOR};
  }
}
`



const CollapseItem = ({children, title, subtitle, open, setOpen, onDelete}:{
  children: ReactNode,
  title: string, 
  subtitle: string,
  open:boolean, 
  setOpen: Function,
  onDelete?: Function
}) => {

  return (
    <div className='flex gap-4 ac w-full'>
      <Container>
          <MainContent onClick={()=>setOpen((p:boolean)=>!p)} className="flex ac pointer">
            <div>
              <p className='p font-medium'>{title}</p>
              <p className='sp'>{subtitle}</p>
            </div>
            <p >{open?"☝️":"👇"}</p>
          </MainContent>
          <Collapse on={open}>
            {children}
          </Collapse>
      </Container>
      {onDelete && <button style={{border:"none"}} onClick={()=>onDelete()}>🗑️</button>}
    </div>
  )
}

export default CollapseItem