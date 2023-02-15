import React, {  useRef } from 'react'
import styled from 'styled-components'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import useMediaQuery from '../../hooks/useMediaQuery'
import { BLACKGREY, device, GREYWHITE } from '../../data/contants'
import image1 from '../../assets/images/cv-images/0.jpg'
import image2 from '../../assets/images/cv-images/1.jpg'
import image3 from '../../assets/images/cv-images/2.jpg'

import Image, { StaticImageData } from 'next/image'
import { Button } from '../../styles/global'
const Container = styled.div`
background-color: ${GREYWHITE};
min-height: 40rem;
flex: 1;
margin: 0 2rem;
@media ${device.laptopSmall}{
    display: flex;
    flex-direction: row;
    padding: 4rem;
    padding-right:0;
    align-items: center;

}
`

const Wrapper = styled.div`
 height: 100%;
 width: 100%;
  position: relative;
  overflow-x: clip;
`

const TextContentStyles = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
color: ${BLACKGREY};
row-gap:1rem;
padding: 1.5rem;
padding-bottom:0;
@media ${device.laptopSmall}{
    width: 55%;
}
    
`

const TestimonialsContainerStyles = styled.div`
display: grid;
grid-template-columns: 90% 90% 90%;
padding: 2rem;
overflow-y: hidden;
scroll-snap-type: x mandatory;
scroll-snap-stop: always;
column-gap: 2rem;
position: relative;
scroll-behavior: smooth;
::-webkit-scrollbar {
  display: none;
}
>div{
    scroll-snap-align: center;
}

/* Hide scrollbar for IE, Edge and Firefox */
 
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

@media ${device.laptopSmall}{
    grid-template-columns: 18rem 18rem 18rem;
    >div{
        scroll-snap-align: none;
    }
}

@media ${device.tabletSmallPortrait}{
    grid-template-columns: 15rem 15rem 15rem;
}
`

const templateImages = [
    image1,
    image2,
    image3,
]

 

const TemplatesSection = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    const [number, setNumber] = React.useState(0)

    useDidMountEffect(()=>{
        if(ref.current){
            ref.current.scrollLeft = ((ref.current.scrollWidth/5) * number)
        }
    },[number])


  return (
    <Container>
        <TextContentStyles>
            <h2 className='h2'>Templates and design options</h2>
            <p className='h6'>We offer a variety of templates and design options to choose from, ensuring that you can create a CV that reflects your personal style and brand. Whether you're a creative professional looking for a unique layout or a more traditional job seeker seeking a classic design, we have a template that will suit your needs. Take a look at our selection:</p>
          

        </TextContentStyles>
                <Wrapper>
                    <PointsContainer id="testimonials-slider-controller-desktop">
                    {[...Array(templateImages.length)].map((i, index)=>(
                        <button key={index} onClick={()=>setNumber(index)} className={number === index ? "active":""}/>
                    ))}
                    </PointsContainer>
                    <TestimonialsContainerStyles ref={ref}>
                        {templateImages.map((image, index)=><Testimonial selected={index===number} src={image}></Testimonial>)}
                        </TestimonialsContainerStyles>
                </Wrapper>
    </Container>
  )
}


const PointsContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
column-gap: 1rem;
position: absolute;
bottom: -1rem;
left:8rem;
>button{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 1px solid white;
    background-color: transparent;
    cursor: pointer;
    &.active{
        background-color: ${BLACKGREY};
    }

}

@media ${device.mobileSmallPortrait}{
    display: none;
}`

export default TemplatesSection






const TextimonialContainerStyle = styled.div`
height: 427px;
width: 293px;
position: relative;
>div{
    position: absolute;
    top:0;
    left:0;
    content: ${`""`};
    height: 100%;
    width: 100%;
    opacity:0;
    background-color: rgba(0,0,0,0.2);

}

:hover{
    >div{
        opacity:1;


    }
}
&.selected{
    transform: scale(1.1);
}

`




interface TestimonialProps {
    src: StaticImageData;
    selected: boolean;
}

const Testimonial:React.FC<TestimonialProps> = ({ src, selected }) => {
    const isMobile = useMediaQuery(device.mobileSmallPortrait)
    return(
        <TextimonialContainerStyle className={selected?'selected transition':"transition"}>
            <Image alt='' height={427} width={293} src={src}></Image>
            <div className='flex ac jc transition' >
                <Button className='small'>Try it now</Button>
            </div>
        </TextimonialContainerStyle>
    )
}