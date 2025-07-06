

export type SkillType = {
    metric: 1 | 2 | 3 | 4 | 5 | null,
    title: string,
    id: string,
    edit: boolean
}


export type LanguageType = {
    metric: 1 | 2 | 3 | 4 | 5 | null,
    title: string,
    id: string,
    edit: boolean
}



export type EmploymentType = {
    title: string,
    employer: string,
    city: string,
    description: string,
    id: string,
    edit: boolean,
    startDate: string,
    endDate: string
}
export type IntershipType = EmploymentType

export type EducationType = {
    school: string,
    degree: string,
    city: string,
    id: string,
    edit: boolean,
    startDate: string,
    endDate: string;
}


export type ProjectType = {
    title: string,
    description: string,
    id: string,
    edit: boolean,
    startDate: string,
    endDate: string,
}


export type CvObjectType = {
    summary: string,
    hobbies: string,
    email: string,
    phone: string,
    country: string,
    name: string,
    surname: string,
    jobTitle: string,
    city: string,
    profileImage: string,
    skills: SkillType[],
    languages: LanguageType[],
    employment: EmploymentType[],
    education: EducationType[],
    internships: IntershipType[],
    projects: ProjectType[]
    template: number,
    language: string,
    color?: string
}

export type CvListKey = "skills" | "languages" | "employment" | "education" | "internships" | "projects"
