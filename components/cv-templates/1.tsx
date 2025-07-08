import COLORS from '@/constants/COLORS'
import { CvObjectType, EducationType, EmploymentType, ProjectType, SkillType } from 'interfaces/cv.types'
import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'
import styled from 'styled-components'
import FontScaleWrapper from '../createcv/FontScaleWrapper'




const Container = styled(FontScaleWrapper)`
display: grid;
grid-template-columns: 225px 340px;
background: white;
position: relative;
>div{
  display: flex;
  flex-direction: column;
  row-gap:16px;
  padding: 1.5rem;
}




`


const SkillsContainer = styled.div`
display: flex;
flex-direction: column;
row-gap: 8px;`


const ColoredSection = styled.div`
background: ${props => props.theme.color || COLORS.DARKBLUE};
*{
  color: white;
}
`

const Container2 = styled.div`
width: 100%;
max-width: 100%;
display: flex;
flex-direction: column;

`
const TemplateOne = ({ cvObject, className }: { cvObject: CvObjectType, className?: string }) => {

  const { t } = useTranslation("create-cv")
  return (
    <Container id="cv-preview"
      className={className}
      color={cvObject.color}
    // style={{transform: `scale(${height ? height/842 - 0.1 : 1})`}}
    ><ColoredSection>
        <ProfileSection name={cvObject.name} surname={cvObject.surname} jobTitle={cvObject.jobTitle} image={cvObject.profileImage}></ProfileSection>

        <Section title={t("personal-info")}>
          <p className='sp'>{t("location")}: {cvObject.city}, {cvObject.country}</p>
          <p className='sp'>{t("phone")}: {cvObject.phone}</p>
          <p className='sp'>{t("email")}: {cvObject.email}</p>
        </Section>
        <Section title={t("hobbies")}>
          <p className='sp'>{cvObject.hobbies}</p>
        </Section>
        {cvObject.skills?.length > 0 && <Section title={t("skills")}>
          <SkillsContainer>
            {cvObject.skills.map((el: SkillType) => <SkillInstance key={el.id} title={el.title} grade={el.metric}></SkillInstance>)}
          </SkillsContainer>
        </Section>}
        {cvObject.languages?.length > 0 && <Section title={t("languages")}>
          <SkillsContainer>
            {cvObject.languages.map((el: SkillType) => <SkillInstance key={el.id} title={el.title} grade={el.metric}></SkillInstance>)}
          </SkillsContainer>
        </Section>}


      </ColoredSection>
      <Container2>
        <Section title={t("professional-summary")}>
          <p className='sp preline'>{cvObject.summary}</p>
        </Section>
        {cvObject.employment?.length > 0 && <Section title={t("employment")}>
          {cvObject.employment.map((el: EmploymentType) => <EmploymentItem {...el} key={el.id}></EmploymentItem>)}
        </Section>}
        {cvObject.internships?.length > 0 && <Section title={t("internships")}>
          {cvObject.internships.map((el: EmploymentType) => <EmploymentItem {...el} key={el.id}></EmploymentItem>)}
        </Section>}
        {cvObject.education?.length > 0 && <Section title={t("education")}>
          {cvObject.education.map((el: EducationType) => <EducationItem {...el} key={el.id}></EducationItem>)}
        </Section>}
        {cvObject.projects && <Section title={t("projects")}>
          {cvObject.projects.map((el: ProjectType) => <ProjectItem {...el} key={el.id}></ProjectItem>)}
        </Section>}

      </Container2>

    </Container>
  )
}

export default TemplateOne





const Section = ({ children, title }: {
  children: ReactNode,
  title: string
}) => {

  return (
    <div>
      <p className='p font-semibold'>{title}</p>
      {children}
    </div>
  )
}



const ProfileSectionContainer = styled.div`
column-gap: 0.5rem;
margin-bottom: 8px;
margin-top:8px;
z-index:999;
.image-container{
    height: 80px;
  width: 80px;
  border-radius: 50%;
  overflow: hidden;
    margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  >img{
    height: 100%;
    width: fit-content;
  }
}
p{
    text-align:center;
}
`
const ProfileSection = ({ name, surname, jobTitle, image }: {
  name: string,
  surname: string,
  jobTitle: string,
  image: string
}) => {

  return (
    <ProfileSectionContainer className='flex flex-col items-center justify-center'>
      <div className='image-container'><img src={image || "/user-image.png"}></img></div>
      <div className='flex justify-start flex-col'>
        <p className='h6 font-semibold' >{name} {surname}</p>
        <p className='text-sm' >{jobTitle}</p>
      </div>
    </ProfileSectionContainer>
  )
}



const SkillInstanceContainer = styled.div`
width:100%;
row-gap: 4px;
>div{
  width:100%;
  background: ${COLORS.WHITE}50;
  height: 5px;
  border-radius: 444px;
  overflow: hidden;
  >div{
    height: 5px;
    background: ${COLORS.WHITE};
  }
}`
const SkillInstance = ({ title, grade }: {
  title: string,
  grade: SkillType["metric"]
}) => {

  return (
    <SkillInstanceContainer className='flex column'>
      <p className='sp'>{title}</p>
      <div>
        <div style={{ width: `${grade ? grade * 20 : 0}%` }}></div>
      </div>
    </SkillInstanceContainer>
  )
}





const EmploymentItem = ({ title, startDate, endDate, description, employer, city }: EmploymentType) => {
  const { t } = useTranslation("create-cv")

  return (<div>
    <div>
      <p className='sp font-semibold'>{title} {t("at")} {employer} ({city})</p>
      <p className='caption'>{startDate} - {endDate}</p>
    </div>
    <p className='sp'>{description}</p>

  </div>)
}


const ProjectItem = ({ title, startDate, endDate, description }: ProjectType) => {

  return (<div>
    <div>
      <p className='sp font-semibold'>{title}</p>
      <p className='caption'>{startDate} - {endDate}</p>
    </div>
    <p className='sp'>{description}</p>

  </div>)
}


const EducationItem = ({ school, degree, city, startDate, endDate }: EducationType) => {
  const { t } = useTranslation("create-cv")

  return (
    <div>
      <div>
        <p className='sp font-semibold'>{degree} {t("at")} {school} ({city})</p>
        <p className='caption'>{startDate} - {endDate}</p>
      </div>

    </div>
  )
}



