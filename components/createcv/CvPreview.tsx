import React, { useState } from 'react'
import styled from 'styled-components';
import { CvObjectType, useCVcontext } from '../../contexts/AppContext';
import { GREY, LIGHTGREY, WHITE, device } from '../../data/contants';
import useWindowSize from '../../hooks/useWindowSize';
import { Button } from '../../styles/global';
import TemplateZero from '../templates/0';
import TemplateOne from '../templates/1';
import TemplateTwo from '../templates/2';
import TemplateThree from '../templates/3';
import imageZero from "../../assets/images/cv-images/0.jpg"
import imageOne from "../../assets/images/cv-images/1.jpg"
import imageTwo from "../../assets/images/cv-images/2.jpg"
import imageThree from "../../assets/images/cv-images/3.jpg"
import Image from 'next/image';
import { TemplateContainerStyleProps } from '../../types';

const OpenCvPreviewButton = styled(Button)`
position: absolute;
bottom: 1rem;
left: 1rem;
z-index: 1;

@media ${device.laptopSmall}{
  display: none;
}

`


const CvPreviewStyles = styled.div`
background-color: ${GREY};
position: relative;
opacity: 1;
@media ${device.mobileSmallPortrait}{
  width: 100vw;
  height: 100vh;
  position: fixed;
  opacity: 0;
  pointer-events: none;
  &.openMobileModal{
    opacity: 1;
    pointer-events: all;
  }
}`

const Container = styled.div<TemplateContainerStyleProps>`
height: ${props=>842 *props.scaleFactor}px;
width: ${props=>595 *props.scaleFactor}px;
>div{
  transform: scale(${props=>props.scaleFactor});
}

@media ${device.mobileSmallPortrait}{
  width: 100vw;
  height: ${props=>842 * (props.mobileScaleFactor ?? 1)}px;
  >div{
  transform: scale(${props=>props.mobileScaleFactor});;
}
}`



const TemplatesContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 1rem;
column-gap: 1rem;
opacity:0;
height:0;
position: absolute;
top:0;
left:0;
pointer-events: none;
background: ${WHITE};
height: 100%;
gap: 1rem;
background: ${LIGHTGREY};
&.open{
  width: calc(119px + 2rem);
  opacity:1;
  bottom:0;
  pointer-events: all;

}
`


const Template = styled.div`
height: auto;
width: 119px;
cursor: pointer;
`
async function getPDF(cvObject:CvObjectType, template:number) {
    return await fetch(`/api/cv/${template}`, {
      method:"POST",
      headers:{
        'Accept': 'application/pdf'
      },
      body:JSON.stringify(cvObject)
    })
      
    }

const CvPreview = () => {
    const {height, width} = useWindowSize()
    const {cvObject, setCvObject} = useCVcontext()
    const [openTemplates, setOpenTemplates] = useState(false)
    const [openModal ,setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)


    const generatePDF = async () => {
      setLoading(true)
        try{
          const response = await getPDF(cvObject, cvObject
            .template)
          const something = await response.arrayBuffer()
          const blob = new Blob([something], {type: 'application/pdf'})
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = `your-file-name.pdf`
          link.click()

        }catch(e){
            console.log(e)
        }finally{
          setLoading(false)
        }
    }


    const templatesArray = [
        <TemplateZero cvObject={cvObject}></TemplateZero>,
        <TemplateOne cvObject={cvObject}></TemplateOne>,
        <TemplateTwo cvObject={cvObject}></TemplateTwo>,
        <TemplateThree cvObject={cvObject}></TemplateThree>
    ]

  return (
    <>
          <OpenCvPreviewButton onClick={()=>setOpenModal(prev=>!prev)}>{openModal?"Close Preview":"Open Preview"}</OpenCvPreviewButton>
    <CvPreviewStyles className={`flex column ac jc ${openModal?"openMobileModal":""}`} >
          <div className=' flex column gap-4 transition'>
            <Container  scaleFactor={height ? height/842 - 0.2 : 1} mobileScaleFactor={width?width/595:1}>
              {/* <TemplateOne
              cvObject={cvObject}></TemplateOne> */}
              {templatesArray[cvObject.template]}
              
            </Container>
            <div  className='flex jsb'>
              <Button className='small text' style={{color:"white"}} onClick={()=>setOpenTemplates(prev=>!prev)}>Select Template</Button>
              <Button className='small' onClick={(e)=>{e.preventDefault();generatePDF()}}>{loading?<p style={{animation:"rotation 1s infinite"}} >⌛</p>:"Download Pdf"}</Button>
            </div>
          </div>
            <TemplatesContainer className={openTemplates?"open transition":"transition"}>
              <Button className='small w-full' onClick={()=>setOpenTemplates(false)}>×</Button>
                <Template onClick={()=>setCvObject((prev:CvObjectType)=>({...prev, template:0}))}>
                    <Image  width={119} height={168.4} src={imageZero} alt="template one"></Image>
                </Template>
                <Template onClick={()=>setCvObject((prev:CvObjectType)=>({...prev, template:1}))} >
                    <Image  width={119} height={168.4} src={imageOne} alt="template two"></Image>
                </Template>
                <Template  onClick={()=>setCvObject((prev:CvObjectType)=>({...prev, template:2}))}>
                    <Image  width={119} height={168.4} src={imageTwo} alt="template three"></Image>
                </Template>
                <Template  onClick={()=>setCvObject((prev:CvObjectType)=>({...prev, template:3}))}>
                    <Image  width={119} height={168.4} src={imageThree} alt="template four"></Image>
                </Template>
              
            </TemplatesContainer>
        </CvPreviewStyles>
        </>
  )
}

export default CvPreview