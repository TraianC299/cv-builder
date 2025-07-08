import COLORS from '@/constants/COLORS'
import { CvObjectType, EducationType, EmploymentType, ProjectType, SkillType } from 'interfaces/cv.types'
import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'
import { GiFlowerStar } from 'react-icons/gi'
import { IoSparklesSharp } from 'react-icons/io5'
import styled from 'styled-components'
import FontScaleWrapper from '../createcv/FontScaleWrapper'

const Container = styled.div`
padding: 2rem;
background: ${props => props.theme.color || COLORS.DARKGREEN};
position: relative;
color: white;
font-family: 'Noto Serif Display', serif !important;
height: 100%;

`

const InfoSection = styled.div`
width: 100%;
justify-content: space-between;
display: grid;
grid-template-columns: 167px 364px;
margin-top: 24px;
>div{
  display: flex;
  flex-direction: column;
  width: 100%;
}
`


const SecondContainer = styled.div`
div:last-child{
    border: none !important;
}
`

const SkillsContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
column-gap: 2rem;
row-gap: 1rem;
`


const Template = ({ cvObject, className }: { cvObject: CvObjectType, className?: string }) => {
  const { t } = useTranslation("create-cv")

  return (
    <FontScaleWrapper color={cvObject.color}>
      <Container
        id="cv-preview"
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
              <div className='flex flex-col gap-2'>
                <div className='sp' >{t("location")}: {cvObject.city} {cvObject.country}</div>
                <div className='sp' >{t("phone")}: {cvObject.phone}</div>
                <div className='sp' >{t("email")}: {cvObject.email}</div>
              </div>
            </Section>
            <Section title={t("hobbies")}>
              <p className='sp'>{cvObject.hobbies}</p>
            </Section>
            {cvObject.languages?.length > 0 && <Section title={t("languages")}>
              <div className='flex flex-col gap-2'>
                {cvObject.languages.map((el: SkillType) => <SkillInstance key={el.id} title={el.title} grade={el.metric}></SkillInstance>)}
              </div>
            </Section>}

          </div>
          <SecondContainer >

            {cvObject.employment?.length > 0 && <Section title={t("employment")}>
              {cvObject.employment.map((el: EmploymentType) => <EmploymentItem {...el} key={el.id}></EmploymentItem>)}
            </Section>}
            {cvObject.internships?.length > 0 && <Section title={t("internships")}>
              {cvObject.internships && cvObject.internships.map((el: EmploymentType) => <EmploymentItem {...el} key={el.id}></EmploymentItem>)}
            </Section>}
            {cvObject.education?.length > 0 && <Section title={t("education")}>
              {cvObject.education.map((el: EducationType) => <EducationItem {...el} key={el.id}></EducationItem>)}
            </Section>}
            {cvObject.projects && <Section title={t("projects")}>
              {cvObject.projects.map((el: ProjectType) => <ProjectItem {...el} key={el.id}></ProjectItem>)}
            </Section>}
            {cvObject.skills?.length > 0 && <Section title={t("skills")}>
              <SkillsContainer >
                {cvObject.skills.map((el: SkillType) => <SkillInstance key={el.id} title={el.title} grade={el.metric}></SkillInstance>)}
              </SkillsContainer>
            </Section>}
          </SecondContainer>
        </InfoSection>
      </Container>
    </FontScaleWrapper>
  )
}

export default Template





const SectionContainer = styled.div`
background: ${props => {
    return props.theme.color
  }};
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
grid-template-columns: 167px 364px;
position: relative;
padding-bottom: 2rem;


.image-container{
  height: 207px;
  width: 167px;
  border-radius: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  >img{
    height: 100%;
    width: fit-content;
  }
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
      <div className='image-container'><img src={image || "/user-image.png"}></img></div>
      <div className='flex justify-center items-start flex-col name-position p-3 gap-2' >
        <p className='h1 font-semibold uppercase text-left' >{name} {surname}</p>
        <p style={{ color: COLORS.YELLOW }} className='sp uppercase' >{jobTitle}</p>
        <p className='sp font-light preline'>{summary}</p>
      </div>
      <div className='aesthetics flex items-center justify-between '>
        <IoSparklesSharp size={24} color={COLORS.YELLOW} />
        <div className='line'></div>
        <IoSparklesSharp size={24} color={COLORS.YELLOW} />
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
  border-radius: 5px;
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
    <SkillInstanceContainer className='flex flex-col rounded-sm'>
      <p className='sp'>{title}</p>
      <div>
        <div style={{ width: `${grade ? grade * 20 : 0}%` }}></div>
      </div>
    </SkillInstanceContainer>
  )
}



const EmploymentItem = ({ title, startDate, endDate, description, employer, city }: EmploymentType) => {
  const { t } = useTranslation("create-cv")

  return (
    <div className='flex jfs  items-start gap-2'>
      <GiFlowerStar className='sp w-max' color={COLORS.YELLOW} />
      <div>
        <p className='ssp'>{startDate} - {endDate}</p>
        <p className='sp font-semibold'>{title} {t("at")} {employer} ({city})</p>
        <p className='ssp font-light'>{description}</p>
      </div>
    </div>)
}



const ProjectItem = ({ title, startDate, endDate, description }: ProjectType) => {

  return (
    <div className='flex jfs  items-start gap-2'>
      <GiFlowerStar className='sp' color={COLORS.YELLOW} />
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
    <div className='flex jfs  items-start gap-2'>
      <GiFlowerStar className='sp' color={COLORS.YELLOW} />
      <div>
        <p className='ssp'>{startDate} - {endDate}</p>
        <p className='sp font-semibold'>{degree} {t("at")} {school} ({city})</p>
      </div>
    </div>
  )
}



