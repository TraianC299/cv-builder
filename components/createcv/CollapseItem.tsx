import COLORS from '@/constants/COLORS'
import { ReactNode } from 'react'
import { FiChevronDown, FiChevronUp, FiTrash2 } from 'react-icons/fi'
import { MdOutlineDragIndicator } from 'react-icons/md'
import styled from 'styled-components'
import Collapse from '../ui/utilities/Collapse'



const Container = styled.div`
border-radius: 5px;
padding: 1rem;
flex-grow: 1;
.sp{
  color: ${COLORS.GREY};
}`


const MainContent = styled.div`
display: flex;
justify-content: space-between;

`

const ListItem = styled.li`
position: relative;
border-bottom: 1px solid ${COLORS.LIGHTGREY};
:hover{
  .title{
    color: ${COLORS.MAINCOLOR};
  }
}
`

const DeleteButton = styled.button`
border: none;
background: none;
cursor: pointer;
height: 100%;
`


const CollapseItem = ({ children, title, subtitle, open, setOpen, onDelete }: {
  children: ReactNode,
  title: string,
  subtitle: string,
  open: boolean,
  setOpen: Function,
  onDelete?: Function
}) => {

  return (
    <ListItem className='flex gap-4 items-center w-full'>
      <button type='button' className='handle'  ><MdOutlineDragIndicator /></button>
      <Container>
        <MainContent onClick={() => setOpen((p: boolean) => !p)} className="flex items-center pointer">
          <div>
            <p className='p font-medium title'>{title}</p>
            {/* <p className='sp'>{subtitle}</p> */}
          </div>
          <div className='h-6 w-6 flex items-center rounded-full justify-center cursor-pointer hover:bg-lightgrey'>
            {open ? <FiChevronUp /> : <FiChevronDown />}
            </div>
        </MainContent>
        <Collapse on={open}>
          {children}
        </Collapse>
      </Container>
      {onDelete && <DeleteButton className='delete' type="button" onClick={() => onDelete()}><FiTrash2 className='p' color={COLORS.RED} /></DeleteButton>}
    </ListItem>
  )
}

export default CollapseItem