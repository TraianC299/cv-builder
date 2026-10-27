export type SkillType = {
  metric: 1 | 2 | 3 | 4 | 5 | null;
  title: string;
  id: string;
  edit: boolean;
};

export type CVLanguageType = {
  metric: 1 | 2 | 3 | 4 | 5 | null;
  title: string;
  id: string;
  edit: boolean;
};

export type EmploymentType = {
  title: string;
  employer: string;
  city: string;
  description: string;
  id: string;
  edit: boolean;
  startDate: string;
  endDate: string;
};
export type IntershipType = EmploymentType;

export type EducationType = {
  school: string;
  degree: string;
  city: string;
  id: string;
  edit: boolean;
  startDate: string;
  endDate: string;
};

export type CertificationType = {
  id: string;
  title: string;
  issuer: string;
  description?: string;
  issueDate: string;
  expirationDate?: string;
  edit: boolean;
};

export type ProjectType = {
  title: string;
  description: string;
  id: string;
  edit: boolean;
  startDate: string;
  endDate: string;
};

export type CvObjectType = {
  summary: string;
  hobbies: string;
  email: string;
  dateOfBirth: string,
  phone: string;
  country: string;
  name: string;
  surname: string;
  jobTitle: string;
  city: string;
  profileImage: string;
  skills: SkillType[];
  languages: CVLanguageType[];
  employment: EmploymentType[];
  education: EducationType[];
  internships: IntershipType[];
  projects: ProjectType[];
  certifications?: CertificationType[]
  template: number;
  language: string;
  color?: string;
};

export type CvListKey =
  | "skills"
  | "languages"
  | "employment"
  | "education"
  | "internships"
  | "projects"
  | "certifications"
