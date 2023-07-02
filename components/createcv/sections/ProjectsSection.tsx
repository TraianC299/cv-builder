import React from 'react'
import Section from '../Section'
import { ReactSortable } from 'react-sortablejs'
import { CvObjectType, useCV } from '../../../contexts/AppContext'
import { nanoid } from 'nanoid'
import { useTranslation } from 'next-i18next'
import ProjectInput from '../inputs/ProjectInput'

const ProjectsSection = () => {
  const {cvObject, setCvObject}:{cvObject:CvObjectType, setCvObject:React.Dispatch<React.SetStateAction<any>>} = useCV()
  const {t}= useTranslation(["create-cv", "common"])
  const addNewProject = ()=>{
     const noEditProjects = cvObject.projects.map(el=>({
        title: el.title,
        description: el.description,
        id: el.id,
        edit:false
      }))
      setCvObject((prev:CvObjectType)=>({
        ...prev,
        projects:[
          ...noEditProjects, {
            id:nanoid(),
            title: "",
        description: "",
        edit:true}
        ]
      }))
    }


    const deletePtoject = (id:string) => {
        setCvObject((prev:CvObjectType)=>({
          ...prev,
          projects:prev.projects.filter(el=>el.id!==id)
        }))
      }


  return (
    <Section 
    deletable
    objectKey="projects"
    title={t("projects")} onClick={addNewProject}>
      
        <ReactSortable
        className='flex column gap-2'
        list={cvObject.projects}
        setList={(v)=>{setCvObject((prev:CvObjectType)=>({...prev, projects:v}))}}
        handle=".handle"
        >
          {cvObject.projects && cvObject.projects.map(el=><ProjectsSection.Input 
          {...el}
          edit={el.edit || false}
          onDelete={()=>deletePtoject(el.id)}
          key={el.id} ></ProjectsSection.Input>)}
        </ReactSortable>
      

      </Section>
  )
}

export default ProjectsSection




ProjectsSection.Input = ProjectInput