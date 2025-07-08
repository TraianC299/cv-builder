import React from 'react';
import styled from 'styled-components';

const SuccessContainer = styled.div`
  z-index: 999;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.2s;
  backdrop-filter: blur(4px);
  opacity: 0;
  overflow: scroll;
  pointer-events: none;
  padding-bottom: 10rem;
  display: flex;
  &.open {
    opacity: 1;
    pointer-events: all;
  }
`;

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen?: (open: boolean) => void;
  centered?: boolean;
  onClose?: () => void;
};

const Modal = ({ children, open=false, setOpen, centered, onClose }: ModalProps) => {

 
  return (
    <SuccessContainer
      className={`p-4 ${open ? 'open' : ''} ${centered ? 'flex justify-center items-center' : ''}`}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setOpen && setOpen(false);
        onClose && onClose();
      }}
    >
      {open && children}
    </SuccessContainer>
  );
};

export default Modal;
