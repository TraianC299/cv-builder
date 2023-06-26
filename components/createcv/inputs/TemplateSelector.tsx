import Input from '@/components/system/input/Input'
import { CvObjectType, useCV } from 'contexts/AppContext'
import React from 'react'
import imageZero from "@/assets/images/cv-images/0.jpg"
import imageOne from "@/assets/images/cv-images/1.jpg"
import imageTwo from "@/assets/images/cv-images/2.jpg"
import imageThree from "@/assets/images/cv-images/3.jpg"
import styled from 'styled-components'
import COLORS from '@/constants/COLORS'
import Image from 'next/image'
import { BiCheckCircle } from 'react-icons/bi'
import MEDIAQUERIES from '@/constants/MEDIAQUERIES'


const TemplatesContainer = styled.div`
overflow: scroll;
background:  ${COLORS.LIGHTGREY};
padding: 0.5rem;
width: 100%;
display: grid;
grid-template-columns: repeat(4, 120px);
grid-template-rows: 169.7px;
grid-gap: 0.5rem;
justify-content: space-between;

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


const images = [imageZero, imageOne, imageTwo, imageThree]

const TemplateSelector = () => {
    const { cvObject, setCvObject } = useCV()
    return (
        <Input.Wrapper>
            <Input.Label>Template:</Input.Label>
            <TemplatesContainer className='flex gap-2 rounded-sm'>
                {images.map((image, index)=>(
                <Template  key={index} className={`pointer rounded-sm ${cvObject.template === index && "selected"}`} onClick={() => setCvObject((prev: CvObjectType) => ({ ...prev, template: index }))}>
                    <Image width={120} height={169.7} src={image} alt={`template ${index}`}></Image>
                    <div className='overlay flex ac jc'>
                        <BiCheckCircle color="white" className="h5 shadow-md"/>
                    </div>
                </Template>
                ))}
            </TemplatesContainer>
        </Input.Wrapper>
    )
}

export default TemplateSelector