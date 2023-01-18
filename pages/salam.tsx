import React, { useEffect } from 'react'
import styled from 'styled-components'
import useMousePosition from '../hooks/useMousePosition'
const Container = styled.ul``

const salam = () => {
    const [placeholder, setPlaceholder] = React.useState(0)
    const [list, setList] = React.useState(["A","B","C","D","E"])
    const [overIndex, setOverIndex] = React.useState(null)
   


   

  return (
    <Container className='flex column gap05'>
        {list.map((item, index)=>(<DraggableComponent
        placeholder={placeholder}
        setPlaceholder={setPlaceholder}
        list={list}
        setList={setList}
        key={item}
        index={index}
        overIndex={overIndex}
        setOverIndex={setOverIndex}
        >
            <TextimonialContainerStyle
            
            className='flex ac jc'>{item}
            </TextimonialContainerStyle>
        </DraggableComponent>))}
    
    </Container>
  )
}

export default salam



const TextimonialContainerStyle = styled.div`
height: 4rem;
width: 10rem;
border: 1px solid black;
position: relative;
margin-left:2rem;
cursor: move;
transition: 0.3s padding-top cubic-bezier(0.2, 1, 0.1, 1);
>div{
    position: absolute;
    top:0;
    left:-2rem;
    content: ${`""`};
    height: 100%;
    width: 2rem;
    cursor: move;
}

`


const DraggabbleContainerStyle = styled.div`
position: relative;
transition: 0.3s cubic-bezier(0.2, 1, 0.1, 1);
&.over{
    padding-top: 4rem;
}
`


const DraggableComponent = ({children, placeholder, setPlaceholder, list, setList, index, overIndex, setOverIndex})=> {
    function onDragStart(e:DragEvent<HTMLDivElement>, index:number) {
        e.target.visibility = 'hidden';
        e.target.style.opacity = '0.001';
        e.dataTransfer.effectAllowed = 'move';
        setPlaceholder(index)
        // setStartDiv(e.target)
        // e.dataTransfer.effectAllowed = 'move';
        // e.dataTransfer.setData('text/html', e.target.innerHTML);
      }

    const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
        e.target.style.opacity = '1';
        e.target.visibility = 'visible';
        setOverIndex(null)
       

    }
    function onDragDrop(ev:DragEvent<HTMLDivElement>, index:number) {
        ev.stopPropagation();
        //rearrange list
        const listPLaceholder = [...list]
        const item = listPLaceholder.splice(placeholder, 1)[0]
        listPLaceholder.splice(index, 0, item)
        setList(listPLaceholder)
        setPlaceholder(null)
        setOverIndex(null)


        // if (startDiv !== ev.target) {
        //     ev.target.classList.remove('over');
        //     startDiv.innerHTML = ev.target.innerHTML;
        //   ev.target.innerHTML = ev.dataTransfer.getData('text/html');
        // }
      
        return false;
      }


      function handleDragEnter(e:DragEvent<HTMLDivElement>) {
        e.target.classList.add('over');
        setOverIndex(index)
      }
      function handleDragLeave(e:DragEvent<HTMLDivElement>) {
        e.target.classList.remove('over');
      }
    
      function handleDragOver(e:DragEvent<HTMLDivElement>) {
        e.preventDefault();
        return false;
      }


      
    return(<DraggabbleContainerStyle  
        onDragEnter={(e)=>handleDragEnter(e)} 
        onDragLeave={(e)=>handleDragLeave(e)} 
        onDragOver={(e)=>{handleDragOver(e)}} 
        onDrop={(e)=>onDragDrop(e, index)} 
        onDragStart={(e)=>onDragStart(e, index)} 
        onDragEnd={(e)=>onDragEnd(e)} 
        draggable={true} 
        className={`flex ac jc ${overIndex===index?"over":""}`}
        aria-roledescription="This is a draggable item. Press space to lift.">{children}
        </DraggabbleContainerStyle>)
}





