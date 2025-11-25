import { SkillType } from "@/interfaces/cv.types";
import { nanoid } from "nanoid";

const skill: SkillType = {
    id: nanoid(),
    title: "",
    metric: null,
    edit: true
}

const project = {
    id: nanoid(),
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    edit: true
}

const employment = {
    id: nanoid(),
    title: "",
    employer: "",
    city: "",
    description: "",
    edit: true,
    startDate: "",
    endDate: ""
}

const language = {
    id: nanoid(),
    title: "",
    metric: null,
    edit: true
}

const internship = {
    id: nanoid(),
    title: "",
    employer: "",
    city: "",
    description: "",
    edit: true,
    startDate: "",
    endDate: ""
}

const education = {
    id: nanoid(),
    school: "",
    degree: "",
    city: "",
    edit: true,
    startDate: "",
    endDate: ""
}
export const initials = {
    "skills": skill,
    "languages": language,
    "employment": employment,
    "education": education,
    "internships": internship,
    "projects": project,
}