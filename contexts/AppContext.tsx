import React, {ReactNode, useContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useRouter } from 'next/router'


export type SkillType = {
    metric: 1 | 2 | 3 | 4 | 5 | null,
    title: string,
    id:string,
    edit?:boolean
}

export type EmploymentType = {
    title: string,
    employer: string,
    city: string, 
    description: string,
    id: string,
    edit:boolean,
    startDate: string,
    endDate: string,
}

export type EducationType = {
    school: string,
    degree: string,
    city: string, 
    id: string,
    edit:boolean,
    startDate: string,
    endDate: string;
}


export type ProjectType = {
    title: string,
    description: string,
    id: string,
    edit:boolean,
    startDate: string,
    endDate: string,
}


export type CvObjectType = {
    summary: string,
    hobbies:string,
    email:string,
    phone: string,
    country:string, 
    name: string, 
    surname: string,
    jobTitle: string,
    city: string,
    profileImage:string,
    skills: [SkillType] | [],
    languages:[SkillType] | [],
    employment: [EmploymentType] | [],
    education: [EducationType] | [],
    internships: [EmploymentType] | [],
    projects: [ProjectType] | []
    template: number,
    language: string
}


export const CVcategories = [
    "skills",
    "languages",
    "employment",
    "education",
    "internships",
    "projects"
]
const initialCvObject:CvObjectType = {
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
    education: [],
    internships:[],
    projects:[],
    template: 1,
    language: "en"
}
const CVcontext = React.createContext<{ cvObject: CvObjectType; setCvObject: React.Dispatch<React.SetStateAction<any>>, progress:number }>(
    {
        cvObject:initialCvObject,
        setCvObject:()=>{},
        progress:0
    }
)
export const useCV=()=>{
        return useContext(CVcontext)
    }



export const CVprovider = ({children}:{
    children:ReactNode
}) => {
    const [cvObject, setCvObject] = useLocalStorage<CvObjectType>("cvobject",{
        ...initialCvObject,
    })


    


    const  calculateProgress = ()=>{
        let progress = 0
        if(cvObject.name && cvObject.surname && cvObject.jobTitle && cvObject.city && cvObject.country && cvObject.email && cvObject.phone && cvObject.profileImage){
            progress+=10
        }
        if(cvObject.summary){
            progress+=10
        }
        if(cvObject.hobbies){
            progress+=10
        }
        if(cvObject?.skills?.length>0){
            progress+=10
        }
        if(cvObject?.languages?.length>0){
            progress+=10
        }
        if(cvObject?.employment?.length>0){
            progress+=10
        }
        if(cvObject?.education?.length>0){
            progress+=10
        }
        if(cvObject?.internships?.length>0){
            progress+=10
        }
        if(cvObject?.projects?.length>0){
            progress+=10
        }
        return progress

    }

    const progress = calculateProgress()

    
    let value={
        cvObject, 
        setCvObject,
        progress
    }


    







    
    return (
        <CVcontext.Provider value={value}>
        {children}
        </CVcontext.Provider>
    )
}