import React, { ReactNode } from 'react'
import styled from 'styled-components'

const CollapseContainer = styled.div`
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
overflow: hidden;
`
const Collapse = ({children, on}:{
    children:ReactNode,
    on: boolean
})=>{
    const divRef = React.useRef<HTMLDivElement>(null);

    const [height, setHeight] = React.useState(0);
    const [overflow, setOverflow] = React.useState("hidden")


    React.useEffect(()=>{
        if(on && divRef.current){
            setHeight(divRef.current.scrollHeight)
            return
        }
        setHeight(0)
        setOverflow("hidden")
    
    },[on])


    return(
        <CollapseContainer className='collapse-container' aria-hidden={on?false:true} onTransitionEnd={()=>height>0?setOverflow("visible"): null} style={{height: height, overflow:overflow}} ref={divRef}>
            {children}
        </CollapseContainer>
    )
}

export default Collapse