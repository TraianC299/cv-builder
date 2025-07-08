import imageZero from "@/assets/images/cv-images/0.jpg"
import imageOne from "@/assets/images/cv-images/1.jpg"
import imageTwo from "@/assets/images/cv-images/2.jpg"
import imageThree from "@/assets/images/cv-images/3.jpg"
import imageFour from "@/assets/images/cv-images/4.jpg"
import Input from '@/components/ui/input/Input'
import COLORS from '@/constants/COLORS'
import MEDIAQUERIES from '@/constants/MEDIAQUERIES'
import { useCV } from 'contexts/AppContext'
import Image from 'next/image'
import React, { RefObject, useCallback, useEffect, useState } from 'react'
import { BiCheckCircle } from 'react-icons/bi'
import { FiChevronRight } from 'react-icons/fi'
import styled from 'styled-components'


const TemplatesContainer = styled.div`
overflow: scroll;
background:  ${COLORS.LIGHTGREY};
padding: 0.5rem;
width: 100%;
display: grid;
grid-template-columns: repeat(5, 120px);
grid-template-rows: 169.7px;
grid-gap: 0.5rem;
justify-content: space-between;
scroll-behavior: smooth;

@media ${MEDIAQUERIES.desktop}{
    grid-gap: 1rem;
}


`


const Template = styled.div`
position: relative;
overflow: hidden;
height: 169.7px;
.overlay{
    display:none;
}
>svg{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    display: none;
}
&.selected{
    .overlay{
        display:flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${COLORS.MAINCOLOR};
        opacity: 0.5;
        z-index: 1;
    }
    >svg{
        display: block;

    }
}`


const ArrowRight = styled.div`
position: absolute;
bottom:0;
right:0;
height: calc(169.7px + 1rem);
width: 3rem;
background-image: linear-gradient(to right, transparent , ${COLORS.WHITE}, ${COLORS.WHITE}, ${COLORS.WHITE});
display: flex;
justify-content: center;
align-items: center;
z-index: 2;
cursor: pointer;
`
const ArrowLeft = styled(ArrowRight)`
background-image: linear-gradient(to left, transparent , ${COLORS.WHITE}, ${COLORS.WHITE});
right: auto;
left: 0;
`
const images = [imageZero, imageOne, imageTwo, imageThree, imageFour]

const TemplateSelector = () => {
    const { cvObject, setCvObject } = useCV()
    const ref = React.useRef<HTMLDivElement>(null)
    const { scrollTo, step, maxStepNumber } = useScrollWithButtons(ref)


    return (
        <Input.Wrapper>
            <Input.Label>Template</Input.Label>
            <TemplatesContainer ref={ref} className='flex gap-2 rounded-sm'>
                {step !== 0 && <ArrowLeft onClick={() => scrollTo("left")}>
                    <FiChevronRight color="black" className="h5 shadow-md transform rotate-180" />
                </ArrowLeft>}
                {images.map((image, index) => (
                    <Template key={index} className={` cursor-pointer rounded-sm ${cvObject.template === index && "selected"}`} onClick={() => setCvObject((prev) => ({ ...prev, template: index }))}>
                        <Image width={120} height={169.7} src={image} alt={`template ${index}`}></Image>
                        <div className='overlay flex items-center justify-center'>
                            <BiCheckCircle color="white" className="h5 shadow-md" />
                        </div>
                    </Template>
                ))}
                {step !== maxStepNumber && <ArrowRight onClick={() => scrollTo("right")} className='arrow-right'>
                    <FiChevronRight color="black" className="h5" />
                </ArrowRight>}
            </TemplatesContainer>
        </Input.Wrapper>
    )
}

export default TemplateSelector





const useScrollWithButtons = (ref: RefObject<HTMLElement>) => {
    const [step, setStep] = useState<number>(0)
    const [maxStepNumber, setMaxStepNumber] = useState<number>(0)

    const scrollTo = useCallback((direction: "right" | "left") => {
        setStep(previous => previous + (direction == "right" ? 1 : -1))
    }, [])


    useEffect(() => {

        if (ref.current) {
            const categoriesContainerWidth = ref.current.offsetWidth
            const categoriesWidth = ref.current.scrollWidth
            const slideNumber = Math.floor(categoriesWidth / categoriesContainerWidth)
            setMaxStepNumber(slideNumber)
        }
    }, [])


    useEffect(() => {
        if (ref.current) {
            ref.current.scrollLeft = ref.current.offsetWidth * step
        }
    }, [step])

    return {
        scrollTo,
        step,
        maxStepNumber
    }


}

