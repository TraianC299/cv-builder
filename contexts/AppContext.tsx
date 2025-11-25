import { nanoid } from 'nanoid'
import React, { ReactNode, useContext } from 'react'
import { initials } from '../data/initals'
import useLocalStorage from '../hooks/useLocalStorage'
import { CvObjectType } from '../interfaces/cv.types'


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
    changeCvObject: (key: string, value: string, id: string, category: 'employment' | 'education' | 'internships' | 'projects' | 'skills' | 'languages') => void,
    addNew: (key: keyof typeof initials) => void
}>(
    {
        cvObject: initialCvObject,
        setCvObject: () => { },
        progress: 0,
        addNew: () => { },
        changeCvObject: () => { }
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

    function changeCvObject(key: string, value: string, id: string, category: 'employment' | 'education' | 'internships' | 'projects' | 'skills' | 'languages') {
        const items = cvObject[category] as { id: string;[k: string]: any }[]
        const index = items.findIndex(el => el.id === id)
        const itemsPlaceholder = [...items]
        itemsPlaceholder[index] = {
            ...itemsPlaceholder[index],
            [key]: value
        }
        setCvObject((prev) => ({
            ...prev, [category]: itemsPlaceholder
        }))
    }

    const calculateProgress = () => {
        let progress = 0
        if (cvObject.name && cvObject.surname && cvObject.jobTitle && cvObject.city && cvObject.country) {
            progress += 10
        }
        if (cvObject.email && cvObject.phone && cvObject.profileImage) {
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
        addNew,
        changeCvObject
    }











    return (
        <CVcontext.Provider value={value}>
            {children}
        </CVcontext.Provider>
    )
}