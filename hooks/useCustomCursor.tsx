import COLORS from '@/constants/COLORS';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import useMousePosition from './useMousePosition';

const useCustomCursor = (): JSX.Element => {
  const {x, y} = useMousePosition()
  const cursor = React.useRef<HTMLDivElement | null>(null)

  return <CustomCursorStyle 
  style={{
    left: `${x}px`,
    top: `${y}px`
  }}
  ref={cursor}
  id="custom-cursor" 
  className="custom-cursor"
  />;
}

export default useCustomCursor;


const CustomCursorStyle = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${COLORS.BLACKGREY};
    pointer-events: none;
   




`