import React from 'react'
import image from '../../assets/images/home/threeCV.png'
import styled from 'styled-components'
import Image from 'next/image'
import { Button } from '../../styles/global'
import Link from 'next/link'
import { device } from '../../data/contants'



const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
width: 100%;
height: fit-content;
@media ${device.laptopSmall}{
    flex-direction: row;
    height: 40rem;
    padding-top: 2rem;
    padding-bottom: 2rem;

}
`
const TextContentStyle = styled.div`
width: 100%;
row-gap: 1rem;
@media ${device.laptopSmall}{
    width: 50%;

}
`

const ImageContainer  = styled.div`
width: 100%;
position: relative;
min-height: 400px;
@media ${device.laptopSmall}{
    width: 50%;
    height: 100%;

}
`
const ThreeCVsection = () => {
  return (
    <Container className='sectionPadding gap-8'>
<TextContentStyle className='flex column afs'>
    <h3 className='h3'>
Try our professional Resume builder now!</h3>
<p className='h6'>Save time with our easy 3-step resume builder. No more writer’s block or formatting difficulties in Word. Rapidly make a perfect resume employers love.</p>
<Link href="create-cv"><Button style={{marginTop: "2rem"}}>Create my CV</Button></Link>
</TextContentStyle>
        <ImageContainer className='flex ac jc'>
            <Image style={{objectFit: "contain"}} alt="3 examples of resumes" fill src={image}></Image>
        </ImageContainer>
    </Container>
  )
}

export default ThreeCVsection