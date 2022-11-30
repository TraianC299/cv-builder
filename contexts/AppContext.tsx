import React, {ReactNode, useContext, useState} from 'react'


export type SkillType = {
    metric: number,
    title: string,
    id:string,
    edit?:boolean
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
    languages:[SkillType] | []
}

const CVcontext = React.createContext<CvObjectType>(
    {
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
    profileImage:""
    
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