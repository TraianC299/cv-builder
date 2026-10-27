import type { CertificationType, SkillType } from "@/interfaces/cv.types";
import { nanoid } from "nanoid";

const SKILL: SkillType = {
  id: nanoid(),
  title: "",
  metric: null,
  edit: true,
};

const PROJECT = {
  id: nanoid(),
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  edit: true,
};

const EMPLOYMENT = {
  id: nanoid(),
  title: "",
  employer: "",
  city: "",
  description: "",
  edit: true,
  startDate: "",
  endDate: "",
};
const CERTIFICATION: CertificationType = {
  id: nanoid(),
  title: "",
  issuer: "",
  description: "",
  edit: true,
  expirationDate: "",
  issueDate: ""
};

const LANGUAGE = {
  id: nanoid(),
  title: "",
  metric: null,
  edit: true,
};

const INTERNSHIP = {
  id: nanoid(),
  title: "",
  employer: "",
  city: "",
  description: "",
  edit: true,
  startDate: "",
  endDate: "",
};

const EDUCATION = {
  id: nanoid(),
  school: "",
  degree: "",
  city: "",
  edit: true,
  startDate: "",
  endDate: "",
};
export const INITIAL_CV_VALS = {
  skills: SKILL,
  languages: LANGUAGE,
  employment: EMPLOYMENT,
  education: EDUCATION,
  internships: INTERNSHIP,
  projects: PROJECT,
  certifications: CERTIFICATION,
};
