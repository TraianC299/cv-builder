import type {
  CertificationType,
  EducationType,
  EmploymentType,
  ProjectType
} from "@/interfaces/cv.types";
import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import type { ReactNode } from "react";
import React from "react";
import FontScaleWrapper from "../createcv/FontScaleWrapper/FontScaleWrapper";

const skillsKeys = {
  1: "novice",
  2: "beginner",
  3: "skillful",
  4: "experienced",
  5: "expert",
}

const TemplateTwo = ({
  className,
}: {
  className?: string;
}) => {
  const { t } = useTranslation("create-cv");
  const { cvObject } = useCV()
  return (
    <FontScaleWrapper color={cvObject.color} className={`relaive flex flex-col bg-white p-6 ${className}`}>
      <ProfileSection
        name={cvObject.name}
        surname={cvObject.surname}
        jobTitle={cvObject.jobTitle}
        image={cvObject.profileImage}
      ></ProfileSection>
      <Section title={t("personal-info")}>
        <ul className="list-inside">
          <li className="sp list-disc">
            {t("location")}: {cvObject.city}, {cvObject.country}
          </li>
          <li className="sp list-disc">
            {t("phone")}: {cvObject.phone}
          </li>
          <li className="sp list-disc">
            {t("email")}: {cvObject.email}
          </li>
          <li className="sp list-disc">
            {t("date-of-birth")}: {cvObject.dateOfBirth}
          </li>
        </ul>
      </Section>

      {/* hobbies */}
      {cvObject?.hobbies && <Title>{t("hobbies")}</Title>}
      {cvObject?.hobbies?.split("\n").map((line, i) => (
        <p key={i} className="sp whitespace-pre-line">
          {line}
        </p>
      ))}
      {cvObject?.hobbies && <div className="h-1" />}

      {cvObject?.languages?.length > 0 && (
        <Section title={t("languages")}>
          <ul className="list-inside">
            {cvObject.languages.map(el => <li className="sp list-disc" key={el.title}>
              {el.title} - {el.metric ? t(skillsKeys[el.metric]) : ''}
            </li>)}
          </ul>
        </Section>
      )}
      {cvObject.skills?.length > 0 && (
        <Section title={t("skills")}>
          <ul className="list-inside">
            {cvObject.skills.map(el => <li className="sp list-disc" key={el.title}>
              {el.title} - {el.metric ? t(skillsKeys[el.metric]) : ''}
            </li>)}
          </ul>
        </Section>
      )}
      {cvObject?.summary && cvObject?.summary?.split("\n").map((line, i) => (
        <React.Fragment key={line}>
          {i === 0 && <Title>{t("professional-summary")}</Title>}
          <p key={i} className="sp whitespace-pre-line">
            {line}
          </p>
        </React.Fragment>
      ))}
      {cvObject.summary && <div className="h-1" />}

      {/* employment */}
      {cvObject.employment.map((el, i) => (
        <React.Fragment key={el.id}>
          {i === 0 && <Title>{t("employment")}</Title>}
          <EmploymentItem {...el} key={el.id}></EmploymentItem>
          {i === cvObject.employment.length - 1 && <div className="h-1" />}
        </React.Fragment>
      ))}


      {/* internships */}
      {cvObject.internships.map((el, i) => (
        <React.Fragment key={el.id}>
          {i === 0 && <Title>{t("internships")}</Title>}
          <EmploymentItem {...el} key={el.id}></EmploymentItem>
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
      {cvObject?.certifications?.map((el, i) => (
        <React.Fragment key={el.id}>
          {i === 0 && <Title>{t("certifications")}</Title>}
          <CetificationItem {...el} key={el.id} />
          {i === (cvObject?.certifications?.length ?? 0) - 1 && <div className="h-1" />}
        </React.Fragment>
      ))}
    </FontScaleWrapper>
  );
};

export default TemplateTwo;

const Title = ({ children }: { children: string }) => <p className="p font-semibold border-t pt-2">{children}</p>

const Section = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <>
      <Title>{title}</Title>
      {children}
      <div className="h-2" />

    </>
  );
};


const ProfileSection = ({
  name,
  surname,
  jobTitle,
  image,
}: {
  name: string;
  surname: string;
  jobTitle: string;
  image: string;
}) => {
  return (
    <div className="flex items-center justify-start gap-2 mb-2">
      <img className="h-12 w-12 rounded-full object-cover" src={image || "/user-image.png"}></img>
      <div className="flex justify-start flex-col">
        <p className="h6 font-semibold">
          {name} {surname}
        </p>
        <p className="sp">{jobTitle}</p>
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
        <p className="sp font-semibold">
          {title} {t("at")} {employer} ({city})
        </p>
        <p className="sp">
          {startDate} - {endDate}
        </p>
      </div>
      {description.split("\n").map((line, i) => (
        <p key={i} className="sp">
          {line}
        </p>
      ))}
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
        <p className="sp font-semibold">{title}</p>
        <p className="sp">
          {startDate} - {endDate}
        </p>
      </div>
      {description.split("\n").map((line, i) => (
        <p key={i} className="sp">
          {line}
        </p>
      ))}
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
