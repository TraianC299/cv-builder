import React from 'react'
import Section from '../Section'
import { ReactSortable } from 'react-sortablejs'
import { useCV } from '../../../contexts/AppContext'
import { useTranslation } from 'next-i18next'
import ProjectInput from '../inputs/ProjectInput'

const ProjectsSection = () => {
  const { cvObject, setCvObject, addNew } = useCV()
  const { t } = useTranslation(["create-cv", "common"])



  const deletePtoject = (id: string) => {
    setCvObject((prev) => ({
      ...prev,
      projects: prev.projects.filter(el => el.id !== id)
    }))
  }


  return (
    <Section
      deletable
      objectKey="projects"
      title={t("projects")} onClick={() => addNew('projects')}>

      <ReactSortable
        className='flex column gap-2'
        list={cvObject.projects}
        setList={(v) => { setCvObject((prev) => ({ ...prev, projects: v })) }}
        handle=".handle"
      >
        {cvObject.projects && cvObject.projects.map(el => <ProjectsSection.Input
          {...el}
          edit={el.edit || false}
          onDelete={() => deletePtoject(el.id)}
          key={el.id} ></ProjectsSection.Input>)}
      </ReactSortable>


    </Section>
  )
}

export default ProjectsSection




ProjectsSection.Input = ProjectInput