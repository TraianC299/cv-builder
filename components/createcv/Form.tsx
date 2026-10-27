import type { CvListKey } from "@/interfaces/cv.types";
import useCV from "@/store/cvStore";
import type { ReactNode } from "react";
import EducationSection from "../createcv/sections/EducationSection";
import EmploymentSection from "../createcv/sections/EmploymentSection";
import InfoSection from "../createcv/sections/InfoSection";
import InternshipsSection from "../createcv/sections/InternshipsSection";
import LanguagesSection from "../createcv/sections/LanguagesSection";
import SkillsSection from "../createcv/sections/SkillsSection";
import AddMoreSection from "./sections/AddMoreSection";
import CertificationsSection from "./sections/CertificationsSection";
import GeneralSection from "./sections/GeneralSection";
import HobbiesSection from "./sections/HobbiesSection";
import ProjectsSection from "./sections/ProjectsSection";
import SummarySection from "./sections/SummarySection";


const sections: Record<CvListKey, ReactNode> = {
  skills: <SkillsSection key={'skills'} />,
  languages: <LanguagesSection key={'languages'} />,
  employment: <EmploymentSection key={'employment'} />,
  education: <EducationSection key={'education'} />,
  internships: <InternshipsSection key={'internships'} />,
  projects: <ProjectsSection key={'projects'} />,
  certifications: <CertificationsSection key={'certifications'} />,
} as const
const Form = () => {
  const { sectionOrder } = useCV();

  return (
    <form className="h-full overflow-scroll overflow-x-hidden bg-white flex flex-col">
      <GeneralSection />
      <InfoSection />
      <SummarySection />
      <HobbiesSection />
      {sectionOrder.map(el => sections[el])}
      <AddMoreSection />
    </form>
  );
};

export default Form;
