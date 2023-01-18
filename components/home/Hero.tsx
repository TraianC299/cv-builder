import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { BORDERCOLOR } from '../../data/contants'
import useWindowSize from '../../hooks/useWindowSize'
import { Button } from '../../styles/global'



const Container = styled.div`
position: relative;
height: 100vh;
width: 100%;
background: #eff2f9;
overflow: hidden;

::before{
    content: '';
    z-index: 9;
    position: absolute;
    left: 0;
    right: 0;
    height: 160px;
    width:100%;
    background: -webkit-gradient(linear,left top,left bottom,from ${BORDERCOLOR},to(rgba(239,242,249,0)));
    background: linear-gradient(to bottom,${BORDERCOLOR},rgba(239,242,249,0));
    pointer-events: none;

}
::after{
    content: '';
    z-index: 9;
    position: absolute;
    left: 0;
    right: 0;
    height: 160px;
    background: -webkit-gradient(linear,left top,left bottom,from(${BORDERCOLOR}),to(rgba(239,242,249,0)));
    background: linear-gradient(to bottom,${BORDERCOLOR},rgba(239,242,249,0));
    pointer-events: none;
    bottom: 0;
    -webkit-transform: scaleY(-1);
    transform: scaleY(-1);
}
.text{
    position: absolute;
    left:50%;
    transform: translateX(-50%);
    max-width: 800px;
    margin:auto;
    text-align:center;
    z-index: 2;
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
                background: url("https://resume.io/assets/media/skeleton-3e3de1e4a53f043e9f188.png");
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
  return (
    <Container>
        <div className='w-full h-full flex column ac jc text gap1'>
            <h1 className='h2'>Only 2% of resumes make it past the first round. Be in the top 2%</h1>
            <p className='h6'>Use professional field-tested resume templates that follow the exact ‘resume rules’ employers look for. Easy to use and done within minutes - try now for free!</p>
            <Link href="create-cv"><Button className='flex ac jc gap05'>Try it now <p className='sp t300'>It's free</p></Button></Link>
        </div>
        {Array.from({length: 15}).map((_, i) => <div className='card' ></div>)}
    </Container>
  )
}

export default Hero