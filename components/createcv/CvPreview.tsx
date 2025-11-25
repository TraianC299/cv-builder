import COLORS from '@/constants/COLORS';
import MEDIAQUERIES from '@/constants/MEDIAQUERIES';
import useLockBody from '@/hooks/useLockBody';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { useCV } from '../../contexts/AppContext';
import useWindowSize from '../../hooks/useWindowSize';
import { Button } from '../../styles/global';
import { TemplateContainerStyleProps } from '../../types';
import TemplateZero from '../cv-templates/0';
import TemplateOne from '../cv-templates/1';
import TemplateTwo from '../cv-templates/2';
import TemplateThree from '../cv-templates/3';
import TemplateFour from '../cv-templates/4';
import DownloadLoadingModal from './DownloadLoadingModal';

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
background-color: ${COLORS.GREYWHITE};
position: relative;
opacity: 1;

@media ${MEDIAQUERIES.mobileSmallPortrait}{
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: none;
  &.openMobileModal{
    display: flex;
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




const CvPreview = () => {
  const { height, width } = useWindowSize()
  const { cvObject } = useCV()
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation(["create-cv", "common"])
  useLockBody()
  const router = useRouter()
  const cvRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    setLoading(true)
    try {
      // const response = await getPDF({
      //   ...cvObject,
      //   language: router.locale || 'en'
      // })
      // const something = await response.arrayBuffer()
      // const blob = new Blob([something], { type: 'application/pdf' })
      // const link = document.createElement('a')
      // link.href = window.URL.createObjectURL(blob)
      // link.download = `CV.pdf`
      // link.click()
      if (!cvRef.current) return;

      // Wait for all images to load
      await Promise.all(
        Array.from(cvRef.current.querySelectorAll('img')).map((img) => {
          if (!img.complete) {
            return new Promise((resolve) => {
              img.onload = img.onerror = resolve;
            });
          }
          return Promise.resolve();
        })
      );

      // Use html2canvas to take a screenshot of the cvRef element
      const canvas = await html2canvas(cvRef.current, {
        scale: 3, // increase for better quality
        useCORS: true, // needed if you load images with CORS issues
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('cv.pdf');

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
    <TemplateThree cvObject={cvObject}></TemplateThree>,
    <TemplateFour cvObject={cvObject}></TemplateFour>
  ]

  const desktopScaleFactor = height ? height / 842 - 0.2 : 1
  const mobileScaleFactor = width ? width / (595 + 32) : 1

  return (
    <>
      <EyeButton className='rounded-sm flex items-center justify-center shadow-md' onClick={() => setOpenModal(prev => !prev)}>{openModal ? <IoClose className='text-lg' color="white" /> : <FiEye className='text-lg' color="white" />}</EyeButton>
      <CvPreviewStyles className={`flex flex-col items-center justify-center ${openModal ? "openMobileModal" : ""}`} >
        <div className=' flex flex-col gap-4 transition'>
          <Container ref={cvRef} scaleFactor={desktopScaleFactor} mobileScaleFactor={mobileScaleFactor}>
            {templatesArray[cvObject.template]}
          </Container>
          <div className='flex justify-between '>
            <div></div>
            <Button disabled={loading} onClick={(e) => { e.preventDefault(); generatePDF() }}>{loading ? <ImSpinner2 className='text-lg animate-spin' color={COLORS.WHITE} /> : t("download-pdf")}</Button>
          </div>
        </div>
        <DownloadLoadingModal open={loading} />
      </CvPreviewStyles>
    </>
  )
}

export default CvPreview