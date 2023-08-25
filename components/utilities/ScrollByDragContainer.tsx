import MEDIAQUERIES from '@/constants/MEDIAQUERIES'
import useCustomCursor from 'hooks/useCustomCursor'
import useMediaQuery from 'hooks/useMediaQuery'
import useMousePosition from 'hooks/useMousePosition'
import React, { useEffect } from 'react'
import styled from 'styled-components'


const Container = styled.div`
cursor: url('/assets/cursor.png'), auto;


`
const ScrollByDragContainer = ({children}:{
    children: React.ReactNode
}) => {
    
    const [startX, setStartX] = React.useState<number | null>(null)
    const {x} = useMousePosition()
    const ref = React.useRef<HTMLDivElement | null>(null)
    const [isDown, setIsDown] = React.useState(false)
    const [translateX, setTranslateX] = React.useState(0)
    

    useEffect (()=>{
        if(isDown && ref.current && startX && x){
            const child = ref.current.children[0] as HTMLDivElement
            ref.current.style.transform = `translateX(${translateX + x - startX}px)`
        }
    },[x])


    useEffect(()=>{
        if(!isDown && ref.current ){
            const child = ref.current.children[0] as HTMLDivElement
            const tralsateX = ref.current.style.transform.match(/-?\d+/)
            if(tralsateX){
                setTranslateX(parseInt(tralsateX[0]))
            }

        }
    },[isDown])


  return (
    <Container 
   
    id="scroll-by-drag-container"
    onMouseDown={
        (e)=>{
            setIsDown(true)
            setStartX(e.clientX)
        }

    }
    onMouseUp={
        ()=>{
            setIsDown(false)
            setStartX(null)
        }
    }
    ref={ref}>
            {children}
    </Container>
  )
}

export default ({children}:{
    children: React.ReactNode
})=>{
    const isDesktop = useMediaQuery(MEDIAQUERIES.laptopSmall)
    if(!isDesktop){
        return <>{children}</>
    }else return <ScrollByDragContainer children={children}/>
}


