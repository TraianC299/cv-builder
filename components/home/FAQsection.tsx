import React, { useState } from 'react'
import styled from 'styled-components'
import Collapse from '../general/utilities/Collapse'


const Container = styled.div`
padding: 5rem 0;`
const QuestionStyle = styled.div`
    border-bottom: 1px solid #e5e5e5;
    text-align: left;
    padding: 1rem 0;

      
                `
const Question = ({question, answer}:{question:string, answer:string}) => {
    const [open, setOpen] = useState(false)
    return (
        <QuestionStyle><div className='flex w-full jsb'><p className='h6'>{question}</p> <div className='pointer transition' style={{transform: `rotate(${open?180:0}deg)`}} onClick={()=>setOpen(prev=>!prev)}>👇</div></div>
        <Collapse on={open}>
            <p style={{paddingTop:"1rem"}} className='p'>{answer}</p>
        </Collapse>
        </QuestionStyle>
    )
}
const FAQsection = () => {
  return (
    <Container className='w-full flex column jc ac gap2 sectionPadding' style={{maxWidth:"800px", margin:"auto"}}>
        <h3 className='h4' >Frequently Asked Questions</h3>
        <div >
            <Question question={"Is this CV building website free to use?"} answer={"Yes, this website is completely free to use. There are no fees or subscriptions required to create and download your CV."}></Question>
            <Question question={"Can I customize the layout and design of my CV?"} answer={"While this website offers a range of well-designed templates to choose from, it does not allow for customization of the design beyond selecting a template. However, you can still personalize your CV by adding your own content and information."}></Question>
            <Question question={"Can I download my CV as a PDF or other file format?"} answer={"Yes, this website allows you to download your CV as a PDF, making it easy to share with potential employers or print it out for job interviews. You may also have the option to download your CV in other file formats, such as a Word document or text file."}></Question>
            <Question question="Do I need to create an account to use the website?" answer={"No, you do not need to create an account to use this website. You can use it as a guest without creating an account."}></Question>
            <Question question="Can I save my progress and come back to it later?" answer={"Yes, this website allows you to save your progress and come back to it later. This can be especially useful if you are creating a lengthy or complex CV and need to take breaks or work on it over a period of time."}></Question>
        </div>
    </Container>
  )
}

export default FAQsection