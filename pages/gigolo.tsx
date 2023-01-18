import React from 'react'
import { useDrag } from '../components/general/utilities/DraggableComponents'

const gigolo = () => {
    const [list, setList] = React.useState(["A","B","C","D","E"])
    const {ContextDraggableComponents,
        DraggableComponent} = useDrag()

  return (
    <ContextDraggableComponents >
        {list.map((item, index)=><DraggableComponent list={list} setList={setList} key={item} index={index}>
            <div className='flex jc ac' style={{padding:"1rem", border:"1px solid black"}}>
            {item}
            </div></DraggableComponent>)}
    </ContextDraggableComponents>
  )
}

export default gigolo