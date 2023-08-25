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
    justify-content: space-around;
    align-items: center;
    gap: 5rem;

}`

const ServicesContainerStyles = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
/* grid-gap: 1rem; */
gap:2rem;

@media ${MEDIAQUERIES.laptopSmall}{
    gap:1px;
    
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
    max-width: 400px;
    width: 55%;

}
    
`
const FeaturesSection = () => {
    const {t} = useTranslation()

  return (
    <FeaturesContainerStyles className='sectionPadding'>
        <TextContentStyles>
            <h2 className='h3 md-h4 font-semibold'>{t("why-us-title")}</h2>
            <p className='p md-h6 text-grey'>{t("why-us-subtitle")}</p>
        </TextContentStyles>
        <ServicesContainerStyles>
            <Feature link="/services/dtp-and-plr" svg={<Editor/>} title={t("easy-to-use-title")} description={t("easy-to-use-subtitle")}></Feature>
            <Feature link="/services/transcription-and-machine-learning" svg={<SaveSvg/>} title={t("save-progess-title")} description={t("save-progress-subtitle")}></Feature>
             <Feature link="/services/subtitling-and-captioning" svg={<PdfSvg/>} title={t("download-pdf-title")} description={t("download-pdf-subtitle")}></Feature>
            <Feature link="/services/voiceover-and-dubbing" svg={<FreeSvg/>} title={t("no-fees-title")} description={t("no-fees-subtitle")}></Feature>
        </ServicesContainerStyles>
    </FeaturesContainerStyles>
  )
}

export default FeaturesSection


