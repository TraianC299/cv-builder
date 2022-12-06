import React from 'react'
import styled from 'styled-components'
const Container = styled.div``

const salam = () => {

    const [startDiv, setStartDiv] = React.useState(null)
   

    function onDragStart(e:DragEvent<HTMLDivElement>) {
        e.target.style.opacity = '0.4';
        setStartDiv(e.target)
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', e.target.innerHTML);
      }

    const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
        e.target.style.opacity = '1';
        
     
    }

    function drop(ev:DragEvent<HTMLDivElement>) {
        ev.stopPropagation();

        if (startDiv !== ev.target) {
            ev.target.classList.remove('over');
            startDiv.innerHTML = ev.target.innerHTML;
          ev.target.innerHTML = ev.dataTransfer.getData('text/html');
        }
      
        return false;
      }


      function handleDragEnter(e:DragEvent<HTMLDivElement>) {
        e.target.classList.add('over');
      }
    
      function handleDragLeave(e:DragEvent<HTMLDivElement>) {
        e.target.classList.remove('over');
      }
    
      function handleDragOver(e:DragEvent<HTMLDivElement>) {
        e.preventDefault();
        return false;
      }
  return (
    <Container>
        <TextimonialContainerStyle  
        onDragEnter={handleDragEnter} 
        onDragLeave={handleDragLeave} 
        onDragOver={(e)=>{handleDragOver(e)}} 
        onDrop={(event)=>drop(event)} 
        onDragStart={(e)=>onDragStart(e)} onDragEnd={(e)=>onDragEnd(e)} draggable={true} className='flex ac jc list-item-1' id={"list-item-1"}>1
        </TextimonialContainerStyle>
        <TextimonialContainerStyle onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={(e)=>{handleDragOver(e)}} onDrop={(event)=>drop(event)} onDragStart={(e)=>onDragStart(e)} onDragEnd={(e)=>onDragEnd(e)} draggable={true} className='flex ac jc list-item-2' id={"list-item-2"}>2
        </TextimonialContainerStyle>
        <TextimonialContainerStyle onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={(e)=>{handleDragOver(e)}} onDrop={(event)=>drop(event)} onDragStart={(e)=>onDragStart(e)} onDragEnd={(e)=>onDragEnd(e)} draggable={true} className='flex ac jc list-item-3' id={"list-item-3"}>3
        </TextimonialContainerStyle>
        <TextimonialContainerStyle onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={(e)=>{handleDragOver(e)}} onDrop={(event)=>drop(event)} onDragStart={(e)=>onDragStart(e)} onDragEnd={(e)=>onDragEnd(e)} draggable={true} className='flex ac jc list-item-4' id={"list-item-4"}>4
        </TextimonialContainerStyle>
        <TextimonialContainerStyle onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={(e)=>{handleDragOver(e)}} onDrop={(event)=>drop(event)} onDragStart={(e)=>onDragStart(e)} onDragEnd={(e)=>onDragEnd(e)} draggable={true} className='flex ac jc list-item-5' id={"list-item-5"}>5
        </TextimonialContainerStyle>
        {/* <TextimonialContainerStyle onDropCapture={e=>drop(e)} onDragOver={(event)=>{event.preventDefault()}}  draggable={true} className='flex ac jc list-item'>< id={"list-item 1"}/TextimonialContainerStyle> */}
        {/* <TextimonialContainerStyle draggable={true} className='flex ac jc list-item'>3
        </TextimonialContainerStyle>
        <TextimonialContainerStyle draggable={true} className='flex ac jc list-item'>4
        </TextimonialContainerStyle> */}
<p id="drag-cursor">✋</p>
    </Container>
  )
}

export default salam



const TextimonialContainerStyle = styled.div`
height: 4rem;
width: 10rem;
border: 1px solid black;
position: relative;
margin-left:1rem;
cursor: move;

&.over{
    border: 3px dotted #666;
}
`


function elementsOverlap(el1:HTMLElement, el2:HTMLElement) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();

  
    return !(
      domRect1.top > domRect2.bottom ||
      domRect1.right < domRect2.left ||
      domRect1.bottom < domRect2.top ||
      domRect1.left > domRect2.right
    );
  }