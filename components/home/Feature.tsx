import React from 'react'
import styled from 'styled-components'
import {  BLACKGREY, GREYWHITE, MAINCOLOR, device, shadow600 } from '../../data/contants'
import Link from 'next/link'
import useMediaQuery from '../../hooks/useMediaQuery'
import { Button } from '../../styles/global'



const FeatureContainerStyles = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
row-gap: 8px;
background: white;
>div{
    padding: 0.75rem;
    width: fit-content;
    background-color: ${MAINCOLOR}20;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    svg{
        height: 1.5rem;
        width: auto;
        /* fill: ${MAINCOLOR};  */
        /* *{
            fill: ${MAINCOLOR};
        } */
    }
}
>p{
    color: ${BLACKGREY};
    font-weight: 300;
    display: -webkit-box;
-webkit-line-clamp: 5;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis;
font-size: 0.9rem;
}
>button{
    padding: 0;
    margin-top: 8px;
}




@media ${device.laptopSmall}{
    
    padding: 1.5rem;
    transform: scale(1);
   >h4{
    min-height: 3.5rem;
   }
    :hover{
    transform: scale(1);
}

}`


const ReadMoreButton = styled(Button)`
display: flex;
align-items: center;
justify-content: flex-start;
column-gap: 8px;
::after{
    content: "›";
    font-size: 1.3rem;
    top:0%;
    height:fit-content;
    transition: all 0.3s ease-in-out;
}

:hover{
    ::after{

    }
}
`
type FeatureProps = {
    title: string,
    description:string,
    svg: React.ReactNode,
    link: string
}
const Feature:React.FC<FeatureProps> = ({title, description, svg, link}) => {
    const isMobile = useMediaQuery(device.mobileSmallPortrait)
    return (
        <FeatureContainerStyles className='transition'>
            <div>{svg}</div>
            <h4 className={isMobile?'h5':"p"}>{title}</h4>
            <p className='sp'>{description}</p>
            <Link href={link}>
                <ReadMoreButton  className='text transition'>
                Read More
                </ReadMoreButton>
            </Link>
        </FeatureContainerStyles>
    )
}


export default Feature