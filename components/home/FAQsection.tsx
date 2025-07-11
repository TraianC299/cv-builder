import COLORS from '@/constants/COLORS'
import MEDIAQUERIES from '@/constants/MEDIAQUERIES'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import styled from 'styled-components'
import Collapse from '../ui/utilities/Collapse'

const Container = styled.div`
margin: 1rem ;
max-width: 800px;
@media ${MEDIAQUERIES.laptopSmall}{
    margin: auto;
    margin-top: 2rem;
}
`


const QuestionStyle = styled.div`
    border-bottom: 1px solid ${COLORS.LIGHTGREY};
    text-align: left;
    padding: 1rem 0;
                `
const Question = ({ question, answer }: { question: string, answer: string }) => {
    const [open, setOpen] = useState(false)
    return (
        <QuestionStyle>
            <div className='flex w-full justify-between items-center'>
                <p className='text-xl mb-1'>{question}</p>
                <div className='cursor-pointer transition' style={{ color: COLORS.MAINCOLOR }} onClick={() => setOpen(prev => !prev)}>
                    {open ? <BiChevronUp className='text-xl' /> : <BiChevronDown className='text-xl' />}
                </div>
            </div>
            <Collapse on={open}>
                <p className='text-base font-light pt-4'>{answer}</p>
            </Collapse>
        </QuestionStyle>
    )
}
const FAQsection = () => {
    const { t } = useTranslation('common')
    return (
        <Container className='flex flex-col justify-center items-center gap-8'>
            <h3 className='text-4xl font-semibold' >{t("faq")}</h3>
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