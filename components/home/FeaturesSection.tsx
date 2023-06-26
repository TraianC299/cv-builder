import React from 'react'
import styled from 'styled-components'
import SaveSvg from '../../assets/svg/features/save.svg'
import Editor from '../../assets/svg/features/editor.svg'
import PdfSvg from '../../assets/svg/features/pdf.svg'
import FreeSvg from '../../assets/svg/features/free.svg'
import Feature from './Feature'
import {useTranslation} from 'next-i18next'
import MEDIAQUERIES from '@/constants/MEDIAQUERIES'
import COLORS from '@/constants/COLORS'

const FeaturesContainerStyles = styled.div`
color: ${COLORS.BLACKGREY};

@media ${MEDIAQUERIES.laptopSmall}{
    display: flex;
    align-items: center;
    gap: 5rem;

}`

const ServicesContainerStyles = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
/* grid-gap: 1rem; */
gap:1rem;
>div{
    border-bottom: 1px solid ${COLORS.LIGHTGREY};
}
@media ${MEDIAQUERIES.laptopSmall}{
    gap:2px;
    background-color: ${COLORS.LIGHTGREY};
    
    width: 50%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    >div{
    border-bottom: none;
    }
}`

const TextContentStyles = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
row-gap:1rem;
margin-bottom: 2rem;


@media ${MEDIAQUERIES.laptopSmall}{
    max-width: 500px;
    width: 55%;

}
    
`
const FeaturesSection = () => {
    const {t} = useTranslation()

  return (
    <FeaturesContainerStyles className='sectionPadding'>
        <TextContentStyles>
            <h2 className='h2'>{t("why-us-title")}</h2>
            <p className='h6'>{t("why-us-subtitle")}</p>
        </TextContentStyles>
        <ServicesContainerStyles>
            {/* <Feature link="/services/translation-editing-and-proofreading" svg={<TemplatesSvg/>} title="Wide selection of templates and design options" description="To ensure the highest quality we always make sure the deliverables are double checked by the second linguist and by our Project Management team. We apply this mothod to all our Translation / Localization services."></Feature> */}
            <Feature link="/services/dtp-and-plr" svg={<Editor/>} title={t("easy-to-use-title")} description={t("easy-to-use-subtitle")}></Feature>
            <Feature link="/services/transcription-and-machine-learning" svg={<SaveSvg/>} title={t("save-progess-title")} description={t("save-progress-subtitle")}></Feature>
             <Feature link="/services/subtitling-and-captioning" svg={<PdfSvg/>} title={t("download-pdf-title")} description={t("download-pdf-subtitle")}></Feature>
            <Feature link="/services/voiceover-and-dubbing" svg={<FreeSvg/>} title={t("no-fees-title")} description={t("no-fees-subtitle")}></Feature>
        </ServicesContainerStyles>
    </FeaturesContainerStyles>
  )
}

export default FeaturesSection


