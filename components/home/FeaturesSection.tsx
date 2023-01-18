import React from 'react'
import styled from 'styled-components'
import {  BLACKGREY, device } from '../../data/contants'
import SaveSvg from '../../assets/svg/features/save.svg'
import Editor from '../../assets/svg/features/editor.svg'
import PdfSvg from '../../assets/svg/features/pdf.svg'
import TemplatesSvg from '../../assets/svg/features/templates.svg'
import FreeSvg from '../../assets/svg/features/free.svg'
import Feature from './Feature'
 

const FeaturesContainerStyles = styled.div`
padding: 1.5rem;
color: ${BLACKGREY};

@media ${device.laptopSmall}{
    display: flex;
    padding: 2rem 0rem;
    align-items: center;

}`

const ServicesContainerStyles = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
grid-gap: 1rem;

@media ${device.laptopSmall}{
    width: 45%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 1rem;
}`

const TextContentStyles = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
row-gap:1rem;


@media ${device.laptopSmall}{

    width: 55%;

}
    
`
const FeaturesSection = () => {
  return (
    <FeaturesContainerStyles className='sectionPadding'>
        <TextContentStyles>
            <h2 className='h3'>Services we offer</h2>
            <p className='h6'>We provide a wide range of services mostly oriented in the Translation service provisioning with extra focus on Website, Gaming, and Software Development localization fields, as well as DTP and Machine Learning solutions. With a long history of experience working in the technical and creative areas, our Project Managers are ready to help you with your needs no matter the complexity.</p>
        </TextContentStyles>
        <ServicesContainerStyles>
            {/* <Feature link="/services/translation-editing-and-proofreading" svg={<TemplatesSvg/>} title="Wide selection of templates and design options" description="To ensure the highest quality we always make sure the deliverables are double checked by the second linguist and by our Project Management team. We apply this mothod to all our Translation / Localization services."></Feature> */}
            <Feature link="/services/dtp-and-plr" svg={<Editor/>} title="Easy-to-use editor to customize your CV" description="The service consists of reconstructing / recreating the original layout and design of the document (in case the source document is uneditable). Our DTP specialist are trained to work with the following software: Adobe InDesign, Illustrator, Photoshop and so on."></Feature>
            <Feature link="/services/transcription-and-machine-learning" svg={<SaveSvg/>} title="Option to save your progress and come back to it later" description="As simple as it sound the transcription service is nothing more than putting words on 'papper'. Still, when it comes to Voice Recognition, a more detailed and complex transcription is required. We are here to help you with your Machine Learning project by providing you with lots of different voices resources as well as properly formatting and tagging them to improve your AI database and to make it more accurate in recognising words and phrases."></Feature>
             <Feature link="/services/subtitling-and-captioning" svg={<PdfSvg/>} title="Download your finished CV as a PDF" description="Youtube videos, Movies, TV-Shows, presetantions and interviews, these are just a few to name for our professionals can help you create subtitlies for. All you do is send us the videos and we will run it through our captioning process by transcribing, translatating it in any language and creating subtitles for. "></Feature>
            <Feature link="/services/voiceover-and-dubbing" svg={<FreeSvg/>} title="No fees or subscriptions required" description="Having a large data base of talented VO artist we are always here for to help you choose the best candidate / artist for your specific projects by offering you options to choose the gender in combination with different voice tones."></Feature>
        </ServicesContainerStyles>
    </FeaturesContainerStyles>
  )
}

export default FeaturesSection


