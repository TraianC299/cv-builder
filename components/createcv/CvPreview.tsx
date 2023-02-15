import React, { Component, useState } from 'react'
import styled from 'styled-components';
import { CvObjectType, useCVcontext } from '../../contexts/AppContext';
import { GREY } from '../../data/contants';
import useWindowSize from '../../hooks/useWindowSize';
import { Button } from '../../styles/global';
import TemplateZero from './cvTemplates/0';
import TemplateOne from './cvTemplates/1';
import imageZero from "../../assets/images/cv-images/0.jpg"
import imageOne from "../../assets/images/cv-images/1.jpg"
import imageTwo from "../../assets/images/cv-images/2.jpg"
import Image from 'next/image';
import TemplateTwo from './cvTemplates/2';
import { TemplateContainerStyleProps } from '../../types';



const Container = styled.div<TemplateContainerStyleProps>`
height: ${props=>842 *props.scaleFactor}px;
width: ${props=>565 *props.scaleFactor}px;
>div{
  transform: scale(${props=>props.scaleFactor});
}`



const TemplatesContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 1rem;
column-gap: 1rem;
opacity:0;
height:0;
position: absolute;
bottom:0;
pointer-events: none;
&.open{
  height: calc(126px + 1rem);
  opacity:1;
  bottom:0;
  pointer-events: all;

}
`


const Template = styled.div`
height: 126px;
width: 79px;
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
    const {height} = useWindowSize()
    const {cvObject, setCvObject} = useCVcontext()
    const [openTemplates, setOpenTemplates] = useState(false)
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
        <TemplateTwo cvObject={cvObject}></TemplateTwo>
    ]

  return (
    <div className='flex column ac jc' style={{background: GREY, position:"relative"}}>
          <div style={{transform:`translateY(${openTemplates? "calc(-126px - 1rem)":0})`}} className=' flex column gap-4 transition'>
            <Container  scaleFactor={height ? height/842 - 0.2 : 1}>
              {/* <TemplateOne
              cvObject={cvObject}></TemplateOne> */}
              {templatesArray[cvObject.template]}
              
            </Container>
            <div  className='flex jsb'>
              <Button className='small' onClick={()=>setOpenTemplates(prev=>!prev)}>Select Template</Button>
              <Button className='small' onClick={(e)=>{e.preventDefault();generatePDF()}}>{loading?<p style={{animation:"rotation 1s infinite"}} >⌛</p>:"Download Pdf"}</Button>
            </div>
          </div>
            <TemplatesContainer className={openTemplates?"open transition":""}>
                <Template onClick={()=>setCvObject((prev:CvObjectType)=>({...prev, template:0}))}>
                    <Image  width={79} height={126} src={imageZero} alt="template one"></Image>
                </Template>
                <Template onClick={()=>setCvObject((prev:CvObjectType)=>({...prev, template:1}))} >
                    <Image  width={79} height={126} src={imageOne} alt="template two"></Image>
                </Template>
                <Template  onClick={()=>setCvObject((prev:CvObjectType)=>({...prev, template:2}))}>
                    <Image  width={79} height={126} src={imageTwo} alt="template three"></Image>
                </Template>
              
            </TemplatesContainer>
        </div>
  )
}

export default CvPreview