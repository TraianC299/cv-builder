import { CvObjectType } from 'interfaces/cv.types'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import styled from 'styled-components'
import TemplateThree from '../../components/cv-templates/3'
import useWindowSize from '../../hooks/useWindowSize'
import { TemplateContainerStyleProps } from '../../types'

const TemplateThreeScaled = styled(TemplateThree) <TemplateContainerStyleProps>`
transform: scale(${props => props.scaleFactor});
transform-origin: 0 0;
`


const Template = ({ localStorageCv }: { localStorageCv: CvObjectType }) => {
  const { width } = useWindowSize()

  return (
    <TemplateThreeScaled
      scaleFactor={width ? width / 595 : 1}
      cvObject={localStorageCv}></TemplateThreeScaled>
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
export const getServerSideProps: GetServerSideProps = async (context) => {

  const placeholderObject = {
    summary: "",
    hobbies: "",
    skills: [],
    languages: [],
    email: "",
    phone: "",
    country: "",
    name: "",
    surname: "",
    jobTitle: "",
    city: "",
    profileImage: "",
    employment: [],
    education: []
  }
  const cookies = context.req.cookies;
  const localStorageCv = JSON.parse(cookies.cvobject || JSON.stringify(placeholderObject))

  // Pass data to the page via props
  return {
    props: {
      localStorageCv: localStorageCv,
      ...(await serverSideTranslations(context.locale || "en", ["create-cv", "common"])),
    }
  }
}


