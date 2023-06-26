import { GetServerSideProps } from 'next'
import React from 'react'
import {  CvObjectType } from '../../contexts/AppContext'
import useWindowSize from '../../hooks/useWindowSize'
import styled from 'styled-components'
import TemplateTwo from '../../components/templates/2'
import { TemplateContainerStyleProps } from '../../types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const TemplateTwoScaled = styled(TemplateTwo)<TemplateContainerStyleProps>`
transform: scale(${props=>props.scaleFactor});
transform-origin: 0 0;
`


const Template = ({localStorageCv}: {localStorageCv:CvObjectType}) => {
  const { width} = useWindowSize()




  return (
            <TemplateTwoScaled
            scaleFactor={width ? width/595: 1}
           cvObject={localStorageCv}></TemplateTwoScaled>
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

export const getServerSideProps:GetServerSideProps = async (context) => {
  
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
 const cookies = context.req.cookies;
  const localStorageCv = JSON.parse(cookies.cvobject || JSON.stringify(placeholderObject))

  // Pass data to the page via props
  return { props: { 
    ...(await serverSideTranslations(context.locale || "en", ["create-cv"])),
    localStorageCv: localStorageCv
    }}
}


