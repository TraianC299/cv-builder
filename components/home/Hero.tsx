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
    z-index: 2;
    position: absolute;
    left: 0;
    right: 0;
    height: 160px;
    width:100%;
    background: -webkit-gradient(linear,left top,left bottom,from ${BORDERCOLOR},to(rgba(239,242,249,0)));
    background: linear-gradient(to bottom,${BORDERCOLOR},rgba(239,242,249,0));
    pointer-events: none;

}
.text{
    position: absolute;
    left:50%;
    transform: translateX(-50%);
    max-width: 800px;
    margin:auto;
    text-align:center;
    z-index: 999999;
}
@keyframes slide {
    0% {
        transform: translateX(0) rotate3d(0);
        }
    100% {
        transform: translateY(calc(100vh + 210px)) rotate3d(0, 1, 0, 360deg);
        }
}
            .card{
                opacity:0.5;
                position: absolute;
                top: -210px;
                left: 0;
                z-index: 0;
                height: 100%;
                width: 100%;
                background: url("https://resume.io/assets/media/skeleton-3e3de1e4a53f043e9f188.png");
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                animation: slide 12s linear infinite;
                height: 210px;
                width: 140px;
                border-radius: 0.5rem;
                overflow: hidden;
                
                            }
                            `
const Hero = () => {
    const {width} = useWindowSize()
  return (
    <Container>
        <div className='w-full h-full flex column ac jc text gap1'>
            <h1 className='h2'>Only 2% of resumes make it past the first round. Be in the top 2%</h1>
            <p className='h6'>Use professional field-tested resume templates that follow the exact ‘resume rules’ employers look for. Easy to use and done within minutes - try now for free!</p>
            <Link href="create-cv"><Button className='flex ac jc gap05'>Try it now <p className='sp t300'>It's free</p></Button></Link>
        </div>
        {Array.from({length: width<500?5:18}).map((_, i) => <div className='card' style={{left:width * (i/10), animationDelay:(i+1)%4===0?"4s":(i+1)%3===0?"8s":""}}></div>)}
    </Container>
  )
}

export default Hero