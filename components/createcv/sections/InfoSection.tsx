import { useTranslation } from 'next-i18next'
import React from 'react'
import { useCV } from '../../../contexts/AppContext'
import ButtonInputImage from '../../ui/input/ButtonImageInput'
import Input from '../../ui/input/Input'
import Section from '../Section'
import { CvObjectType } from '../../../interfaces/cv.types'

const InfoSection = () => {
  const { cvObject, setCvObject }: { cvObject: CvObjectType, setCvObject: React.Dispatch<React.SetStateAction<any>> } = useCV()
  const { t } = useTranslation(["create-cv", "common"])

  return (
    <Section title={t("personal-info")}>
      <div className='flex flex-col gap-2' >
        <div className='flex justify-center items-center gap-4' >
          <Input
            value={cvObject.jobTitle}
            setValue={(v) => { setCvObject((prev: CvObjectType) => ({ ...prev, jobTitle: v })) }}
            placeholder='eg. Teacher'
            label={t("job-title")}
          ></Input>
          <ButtonInputImage image={cvObject.profileImage} setImage={(v: string | null) => { setCvObject((prev: CvObjectType) => ({ ...prev, profileImage: v })) }}
            label={t("your-photo")}></ButtonInputImage>
        </div>
        <div className='flex justify-center items-center gap-4' >
          <Input
            value={cvObject.name}
            setValue={(v) => { setCvObject((prev: CvObjectType) => ({ ...prev, name: v })) }}
            label={t("last-name")}
            placeholder='eg. John'
          ></Input>
          <Input
            value={cvObject.surname}
            setValue={(v) => { setCvObject((prev: CvObjectType) => ({ ...prev, surname: v })) }}
            label={t("first-name")}
            placeholder='eg. Doe'
          ></Input>
        </div>
        <div className='flex justify-center items-center gap-4' >
          <Input
            value={cvObject.email}
            setValue={(v) => { setCvObject((prev: CvObjectType) => ({ ...prev, email: v })) }}
            label={t("email")}
            placeholder='eg. johndoe@gmail.com'
          ></Input>
          <Input
            value={cvObject.phone}
            setValue={(v) => { setCvObject((prev: CvObjectType) => ({ ...prev, phone: v })) }}
            label={t("phone")}
            placeholder='eg. +48 123 456 789'
          ></Input>
        </div>
        <div className='flex justify-center items-center gap-4' >
          <Input
            value={cvObject.country}
            setValue={(v) => { setCvObject((prev: CvObjectType) => ({ ...prev, country: v })) }}
            label={t("country")}
            placeholder='eg. Poland'
          ></Input>
          <Input
            value={cvObject.city}
            setValue={(v) => { setCvObject((prev: CvObjectType) => ({ ...prev, city: v })) }}
            label={t("city")}
            placeholder='eg. Warsaw'
          ></Input>
        </div>
      </div>
    </Section>
  )
}

export default InfoSection