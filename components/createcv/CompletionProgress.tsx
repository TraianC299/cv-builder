import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import COLORS from '@/constants/COLORS'
import { useCV } from 'contexts/AppContext'


const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
gap: 0.5rem;
`
const ScoreContainer = styled.div`
padding: 0.5rem;
width: fit-content;
background: ${COLORS.MAINCOLOR};
color: white;
position: relative;
::after{
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 10px solid transparent;
    border-top-color: ${COLORS.MAINCOLOR};
}

`
const CompletionProgress = () => {
    const {progress} = useCV()
    const { t } = useTranslation(["create-cv", "common"])
    return (
        <Container>
            <div className='flex jsb ac'>
                <ScoreContainer>{progress}%</ScoreContainer>
                <p>{t("profile-completion")}</p>
            </div>
            <ProgressBar progress={progress}/>
        </Container>
    )
}

export default CompletionProgress




const ProgressBarContainer = styled.div`
width: 100%;
height: 8px;
background: ${COLORS.LIGHTGREY};
position: relative;
overflow: hidden;
>div{
    position: absolute;
    height: 100%;
    background: ${COLORS.MAINCOLOR};
    transition: width 0.3s ease-in-out;
}
`

interface ProgressBarProps {
    progress: number
}
const ProgressBar = ({progress}:ProgressBarProps) => {
    return (
        <ProgressBarContainer>
            <div style={{ width: `${progress}%` }}></div>
        </ProgressBarContainer>
    )
}
