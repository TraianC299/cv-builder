import { useRef } from "react"
import styled from "styled-components"
import useClickOutside from "../../../hooks/useClickOutside"

const ModalStyles = styled.div`
position: fixed;
top:0;
left:0;
width: 100vw;
height: 100vh;

display: flex;
justify-content: center;
align-items: center;
background: rgba(0,0,0,0.5);
z-index: 9999;
`




type ModalProps = {
    children: React.ReactNode,
    onClose: () => void
    className?: string
}


const Modal  = ({children, onClose,className,...rest  }:ModalProps) => {
    const ref = useRef(null)
    useClickOutside(ref.current, onClose)
    return (
        <ModalStyles ref={ref} {...rest} className={className}>
            {children}
        </ModalStyles>
    )
}

export default Modal
