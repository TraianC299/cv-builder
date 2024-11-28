import React, { Dispatch, ReactNode, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { nanoid } from 'nanoid'
import { CvObjectType } from 'interfaces/cv.types'
import { initials } from 'data/initals'


export const CVcategories = [
    "skills",
    "languages",
    "employment",
    "education",
    "internships",
    "projects"
]
const initialCvObject: CvObjectType = {
    summary: "",
    hobbies: "",
    skills: [],
    languages: [],
    email: "",
    phone: "",
    country: "",
    name: "",
    surname: "",
    jobTitle: "",
    city: "",
    profileImage: "",
    employment: [],
    education: [],
    internships: [],
    projects: [],
    template: 1,
    language: "en",
    color: ""
}
const CVcontext = React.createContext<{
    cvObject: CvObjectType;
    setCvObject: React.Dispatch<React.SetStateAction<CvObjectType>>,
    progress: number,
    addNew: (key: keyof typeof initials) => void
}>(
    {
        cvObject: initialCvObject,
        setCvObject: () => { },
        progress: 0,
        addNew: () => { }
    }
)
export function useCV() {
    return useContext(CVcontext)
}



export const CVprovider = ({ children }: {
    children: ReactNode
}) => {
    const [cvObject, setCvObject] = useLocalStorage<CvObjectType>("cvobject", {
        ...initialCvObject,
    })

    const calculateProgress = () => {
        let progress = 0
        if (cvObject.name && cvObject.surname && cvObject.jobTitle && cvObject.city && cvObject.country && cvObject.email && cvObject.phone && cvObject.profileImage) {
            progress += 10
        }
        if (cvObject.summary) {
            progress += 10
        }
        if (cvObject.hobbies) {
            progress += 10
        }
        if (cvObject?.skills?.length > 0) {
            progress += 10
        }
        if (cvObject?.languages?.length > 0) {
            progress += 10
        }
        if (cvObject?.employment?.length > 0) {
            progress += 10
        }
        if (cvObject?.education?.length > 0) {
            progress += 10
        }
        if (cvObject?.internships?.length > 0) {
            progress += 10
        }
        if (cvObject?.projects?.length > 0) {
            progress += 10
        }
        return progress

    }

    const progress = calculateProgress()

    const addNew = (key: keyof typeof initials) => {
        const noEdit = cvObject[key].map(el => ({
            ...el,
            edit: false
        }))
        setCvObject((prev) => ({
            ...prev,
            [key]: [
                ...noEdit, { ...initials[key], id: nanoid() }
            ]
        }))
    }






    let value = {
        cvObject,
        setCvObject,
        progress,
        addNew
    }











    return (
        <CVcontext.Provider value={value}>
            {children}
        </CVcontext.Provider>
    )
}