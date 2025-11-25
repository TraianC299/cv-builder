import COLORS from '@/constants/COLORS'
import { ReactNode } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { MdOutlineDragIndicator } from 'react-icons/md'
import styled from 'styled-components'
import Collapse from '../ui/utilities/Collapse'
import DropdownButton from '../ui/utilities/DropdownButton'






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


const CollapseItem = ({ children, title, open, setOpen, onDelete }: {
  children: ReactNode,
  title: string,
  subtitle: string,
  open: boolean,
  setOpen: (value: boolean) => void,
  onDelete?: Function
}) => {

  return (
    <ListItem className='flex gap-4 items-center w-full p-2'>
      <button type='button' className='handle'><MdOutlineDragIndicator /></button>
      <div className='flex-1 p-2'>
        <MainContent onClick={() => setOpen(!open)} className="flex items-center pointer">
          <div>
            <p className='p font-medium title'>{title}</p>
          </div>
          <DropdownButton open={open} />
        </MainContent>
        <Collapse on={open}>
          {children}
        </Collapse>
      </div>
      {onDelete && <DeleteButton className='delete' type="button" onClick={() => onDelete()}><FiTrash2 className='p' color={COLORS.RED} /></DeleteButton>}
    </ListItem>
  )
}

export default CollapseItem