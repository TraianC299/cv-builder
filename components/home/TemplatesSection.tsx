import image5 from "@/assets/images/cv-images/4.jpg"
import COLORS from '@/constants/COLORS'
import MEDIAQUERIES from '@/constants/MEDIAQUERIES'
import { useTranslation } from 'next-i18next'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import image1 from '../../assets/images/cv-images/0.jpg'
import image2 from '../../assets/images/cv-images/1.jpg'
import image3 from '../../assets/images/cv-images/2.jpg'
import image4 from '../../assets/images/cv-images/3.jpg'
import { Button } from '../../styles/global'
import ScrollByDragContainer from '../utilities/ScrollByDragContainer'


const Container = styled.div`
background-color: ${COLORS.LIGHTGREY};
min-height: 40rem;
flex: 1;
border-radius: 0.5rem;
overflow: hidden;
@media ${MEDIAQUERIES.laptopSmall}{
    display: flex;
    flex-direction: row;
    padding: 4rem;
    padding-right:0;
    align-items: center;

}
`
const Wrapper = styled.div`
 flex:1;
 overflow: hidden;
 `



const TextContentStyles = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
color: ${COLORS.BLACK};
row-gap:1rem;
padding: 1rem;
padding-bottom:0;
max-width: 500px;
min-width: 500px;
z-index: 2;
@media ${MEDIAQUERIES.laptopSmall}{
    width: 55%;
}
    
`

const TestimonialsContainerStyles = styled.div`
display: grid;
grid-template-columns: 100% 100% 100% 100% 100%;
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
    overflow-y: visible;
    grid-template-columns: 18rem 18rem 18rem 18rem 18rem;
    >div{
        scroll-snap-align: none;
    }
}

@media ${MEDIAQUERIES.tabletSmallPortrait}{
    grid-template-columns: 15rem 15rem 15rem 15rem 15rem;
}
`

const templateImages = [
    image4,
    image2,
    image3,
    image1,
    image5,
]



const TemplatesSection = () => {
    // const [number, setNumber] = React.useState(0)
    const { t } = useTranslation()


    return (
        <Container>
            <TextContentStyles>
                <h2 className='h3 md-h2 font-semibold'>{t("templates-section-title")}</h2>
                <p className='p md-h6 text-grey'>{t("templates-section-subtitle")}</p>
            </TextContentStyles>
            <Wrapper>

                <ScrollByDragContainer>
                    <TestimonialsContainerStyles >
                        {templateImages.map((image, index) => <Testimonial key={index} src={image}></Testimonial>)}
                    </TestimonialsContainerStyles>
                </ScrollByDragContainer>
            </Wrapper>
        </Container>
    )
}




export default TemplatesSection






const TextimonialContainerStyle = styled.div`
height: 427px;
width: 293px;
position: relative;
>div{
    position: absolute;
    top:0;
    left:0;
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
}

const Testimonial: React.FC<TestimonialProps> = ({ src }) => {
    const { t } = useTranslation()

    return (
        <TextimonialContainerStyle className={"transition"}>
            <Image alt='' fill src={src}></Image>
            <div className='flex ac jc transition' >
                <Link href="create-cv"><Button className='small'>{t("try-it-now")}</Button></Link>
            </div>
        </TextimonialContainerStyle>
    )
}