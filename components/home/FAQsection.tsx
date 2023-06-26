import React, { useState } from 'react'
import styled from 'styled-components'
import Collapse from '../system/utilities/Collapse'
import { useTranslation } from 'next-i18next'
import MEDIAQUERIES from '@/constants/MEDIAQUERIES'
import COLORS from '@/constants/COLORS'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

const Container = styled.div`
margin: 1rem ;
max-width: 800px;
@media ${MEDIAQUERIES.laptopSmall}{
    margin: auto;
    margin-top: 2rem;
}
`


const QuestionStyle = styled.div`
    border-bottom: 1px solid #e5e5e5;
    text-align: left;
    padding: 1rem 0;

      
                `
const Question = ({question, answer}:{question:string, answer:string}) => {
    const [open, setOpen] = useState(false)
    return (
        <QuestionStyle>
            <div className='flex w-full jsb'><p className='h5 mb-2'>{question}</p> 
                <div className='pointer transition h6' style={{color:COLORS.MAINCOLOR}} onClick={()=>setOpen(prev=>!prev)}>{open?<BiChevronUp className='h5'/>:<BiChevronDown className='h5'/>}</div>
            </div>
        <Collapse on={open}>
            <p className='p' style={{color: COLORS.GREY, paddingTop:"1rem"}}>{answer}</p>
        </Collapse>
        </QuestionStyle>
    )
}
const FAQsection = () => {
    const {t} = useTranslation('common')
  return (
    <Container className='flex column jc ac gap-8'>
        <h3 className='h2' >{t("faq")}</h3>
        <div >
            <Question question={t("faq-free-to-use-q")} answer={t("faq-free-to-use-a")}></Question>
            <Question question={t("faq-cutomize-q")} answer={t("faq-cutomize-a")}></Question>
            <Question question={t("faq-download-q")} answer={t("faq-download-a")}></Question>
            <Question question={t("faq-account-q")} answer={t("faq-account-a")}></Question>
            <Question question={t("faq-progress-q")} answer={t("faq-progress-a")}></Question>
        </div>
    </Container>
  )
}

export default FAQsection