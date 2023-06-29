import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { CvObjectType, EducationType, EmploymentType, ProjectType, SkillType } from '../../contexts/AppContext'
import { useTranslation } from 'next-i18next'
import COLORS from '@/constants/COLORS'
import FontScaleWrapper from '../createcv/FontScaleWrapper'
import {MdStarRate} from 'react-icons/md'


const Container = styled(FontScaleWrapper)`
height: 842px;
width: 595px;
padding: 2rem;
background: ${COLORS.DARKGREEN};
position: relative;
transform-origin:0 0;
color: white;
font-family: 'Noto Serif Display', serif !important;




*{
  white-space: normal;
  word-wrap: break-word;
}



`

const InfoSection = styled.div`
width: 100%;
justify-content: space-between;
display: grid;
grid-template-columns: 167px 396px;
margin-top: 24px;
>div{
  display: flex;
  flex-direction: column;
  row-gap:2px;
}
`





const SecondContainer = styled.div`
div:last-child{
    border: none !important;
}
`


const Template = ({ cvObject, className }: { cvObject: CvObjectType, className?: string }) => {
  const { t } = useTranslation("create-cv")

  return (
      <Container id="cv-preview"
        className={className}
      >

        <ProfileSection
        name={cvObject.name}
        surname={cvObject.surname}
        jobTitle={cvObject.jobTitle}
        summary={cvObject.summary}
        image={cvObject.profileImage}></ProfileSection>
        <InfoSection>
          <div >
            <Section title={t("personal-info")}>
                <div className='flex column gap-2'>
                    <div className='sp' >{t("location")}: {cvObject.city} {cvObject.country}</div>
                    <div className='sp' >{t("phone")}: {cvObject.phone}</div>
                    <div className='sp' >{t("email")}: {cvObject.email}</div>
                </div>
            </Section>
            <Section  title={t("hobbies")}>
              <p className='sp'>{cvObject.hobbies}</p>
            </Section>
            {cvObject.languages && <Section title={t("languages")}>
              <div className='flex column gap-2'>
                {cvObject.languages.map((el: SkillType) => <SkillInstance key={el.id} title={el.title} grade={el.metric}></SkillInstance>)}
              </div>
            </Section>}
            {cvObject.skills && <Section title="Skills">
              <div className='flex column gap-2'>
                {cvObject.skills.map((el: SkillType) => <SkillInstance key={el.id} title={el.title} grade={el.metric}></SkillInstance>)}
              </div>
            </Section>}
          </div>
          <SecondContainer >
          
            {cvObject.employment &&<Section title={t("employment")}>
              {cvObject.employment.map((el: EmploymentType) => <EmploymentItem {...el} key={el.id}></EmploymentItem>)}
            </Section>}
            {cvObject.internships && <Section title={t("internships")}>
              {cvObject.internships && cvObject.internships.map((el: EmploymentType) => <EmploymentItem {...el} key={el.id}></EmploymentItem>)}
            </Section>}
           {cvObject.education && <Section title={t("education")}>
              {cvObject.education.map((el: EducationType) => <EducationItem {...el} key={el.id}></EducationItem>)}
            </Section>}
            {cvObject.projects &&<Section title={t("projects")}>
              {cvObject.projects.map((el: ProjectType) => <ProjectItem {...el} key={el.id}></ProjectItem>)}
            </Section>}
          </SecondContainer>
        </InfoSection>
      </Container>
  )
}

export default Template





const SectionContainer = styled.div`
>p{
    padding-bottom: 0.5rem;
}`

const Section = ({ children, title, style }: {
  children: ReactNode,
  title: string,
  style?: Object
}) => {
  return (
    <SectionContainer className='p-3' style={style}>
      <p className='h5 uppercase pb-4'>{title}</p>
      {children}
    </SectionContainer>
  )
}



const ProfileSectionContainer = styled.div`
width: 100%;
display: grid;
grid-template-columns: 167px 396px;
position: relative;
padding-bottom: 2rem;
>img{
    min-height: 207px;
    object-fit: cover;
    border-radius: 50px;
}
>img, div{
    width: 100%;
}
.aesthetics{
    position: absolute;
    bottom: 0;
    left: 0;
}
.line{
    //star
    width:85%;
    height: 1px;
    background: ${COLORS.YELLOW};
    bottom: 0;
}


`


const ProfileSection = ({ name, surname, jobTitle, summary, image }: {
  name: string,
  surname: string,
  jobTitle: string,
  image: string,
  summary: string
}) => {

  return (
    <ProfileSectionContainer >
      <img className='p3' width={167} src={image || "https://www.buckinghamandcompany.com.au/wp-content/uploads/2016/03/profile-placeholder.png"}></img>
      <div className='flex js column name-position p-3' >
        <p className='h1 font-semibold uppercase text-left' >{name} {surname}</p>
        <p className='sp uppercase' >{jobTitle}</p>
        <p className='sp font-light' >{summary}</p>
      </div>
      <div className='aesthetics flex ac jsb'>
        <MdStarRate size={24} color={COLORS.YELLOW} />
          <div className='line'></div>
          <MdStarRate size={24} color={COLORS.YELLOW} />

      </div>
      
    </ProfileSectionContainer>
  )
}



const SkillInstanceContainer = styled.div`
width:100%;
row-gap: 4px;
>div{
  width:100%;
  background: ${COLORS.WHITE};
  height: 5px;
  overflow: hidden;
  >div{
    height: 5px;
    background: ${COLORS.YELLOW};
  }
}`
const SkillInstance = ({ title, grade }: {
  title: string,
  grade: SkillType["metric"] 
}) => {
  return (
    <SkillInstanceContainer className='flex column rounded-sm'>
      <p className='sp'>{title}</p>
      <div>
        <div style={{ width: `${grade?grade * 20:0}%` }}></div>
      </div>
    </SkillInstanceContainer>
  )
}



const EmploymentItem = ({ title, startDate, endDate, description, employer, city }: EmploymentType) => {
  const { t } =useTranslation("create-cv")

  return (
    <div className='flex jfs afs gap-2'>
    <MdStarRate className='sp w-max' color={COLORS.YELLOW}/>
    <div>
      <p className='ssp'>{startDate} - {endDate}</p>
      <p className='sp font-semibold'>{title} {t("at")} {employer} ({city})</p>
        <p className='ssp font-light'>{description}</p>
    </div>
  </div>)
}



const ProjectItem = ({ title, startDate, endDate, description }: ProjectType) => {

  return (
    <div className='flex jfs afs gap-2'>
    <MdStarRate className='sp' color={COLORS.YELLOW}/>
    <div>
        <p className='ssp'>{startDate} - {endDate}</p>
        <p className='sp font-semibold'>{title}</p>
        <p className='ssp font-light'>{description}</p>
    </div>
  </div>)
}


const EducationItem = ({ school, degree, city, startDate, endDate }: EducationType) => {
  const { t } = useTranslation("create-cv")

  return (
    <div className='flex jfs afs gap-2'>
        <MdStarRate className='sp' color={COLORS.YELLOW}/>
      <div>
        <p className='ssp'>{startDate} - {endDate}</p>
        <p className='sp font-semibold'>{degree} {t("at")} {school} ({city})</p>
      </div>
    </div>
  )
}



