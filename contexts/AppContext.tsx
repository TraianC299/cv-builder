import React, {ReactNode, useContext, useState} from 'react'


export type SkillType = {
    metric: number,
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
    endDate: string
}

export type EducationType = {
    school: string,
    degree: string,
    city: string, 
    description: string,
    id: string,
    edit:boolean,
    startDate: string,
    endDate: string
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
    education: [EducationType] | []

}

const CVcontext = React.createContext<CvObjectType>(
    {
        summary:"",
    hobbies:"",
    skills: [],
    languages:[],
    employment:[],
    education:[],
    email:"",
    phone: "",
    country:"", 
    name: "", 
    surname: "",
    jobTitle: "",
    city:"",
    profileImage:""
    
    }
)
export const useCVcontext=()=>{
        return useContext(CVcontext)
    }



export const CVprovider = ({children}:{
    children:ReactNode
}) => {
    const [cvObject, setCvObject] = useState<CvObjectType>({
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
    })
    


    
    
    let value={
        cvObject, setCvObject
    }


    




    
    return (
        <CVcontext.Provider value={value}>
        {children}
        </CVcontext.Provider>
    )
}