import React, { ReactNode } from 'react'
import styled from 'styled-components'
import COLORS from '@/constants/COLORS'
import Collapse from '../system/utilities/Collapse'
import { MdOutlineDragIndicator } from 'react-icons/md'
import {FaRegTrashAlt} from 'react-icons/fa'
import { FiChevronDown } from 'react-icons/fi'
import { FiChevronUp } from 'react-icons/fi'



const Container = styled.div`
border: 1px solid ${COLORS.LIGHTGREY};
border-radius: 5px;
padding: 1rem;
flex-grow: 1;
.sp{
  color: ${COLORS.GREY};
}`


const MainContent = styled.div`
display: flex;
justify-content: space-between;

:hover{
  >div:first-child{

  }
  p{
    color: ${COLORS.MAINCOLOR};
  }
}
`

const ListItem = styled.li`
position: relative;
.handle{
  cursor: grab;
  position: absolute;
  left: -1.5rem;
  top: 50%;
  transform: translateY(-50%);
}
.delete{
  cursor: pointer;
  position: absolute;
  right: -1.5rem;
  top: 50%;
  transform: translateY(-50%);
}
>button{
  opacity:0;
  transition: opacity 0.2s ease-in-out;
}
:hover{
  >button{
    opacity:1;
  }
}`


const CollapseItem = ({children, title, subtitle, open, setOpen, onDelete}:{
  children: ReactNode,
  title: string, 
  subtitle: string,
  open:boolean, 
  setOpen: Function,
  onDelete?: Function
}) => {

  return (
    <ListItem className='flex gap-4 ac w-full'>
             <button type='button' className='handle' style={{border:"none"}} ><MdOutlineDragIndicator/></button>
      <Container>
          <MainContent onClick={()=>setOpen((p:boolean)=>!p)} className="flex ac pointer">
            <div>
              <p className='p font-medium'>{title}</p>
              <p className='sp'>{subtitle}</p>
            </div>
            <p >{open?<FiChevronUp/>:<FiChevronDown/>}</p>
          </MainContent>
          <Collapse on={open}>
            {children}
          </Collapse>
      </Container>
      {onDelete && <button className='delete' type="button" style={{border:"none"}} onClick={()=>onDelete()}><FaRegTrashAlt color={COLORS.RED}/></button>}
    </ListItem>
  )
}

export default CollapseItem