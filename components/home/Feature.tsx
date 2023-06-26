import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import useMediaQuery from '../../hooks/useMediaQuery'
import { Button } from '../../styles/global'
import {useTranslation} from 'next-i18next'
import MEDIAQUERIES from '@/constants/MEDIAQUERIES'
import COLORS from '@/constants/COLORS'



const FeatureContainerStyles = styled.div`
display: grid;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
row-gap: 8px;
background: white;
height: 100%;
>a{
    align-self: flex-end;
}
>div{
    padding: 0.75rem;
    width: fit-content;
    background-color: ${COLORS.MAINCOLOR}20;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    svg{
        height: 1.5rem;
        width: auto;
        /* fill: ${COLORS.MAINCOLOR};  */
        /* *{
            fill: ${COLORS.MAINCOLOR};
        } */
    }
}
>p{
    color: ${COLORS.BLACKGREY};
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




@media ${MEDIAQUERIES.laptopSmall}{
    
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
    const isMobile = useMediaQuery(MEDIAQUERIES.mobileSmallPortrait)
    const {t} = useTranslation()
    return (
        <FeatureContainerStyles className='transition'>
            <div>{svg}</div>
            <h4 className={isMobile?'h5':"p"}>{title}</h4>
            <p className='sp'>{description}</p>
            <Link href={link}>
                <ReadMoreButton  className='text transition'>
                {t("read-more")}
                </ReadMoreButton>
            </Link>
        </FeatureContainerStyles>
    )
}


export default Feature