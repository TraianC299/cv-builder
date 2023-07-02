import React, {Dispatch, ReactNode, useContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'


const example = {
    summary: "Experienced Software Developer adept in bringing forth expertise in design, installation, testing and maintenance of software systems. I am mainly focused on front end development but I am also skilled at back end too.",
    hobbies: "Reading, Philosophy, Arts, UX and UI, Design",
    skills: [
        {
            metric: 5,
            title: "React",
            id: "1",
            edit: false

        },
        {
            metric: 5,
            title: "Javascript",
            id: "2",
            edit: false

        },
        {
            metric: 5,
            title: "Typescript",
            id: "3",
            edit: false

        },
        {
            metric: 5,
            title: "Next.js",
            id: "4",
            edit: false

        }
    ],
    languages: [
        {
            metric: 5,
            title: "English",
            id: "1",
            edit: false
        },
        {
            metric: 5,
            title: "Turkish",
            id: "2",
            edit: false
        },
        {
            metric: 5,
            title: "German",
            id: "3",
            edit: false
        }
    ],
    email: "traianciochina@gmail.com",
    phone: "+40721234567",
    country: "Romania",
    name: "Traian",
    surname: "Ciochina",
    jobTitle: "Software Developer",
    city: "Bucharest",
    profileImage: "https://avatars.githubusercontent.com/u/47276603?v=4",
    employment: [{
        title: "Software Developer",
        employer: "Freelance",
        city: "Bucharest",
        description: "I am a freelance software developer. I have worked on many projects, from small to big. I have worked with many technologies, from React to Angular, from Node.js to PHP. I have worked with many clients, from small to big. I have worked with many technologies, from React to Angular, from Node.js to PHP.",
        id: "1",
        edit: false,
        startDate: "2020-01-01",
        endDate: "2020-01-01",
    }],
    education: [{
        school: "University of Bucharest",
        degree: "Bachelor's Degree",
        city: "Bucharest",
        id: "1",
        edit: false,
        startDate: "2020-01-01",
        endDate: "2020-01-01",
    }],
    internships: [],
    projects: [{
        title: "CV Builder",
        description: "A CV builder made with React and Next.js",
        id: "1",
        edit: false,
        startDate: "2020-01-01",
        endDate: "2020-01-01"
    },{
        title: "CV Builder",
        description: "A CV builder made with React and Next.js",
        id: "2",
        edit: false,
        startDate: "2020-01-01",
        endDate: "2020-01-01"
    }],
    template: 1,
    language: "en"
}
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
    language: string,
    color?: string
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
    language: "en",
    color: ""
}
const CVcontext = React.createContext<{ cvObject: CvObjectType; setCvObject: React.Dispatch<React.SetStateAction<any>>, progress:number }>(
    {
        cvObject:initialCvObject,
        setCvObject:()=>{},
        progress:0
    }
)
export const useCV=():{ cvObject: CvObjectType; setCvObject: Dispatch<CvObjectType>; progress: number; }=>{
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