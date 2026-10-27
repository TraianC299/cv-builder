import COLORS from "@/constants/COLORS";
import type {
  CertificationType,
  EducationType,
  EmploymentType,
  ProjectType,
  SkillType
} from "@/interfaces/cv.types";
import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import type { ReactNode } from "react";
import React from "react";
import FontScaleWrapper from "../createcv/FontScaleWrapper/FontScaleWrapper";

const TemplateTwo = ({
  className,
}: {
  className?: string;
}) => {
  const { t } = useTranslation("create-cv");
  const { cvObject } = useCV()
  return (
    <FontScaleWrapper color={cvObject.color} className={`p-6 bg-white ${className}`}>

      <div className="flex flex-col float-left w-[137px] mr-6 h-[calc(842px-3rem)]">
        <div className="mb-4 w-[100px] h-[100px] min-h-[100px] rounded-full flex items-center justify-center overflow-hidden ml-[18px]">
          <img className="h-full w-full object-cover" src={cvObject.profileImage || "/user-image.png"}></img>
        </div>
        <Section title={t("personal-info")}>
          <ul className="flex flex-col">
            <li className="sp">
              {t("location")}: {cvObject.city}, {cvObject.country}
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
        <Section title={t("hobbies")}>
          <p className="sp">{cvObject.hobbies}</p>
        </Section>

        {cvObject.languages?.length > 0 && (
          <Section title={t("languages")}>
            <div className="flex flex-col gap-1">
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
        {cvObject.skills?.length > 0 && (
          <Section title={t("skills")}>
            <div className="flex flex-col gap-1">
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
      <div
        className="flex justify-center flex-col justify-self-start h-[100px] mb-4">
        <p className="h3 font-semibold">
          {cvObject.name} {cvObject.surname}
        </p>
        <p className="h6">{cvObject.jobTitle}</p>
      </div>
      <Section title={t("professional-summary")}>
        <p className="sp whitespace-pre-line">{cvObject.summary}</p>
      </Section>
      {/* employment */}

      {cvObject.employment.map((el, i) => (
        <React.Fragment key={el.id}>
          {i === 0 && <Title>{t("employment")}</Title>}
          <EmploymentItem {...el} key={el.id} />
          {i === cvObject.employment.length - 1 && <div className="h-1" />}
        </React.Fragment>
      ))}


      {/* internships */}
      {cvObject.internships.map((el, i) => (
        <React.Fragment key={el.id}>
          {i === 0 && <Title>{t("internships")}</Title>}
          <EmploymentItem {...el} key={el.id} />
          {i === cvObject.internships.length - 1 && <div className="h-1" />}
        </React.Fragment>
      ))}


      {/* education */}
      {cvObject.education.map((el, i) => (
        <React.Fragment key={el.id}>
          {i === 0 && <Title>{t("education")}</Title>}
          <EducationItem {...el} key={el.id}></EducationItem>
          {i === cvObject.education.length - 1 && <div className="h-1" />}

        </React.Fragment>
      ))}


      {/* projects */}
      {cvObject.projects.map((el, i) => (
        <React.Fragment key={el.id}>
          {i === 0 && <Title>{t("projects")}</Title>}
          <ProjectItem {...el} key={el.id}></ProjectItem>
          {i === cvObject.projects.length - 1 && <div className="h-1" />}

        </React.Fragment>
      ))}

      {/* certifications */}
      {cvObject?.certifications?.map((el, i) => (
        <React.Fragment key={el.id}>
          {i === 0 && <Title>{t("certifications")}</Title>}
          <CetificationItem {...el} key={el.id} />
          {i === (cvObject?.certifications?.length || 0) - 1 && <div className="h-1" />}
        </React.Fragment>
      ))}

    </FontScaleWrapper>
  );
};

export default TemplateTwo;


const Section = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className="mb-2">
      <Title>{title}</Title>
      {children}
    </div>
  );
};



const Title = ({ children }: { children: string }) => <p className="p font-semibold mb-1">{children}</p>


const SkillInstance = ({
  title,
  grade,
}: {
  title: string;
  grade: SkillType["metric"];
}) => {
  const { cvObject } = useCV()
  return (
    <div className="flex items-center justify-between">
      <p className="sp">{title}</p>
      <div className="flex gap-1">
        {Array.from(Array(5).keys()).map((el, index) => (
          <div
            key={el.toString()}
            className="circle h-2 w-2 rounded-full"
            style={{
              background:
                index + 1 <= (grade || 0)
                  ? cvObject?.color || COLORS.YELLOW
                  : COLORS.LIGHTGREY,
            }}
          ></div>
        ))}
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
    <div className="mb-1">
      <div>
        <p className="sp font-medium italic">
          {title} {t("at")} {employer} ({city})
        </p>
        <p className="sp">
          {startDate} - {endDate}
        </p>
      </div>
      <p className="sp">{description}</p>
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
    <div className="mb-1">
      <div>
        <p className="sp font-medium italic">{title}</p>
        <p className="sp">
          {startDate} - {endDate}
        </p>
      </div>
      <p className="sp">{description}</p>
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
    <div className="mb-1">
      <div>
        <p className="sp font-medium italic">
          {degree} {t("at")} {school} ({city})
        </p>
        <p className="sp">
          {startDate} - {endDate}
        </p>
      </div>
    </div>
  );
};


const CetificationItem = ({
  title,
  issuer,
  issueDate,
  expirationDate,
}: CertificationType) => {
  const { t } = useTranslation("create-cv");

  return (
    <div className="mb-1">
      <div>
        <p className="sp font-semibold">
          {title} ({t("issued-by")} {issuer})
        </p>
        <p className="sp">
          {t('issued-on')}: {issueDate} {expirationDate ? `/ ${t('expires-on')}: ${expirationDate}` : ''}
        </p>
      </div>
    </div>
  );
};