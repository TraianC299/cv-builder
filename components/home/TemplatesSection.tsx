import React, {  useRef } from 'react'
import styled from 'styled-components'
import useDidMountEffect from '../../hooks/useDidMountEffect'
import image1 from '../../assets/images/cv-images/0.jpg'
import image2 from '../../assets/images/cv-images/1.jpg'
import image3 from '../../assets/images/cv-images/2.jpg'
import image4 from '../../assets/images/cv-images/3.jpg'
import Image, { StaticImageData } from 'next/image'
import { Button } from '../../styles/global'
import { useTranslation } from 'next-i18next'
import COLORS from '@/constants/COLORS'
import MEDIAQUERIES from '@/constants/MEDIAQUERIES'


const Container = styled.div`
background-color: ${COLORS.LIGHTGREY};
min-height: 40rem;
flex: 1;
border-radius: 0.5rem;
@media ${MEDIAQUERIES.laptopSmall}{
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
color: ${COLORS.BLACKGREY};
row-gap:1rem;
padding: 1rem;
padding-bottom:0;
max-width: 500px;
@media ${MEDIAQUERIES.laptopSmall}{
    width: 55%;
}
    
`

const TestimonialsContainerStyles = styled.div`
display: grid;
grid-template-columns: 100% 100% 100% 100%;
padding: 1rem;
overflow-y: hidden;
scroll-snap-type: x mandatory;
scroll-snap-stop: always;
column-gap: 1rem;
position: relative;
scroll-behavior: smooth;
::-webkit-scrollbar {
  display: none;
}
>div{
    scroll-snap-align: center;
    width: 100%;
}

/* Hide scrollbar for IE, Edge and Firefox */
 
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

@media ${MEDIAQUERIES.laptopSmall}{
    grid-template-columns: 18rem 18rem 18rem 18rem 18rem 18rem 18rem 18rem 18rem;
    >div{
        scroll-snap-align: none;
    }
}

@media ${MEDIAQUERIES.tabletSmallPortrait}{
    grid-template-columns: 15rem 15rem 15rem 15rem;
}
`

const templateImages = [
    image4,
    image2,
    image3,
    image1,
]

 

const TemplatesSection = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    const [number, setNumber] = React.useState(0)
    const {t} = useTranslation()
    useDidMountEffect(()=>{
        if(ref.current){
            ref.current.scrollTo({left: 304 * number, behavior: 'smooth'})
        }
    },[number])


  return (
    <Container>
        <TextContentStyles>
            <h2 className='h2'>{t("templates-section-title")}</h2>
            <p className='p'>{t("templates-section-subtitle")}</p>
        </TextContentStyles>
                <Wrapper>
                    <PointsContainer id="testimonials-slider-controller-desktop">
                    {[...Array(templateImages.length)].map((i, index)=>(
                        <button key={index} onClick={()=>setNumber(index)} className={number === index ? "active":""}/>
                    ))}
                    </PointsContainer>
                    <TestimonialsContainerStyles ref={ref}>
                        {templateImages.map((image, index)=><Testimonial key={index} scaleFactor={1 - Math.abs(number - index)*0.1} src={image}></Testimonial>)}
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
    border: 1px solid black;
    background-color: transparent;
    cursor: pointer;
    &.active{
        background-color: ${COLORS.BLACKGREY};
    }

}

@media ${MEDIAQUERIES.mobileSmallPortrait}{
    display: none;
}`

export default TemplatesSection






const TextimonialContainerStyle = styled.div<{scaleFactor:number}>`
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
    scaleFactor: number;
}

const Testimonial:React.FC<TestimonialProps> = ({ src, scaleFactor }) => {
    return(
        <TextimonialContainerStyle scaleFactor={scaleFactor}  className={"transition"}>
            <Image alt='' fill src={src}></Image>
            <div className='flex ac jc transition' >
                <Button className='small'>Try it now</Button>
            </div>
        </TextimonialContainerStyle>
    )
}