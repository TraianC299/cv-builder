import { GetServerSideProps } from 'next'
import React from 'react'
import {  CvObjectType } from '../../contexts/AppContext'
import useWindowSize from '../../hooks/useWindowSize'
import TemplateZero from '../../components/templates/0'
import styled from 'styled-components'
import { TemplateContainerStyleProps } from '../../types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'




const TemplateZeroScaled = styled(TemplateZero)<TemplateContainerStyleProps>`
transform: scale(${props=>props.scaleFactor});
transform-origin: 0 0;
`

const Template = ({localStorageCv}: {localStorageCv:CvObjectType}) => {
  const { width} = useWindowSize()




  return (
<div  className='' >
            <TemplateZeroScaled
            scaleFactor={width ? width/595 : 1}
          
           cvObject={localStorageCv}></TemplateZeroScaled>
        </div>
  )
}

export default Template


Template.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <>
      {page}
    </>
  )
}


export const getServerSideProps:GetServerSideProps = async ({
  locale,
  req
}) => {
  
  const placeholderObject = {
    summary:"",
    hobbies:"",
    skills: [],
    languages:[],
    email:"",
    phone: "",
    country:"", 
    name: "", 
    surname: "",
    jobTitle: "",
    city:"",
    profileImage:"",
    employment: [],
    education: []
  }
 const cookies = req.cookies;
  const localStorageCv = JSON.parse(cookies.cvobject || JSON.stringify(placeholderObject))
  const translations = await serverSideTranslations(locale as string || "ro", ["create-cv"])
  console.log(translations)
  // Pass data to the page via props
  return { props: { 
    localStorageCv: localStorageCv,
    ...translations
  }}
}


