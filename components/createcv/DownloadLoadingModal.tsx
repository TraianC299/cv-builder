import React, { useEffect } from 'react'
import Modal from '../ui/dataDisplay/Modal'
import Loading from '../ui/utilities/Loading'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    max-height: 200px;
    margin: auto;
    gap: 0;
    padding: 1rem;
    width: 100%;
    max-width: 200px;
    background: white;
    border-radius: 8px;
    p{
 
        text-align: center;
    }
    `
  const allTexts =   ["this-may-take-a-while",
    "almost-there",
    "just-a-few-more-seconds",
    "making-sure-everything-is-perfect",
    "generating-your-cv",
    "hold-on-tight",
    "your-cv-is-almost-ready",]
const DownloadLoadingModal = ({ open }: { open: boolean }) => {
    const [text, setText] = React.useState("Downloading your CV")
    const { t } = useTranslation(["create-cv", "common"])

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * allTexts.length)
            setText(allTexts[randomIndex])
        }, 3000);
        return () => clearInterval(interval)
    }
        , [])
    return (
        <Modal open={open}>
            <Container>
                <Loading />
                <p>{t(text)}</p>
            </Container>

        </Modal>
    )
}


export default DownloadLoadingModal