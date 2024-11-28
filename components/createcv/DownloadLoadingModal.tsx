import React, { useEffect } from 'react'
import Modal from '../ui/dataDisplay/Modal'
import Loading from '../ui/utilities/Loading'
import styled from 'styled-components'


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

const allTexts = ["Downloading your CV", "This may take a while", "Almost there", "Just a few more seconds", "Making sure everything is perfect", "Generating your CV", "Hold on tight", "Your CV is almost ready", "Just a few more seconds", "Downloading your CV", "This may take a while", "Almost there", "Just a few more seconds", "Making sure everything is perfect", "Generating your CV", "Hold on tight", "Your CV is almost ready", "Just a few more seconds"]
const DownloadLoadingModal = ({ open }: { open: boolean }) => {
    const [text, setText] = React.useState("Downloading your CV")

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * allTexts.length)
            setText(allTexts[randomIndex])
        }, 2000);
        return () => clearInterval(interval)
    }
        , [])
    return (
        <Modal open={open}>
            <Container>
                <Loading />
                <p>{text}</p>
            </Container>

        </Modal>
    )
}

export default DownloadLoadingModal