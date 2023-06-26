import React, { useState } from 'react'
import styled from 'styled-components';
import { CvObjectType, useCV } from '../../contexts/AppContext';
import useWindowSize from '../../hooks/useWindowSize';
import { Button } from '../../styles/global';
import TemplateZero from '../templates/0';
import TemplateOne from '../templates/1';
import TemplateTwo from '../templates/2';
import TemplateThree from '../templates/3';
import { TemplateContainerStyleProps } from '../../types';
import MEDIAQUERIES from '@/constants/MEDIAQUERIES';
import COLORS from '@/constants/COLORS';
import { useTranslation } from 'next-i18next';
import { ImSpinner2 } from 'react-icons/im'
import { FiEye } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5'

const EyeButton = styled.button`
height: 3rem;
width: 3rem;
background: ${COLORS.MAINCOLOR};
position: absolute;
bottom: 1rem;
right: 1rem;
z-index: 101;

@media ${MEDIAQUERIES.laptopSmall}{
  display: none;
}

`


const CvPreviewStyles = styled.div`
background-color: ${COLORS.GREY};
position: relative;
opacity: 1;
@media ${MEDIAQUERIES.mobileSmallPortrait}{
  width: 100vw;
  height: 100vh;
  position: fixed;
  opacity: 0;
  pointer-events: none;
  &.openMobileModal{
    opacity: 1;
    pointer-events: all;
    z-index: 100;
  }
}`

const Container = styled.div<TemplateContainerStyleProps>`
height: ${props => 842 * props.scaleFactor}px;
width: ${props => 595 * props.scaleFactor}px;
overflow: hidden;
>div{
  transform: scale(${props => props.scaleFactor});
}

@media ${MEDIAQUERIES.mobileSmallPortrait}{
  width: calc(100vw - 2rem);
  height: ${props => 842 * (props.mobileScaleFactor ?? 1)}px;
  >div{
  transform: scale(${props => props.mobileScaleFactor});;
}
}`



async function getPDF(cvObject: CvObjectType, template: number) {
  return await fetch(`/api/cv/${template}`, {
    method: "POST",
    headers: {
      'Accept': 'application/pdf'
    },
    body: JSON.stringify(cvObject)
  })

}

const CvPreview = () => {
  const { height, width } = useWindowSize()
  const { cvObject } = useCV()
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation("create-cv")

  const generatePDF = async () => {
    setLoading(true)
    try {
      const response = await getPDF(cvObject, cvObject
        .template)
      const something = await response.arrayBuffer()
      const blob = new Blob([something], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `your-file-name.pdf`
      link.click()

    } catch (e) {
      console.log(e)
    } finally {
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
      <EyeButton className='rounded-sm flex ac jc shadow-md' onClick={() => setOpenModal(prev => !prev)}>{openModal ? <IoClose className='h6' color="white" /> : <FiEye className='h6' color="white" />}</EyeButton>
      <CvPreviewStyles className={`flex column ac jc ${openModal ? "openMobileModal" : ""}`} >
        <div className=' flex column gap-4 transition'>
          <Container scaleFactor={height ? height / 842 - 0.2 : 1} mobileScaleFactor={width ? width / (595+32) : 1}>
            {templatesArray[cvObject.template]}
          </Container>
          <div className='flex jsb'>
            <div></div>
            <Button disabled={loading} className='small' onClick={(e) => { e.preventDefault(); generatePDF() }}>{loading ? <ImSpinner2 style={{ animation: "rotation 1s infinite" }} /> : t("download-pdf")}</Button>
          </div>
        </div>
      </CvPreviewStyles>
    </>
  )
}

export default CvPreview