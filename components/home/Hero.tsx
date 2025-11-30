import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { Button } from '../../styles/global'
import { useTranslation } from 'next-i18next'
import COLORS from '@/constants/COLORS'
import useRewrites from '@/hooks/useRewrites'



const Container = styled.div`
position: relative;
height: calc(100vh - 6.5rem);
background: ${COLORS.LIGHTGREY};
overflow: hidden;
max-height: 900px;
border-radius: 0.5rem;



.text{
    position: absolute;
    left:50%;
    transform: translateX(-50%);
    max-width: 800px;
    margin:auto;
    text-align:center;
    z-index: 2;
    padding: 0 1rem;
}
@keyframes slide {
    0% {
        transform: translateX(0) rotate3d(0);
        }
    100% {
        transform: translateY(calc(100vh + 210px)) rotate3d(0, 1, 0, 360deg);
        }
}

>.card:first-child{
    margin-left: -550px;
    -webkit-animation-delay: -16s;
    animation-delay: -16s;
}
>.card:nth-child(2){
    margin-left: 550px;
    -webkit-animation-delay: -14.5s;
    animation-delay: -14.5s;
}
>.card:nth-child(3){
    margin-left: -350px;
    -webkit-animation-delay: -14s;
    animation-delay: -14s;
}
>.card:nth-child(4){
    margin-left: 350px;
    -webkit-animation-delay: -12.5s;
    animation-delay: -12.5s;
}
>.card:nth-child(5){
    margin-left: -750px;
    -webkit-animation-delay: -12s;
    animation-delay: -12s;
}
>.card:nth-child(6){
    margin-left: 150px;
    -webkit-animation-delay: -10.5s;
    animation-delay: -10.5s;
}
>.card:nth-child(7){
    margin-left: -650px;
    -webkit-animation-delay: -8s;
    animation-delay: -8s;
}
>.card:nth-child(8){
    margin-left: 650px;
    -webkit-animation-delay: -6.5s;
    animation-delay: -6.5s;
}
>.card:nth-child(9){
    margin-left: -350px;
    -webkit-animation-delay: -6s;
    animation-delay: -6s;
}
>.card:nth-child(10){
    margin-left: 350px;
    -webkit-animation-delay: -4.5s;
    animation-delay: -4.5s;
}
>.card:nth-child(11){
    margin-left: -600px;
    -webkit-animation-delay: -4s;
    animation-delay: -4s;
}
>.card:nth-child(12){
    margin-left: 600px;
    -webkit-animation-delay: -2.5s;
    animation-delay: -2.5s;
}
>.card:nth-child(12){
    margin-left: -200px;
    -webkit-animation-delay: -2s;
    animation-delay: -2s;
}
>.card:nth-child(13){
    margin-left: 200px;
    -webkit-animation-delay: -.5s;
    animation-delay: -.5s;
}
.card{
    opacity:0.6;
    position: absolute;
    top: -210px;
    left: 50%;
    translate: translateX(-50%);
    z-index: 0;
    height: 100%;
    width: 100%;
    background: url("/assets/images/hero-card.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    perspective: 500px;
    animation: slide 16s linear infinite;
    height: 210px;
    width: 140px;
    border-radius: 0.5rem;
    overflow: hidden;
}
                            `
const Hero = () => {
    const {t} = useTranslation()
    const {rewrite} = useRewrites()
  return (
    <Container>
        <div className='w-full h-full flex flex-col items-center justify-center text gap-4'>
            <h1 className='text-5xl font-semibold'>{t("hero-title")}</h1>
            <p className='text-base font-normal max-w-xl'>{t("hero-subtitle")}</p>
            <Link href={rewrite("creeaza-cv")}><Button>{t("try-it-now")}</Button></Link>
        </div>
        {Array.from({length: 15}).map((_, i) => <div key={i} className='card' ></div>)}
    </Container>
  )
}

export default Hero