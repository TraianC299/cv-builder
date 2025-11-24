import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

const DropdownButton = ({ open, toggleOpen }: { open: boolean, toggleOpen?: () => any }) => {
    return (
        <button
            onClick={toggleOpen}
            type='button'
            className='h-6 w-6 flex items-center rounded-full justify-center cursor-pointer hover:bg-lightgrey'>
            {open ? <FiChevronUp /> : <FiChevronDown />}
        </button>
    )
}

export default DropdownButton