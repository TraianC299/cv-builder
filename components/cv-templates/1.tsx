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

const TemplateZero = ({
  className,
}: {
  className?: string;
}) => {
  const { t } = useTranslation("create-cv");
  const { cvObject } = useCV()

  return (
    <FontScaleWrapper
      className={`relative bg-white p-6 ${className || ""}`}
      color={cvObject.color}
    >

      <div className="relative flex flex-col gap-2 float-right w-3/8 h-[calc(842px-3rem)] ml-6">
        <Section title={t("personal-info")}>
          <ul>
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
        {cvObject.skills?.length > 0 && (
          <Section title={t("skills")}>
            <div className="flex flex-col gap-1">
              {cvObject.skills.map((el: SkillType) => (
                <SkillInstance
                  key={el.id}
                  title={el.title}
                  grade={el.metric}
                  color={cvObject.color}
                ></SkillInstance>
              ))}
            </div>
          </Section>
        )}
        {cvObject.languages?.length > 0 && (
          <Section title={t("languages")}>
            <div className="flex flex-col gap-1">
              {cvObject.languages.map((el: SkillType) => (
                <SkillInstance
                  key={el.id}
                  title={el.title}
                  grade={el.metric}
                  color={cvObject.color}
                ></SkillInstance>
              ))}
            </div>
          </Section>
        )}
      </div>

      {/* profile section */}
      <ProfileSection
        name={cvObject.name}
        surname={cvObject.surname}
        jobTitle={cvObject.jobTitle}
        profileImage={cvObject.profileImage}
        color={cvObject.color}
      ></ProfileSection>
      <div className="h-10"></div>

      {cvObject.summary && <Title>{t("professional-summary")}</Title>}
      {cvObject.summary.split("\n").map((line, i) => (
        <p key={i} className="sp whitespace-pre-line">
          {line}
        </p>
      ))}
      {cvObject.summary && <div className="h-1"></div>}

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

export default TemplateZero;


const Title = ({ children }: { children: string }) => <p className="p font-semibold mb-1">{children}</p>


const Section = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div>
      <Title>{title}</Title>
      {children}
    </div>
  );
};

const ProfileSection = ({
  name,
  surname,
  jobTitle,
  profileImage,
  color,
}: {
  name: string;
  surname: string;
  jobTitle: string;
  profileImage: string;
  color?: string;
}) => {
  return (
    <div
      className="relative flex gap-4 items-center"
    >

      <div className="z-10 ml-0 flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full">
        <img className="h-full w-full object-cover" src={profileImage || "/user-image.png"}></img>
      </div>
      <div className="flex z-10 flex-col justify-start">
        <p className="h5 font-semibold leading-none text-white">
          {name} {surname}
        </p>
        <p className="sp text-white">{jobTitle}</p>
      </div>

      <div className="background absolute -top-6 -left-6 w-[calc(100%+1.5rem)] h-[calc(100%+3rem)]"
        style={{ background: color || COLORS.MAINCOLOR }}
      ></div>
    </div>
  );
};

const SkillInstance = ({
  title,
  grade,
  color,
}: {
  title: string;
  grade: SkillType["metric"];
  color?: string;
}) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <p className="sp">{title}</p>
      <div
        className="h-[5px] w-full overflow-hidden rounded-full bg-lightgrey"
      >
        <div
          className="h-[5px]"
          style={{
            width: `${grade ? grade * 20 : 0}%`,
            background: color || COLORS.MAINCOLOR,
          }}
        ></div>
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
        <p className="sp font-semibold">{title}</p>
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
