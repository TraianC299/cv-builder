import { GetServerSideProps } from 'next'
import React from 'react'
import {  CvObjectType } from '../../contexts/AppContext'
import useWindowSize from '../../hooks/useWindowSize'
import styled from 'styled-components'
import TemplateTwo from '../../components/createcv/cvTemplates/2'
import { TemplateContainerStyleProps } from '../../types'

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
  return { props: { localStorageCv: localStorageCv  }}
}