import COLORS from "@/constants/COLORS";
import type {
  EducationType,
  EmploymentType,
  ProjectType,
  SkillType
} from "@/interfaces/cv.types";
import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import type { ReactNode } from "react";
import { GiFlowerStar } from "react-icons/gi";
import { IoSparklesSharp } from "react-icons/io5";
import FontScaleWrapper from "../createcv/FontScaleWrapper/FontScaleWrapper";



const Template = () => {
  const { t } = useTranslation("create-cv");
  const { cvObject } = useCV()

  return (
    <FontScaleWrapper
      color={cvObject.color}
      style={{ background: cvObject.color || COLORS.DARKGREEN }}
      className={"p-8 text-white h-full"}>
      <ProfileSection
        name={cvObject.name}
        surname={cvObject.surname}
        jobTitle={cvObject.jobTitle}
        summary={cvObject.summary}
        image={cvObject.profileImage}
      ></ProfileSection>
      <div className="grid grid-cols-[167px_364px] w-full relative pb-8">
        <div>
          <Section title={t("personal-info")}>
            <ul>
              <li className="sp">
                {t("location")}: {cvObject.city} {cvObject.country}
              </li>
              <li className="sp">
                {t("phone")}: {cvObject.phone}
              </li>
              <li className="sp">
                {t("email")}: {cvObject.email}
              </li>
              <li className="sp">
                {t("date-of-birth")}: {cvObject.dateOfBirth}
              </li>
            </ul>
          </Section>
          {cvObject.hobbies && <Section title={t("hobbies")}>
            <p className="sp">{cvObject.hobbies}</p>
          </Section>}
          {cvObject.languages?.length > 0 && (
            <Section title={t("languages")}>
              <div className="flex flex-col gap-2">
                {cvObject.languages.map((el: SkillType) => (
                  <SkillInstance
                    key={el.id}
                    title={el.title}
                    grade={el.metric}
                  ></SkillInstance>
                ))}
              </div>
            </Section>
          )}
        </div>
        <div>
          {cvObject.employment?.length > 0 && (
            <Section title={t("employment")}>
              {cvObject.employment.map((el: EmploymentType) => (
                <EmploymentItem {...el} key={el.id}></EmploymentItem>
              ))}
            </Section>
          )}
          {cvObject.internships?.length > 0 && (
            <Section title={t("internships")}>
              {cvObject.internships &&
                cvObject.internships.map((el: EmploymentType) => (
                  <EmploymentItem {...el} key={el.id}></EmploymentItem>
                ))}
            </Section>
          )}
          {cvObject.education?.length > 0 && (
            <Section title={t("education")}>
              {cvObject.education.map((el: EducationType) => (
                <EducationItem {...el} key={el.id}></EducationItem>
              ))}
            </Section>
          )}
          {cvObject.projects.length > 0 && (
            <Section title={t("projects")}>
              {cvObject.projects.map((el: ProjectType) => (
                <ProjectItem {...el} key={el.id}></ProjectItem>
              ))}
            </Section>
          )}
          {cvObject.skills?.length > 0 && (
            <Section title={t("skills")}>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {cvObject.skills.map((el: SkillType) => (
                  <SkillInstance
                    key={el.id}
                    title={el.title}
                    grade={el.metric}
                  ></SkillInstance>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    </FontScaleWrapper>
  );
};

export default Template;



const Section = ({
  children,
  title,
  style,
}: {
  children: ReactNode;
  title: string;
  style?: Object;
}) => {
  return (
    <div className="p-3" style={style}>
      <p className="p font-semibold uppercase pb-1">{title}</p>
      {children}
    </div>
  );
};


const ProfileSection = ({
  name,
  surname,
  jobTitle,
  summary,
  image,
}: {
  name: string;
  surname: string;
  jobTitle: string;
  image: string;
  summary: string;
}) => {
  return (
    <div className="grid grid-cols-[167px_364px] w-full relative pb-6 mb-2">
      <div className="h-48 w-38 rounded-4xl overflow-hidden">
        <img className="w-full h-full object-cover" src={image || "/user-image.png"}></img>
      </div>
      <div className="flex justify-center items-start flex-col name-position p-3 gap-1">
        <p className="h1 font-semibold uppercase text-left">
          {name} {surname}
        </p>
        <p style={{ color: COLORS.YELLOW }} className="sp uppercase">
          {jobTitle}
        </p>
        <p className="sp font-light whitespace-pre-line">{summary}</p>
      </div>
      <div className="aesthetics flex items-center justify-between w-full h-px absolute left-0 bottom-0">
        <IoSparklesSharp size={24} color={COLORS.YELLOW} />
        <div className="line w-10/12 h-px bg-yellow bottom-0"></div>
        <IoSparklesSharp size={24} color={COLORS.YELLOW} />
      </div>
    </div>
  );
};


const SkillInstance = ({
  title,
  grade,
}: {
  title: string;
  grade: SkillType["metric"];
}) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <p className="sp">{title}</p>
      <div className="rounded-full overflow-hidden h-1 w-full bg-white">
        <div className="bg-yellow h-1" style={{ width: `${grade ? grade * 20 : 0}%` }}></div>
      </div>
    </div>
  );
};

const EmploymentItem = ({
  title,
  startDate,
  endDate,
  description,
  employer,
  city,
}: EmploymentType) => {
  const { t } = useTranslation("create-cv");

  return (
    <div className="flex justify-start  items-start gap-2">
      <GiFlowerStar className="sp w-max min-w-max" color={COLORS.YELLOW} />
      <div>
        <p className="sp font-semibold">
          {title} {t("at")} {employer} ({city})
        </p>
        <p className="sp">
          {startDate} - {endDate}
        </p>
        <p className="sp font-light">{description}</p>
      </div>
    </div>
  );
};

const ProjectItem = ({
  title,
  startDate,
  endDate,
  description,
}: ProjectType) => {
  return (
    <div className="flex justify-start  items-start gap-2">
      <GiFlowerStar className="sp" color={COLORS.YELLOW} />
      <div>
        <p className="sp font-semibold">{title}</p>
        <p className="sp">
          {startDate} - {endDate}
        </p>
        <p className="sp font-light">{description}</p>
      </div>
    </div>
  );
};

const EducationItem = ({
  school,
  degree,
  city,
  startDate,
  endDate,
}: EducationType) => {
  const { t } = useTranslation("create-cv");

  return (
    <div className="flex justify-start  items-start gap-2">
      <GiFlowerStar className="sp" color={COLORS.YELLOW} />
      <div>
        <p className="sp font-semibold">
          {degree} {t("at")} {school} ({city})
        </p>
        <p className="sp">
          {startDate} - {endDate}
        </p>
      </div>
    </div>
  );
};







