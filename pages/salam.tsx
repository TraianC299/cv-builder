import React from 'react'
import styled from 'styled-components'
const Container = styled.ul``

const salam = () => {
    const [placeholder, setPlaceholder] = React.useState<number | null>(null)
    const [list, setList] = React.useState(["A","B","C","D","E"])
    const [overIndex, setOverIndex] = React.useState<number | null>(null)
   


   

  return (
    <Container className='flex column gap-2'>
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

type DraggableComponentProps = {
    children:React.ReactNode,
    placeholder: number | null,
    setPlaceholder: React.Dispatch<React.SetStateAction<number | null>>,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    overIndex: number | null,
    setOverIndex: React.Dispatch<React.SetStateAction<number | null>>
}


const DraggableComponent = ({children, placeholder, setPlaceholder, list, setList, index, overIndex, setOverIndex}:DraggableComponentProps)=> {
    function onDragStart(e: any | undefined, index:number) {
        if(!e)return
        e.target.visibility = 'hidden';
        e.target.style.opacity = '0.001';
        e.dataTransfer.effectAllowed = 'move';
        setPlaceholder(index)
        // setStartDiv(e.target)
        // e.dataTransfer.effectAllowed = 'move';
        // e.dataTransfer.setData('text/html', e.target.innerHTML);
      }

    const onDragEnd = (e:any ) => {
        e.target.style.opacity = '1';
        e.target.visibility = 'visible';
        setOverIndex(null)
    }
    function onDragDrop(ev:React.DragEvent<HTMLDivElement>, index:number) {
        ev.stopPropagation();
        //rearrange list
        const listPLaceholder = [...list]
        const item = listPLaceholder.splice(placeholder ??1, 1)[0]
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



    function handleDragEnter(e:React.DragEvent<HTMLDivElement>){
        
        e.preventDefault();
        e.stopPropagation();
        setOverIndex(index)
    }
    function handleDragLeave(e:React.DragEvent<HTMLDivElement>){

        e.preventDefault();
        e.stopPropagation();
        setOverIndex(null)
    }
    function handleDragOver(e:React.DragEvent<HTMLDivElement>){

        e.preventDefault();
        e.stopPropagation();
        setOverIndex(index)
    }






      
    return(<DraggabbleContainerStyle  
        onDragEnter={(e)=>handleDragEnter(e)} 
        onDragLeave={(e)=>handleDragLeave(e)} 
        onDragOver={(e)=>{handleDragOver(e)}} 
        onDrop={(e)=>onDragDrop(e, index)} 
        onDragStart={(e)=>onDragStart(e, index)} 
        onDragEnd={(e)=>onDragEnd(e)} 
        draggable={true} 
        className={`flex ac jc transition ${overIndex===index?"over":""}`}
        aria-roledescription="This is a draggable item. Press space to lift.">{children}
        </DraggabbleContainerStyle>)
}





