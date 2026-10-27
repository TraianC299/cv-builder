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

const TemplateOne = () => {
  const { cvObject } = useCV()
  const { t } = useTranslation("create-cv");
  return (
    <FontScaleWrapper
      className={`relative p-6 bg-white`}
      color={cvObject.color}
    >
      <div
        style={{ background: cvObject.color || COLORS.DARKBLUE }}
        className="absolute top-0 left-0 -z-10 h-[841px] w-3/8"></div>
      <div
        className={`p-6 pl-0 z-10 flex flex-col gap-3 text-white float-left w-3/8 mr-4 h-[calc(842px-3rem)] max-h-full`}
      >
        <ProfileSection
          name={cvObject.name}
          surname={cvObject.surname}
          jobTitle={cvObject.jobTitle}
          image={cvObject.profileImage}
        ></ProfileSection>

        <Section title={t("personal-info")}>
          <div>
            <p className="sp">
              {t("location")}: {cvObject.city}, {cvObject.country}
            </p>
            <p className="sp">
              {t("phone")}: {cvObject.phone}
            </p>
            <p className="sp">
              {t("email")}: {cvObject.email}
            </p>
            <p className="sp">
              {t("date-of-birth")}: {cvObject.dateOfBirth}
            </p>
          </div>
        </Section>
        {cvObject.hobbies && (
          <Section title={t("hobbies")}>
            <p className="sp">{cvObject?.hobbies}</p>
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
      </div>


      {/* professional summary */}
      {cvObject.summary && <Title>{t("professional-summary")}</Title>}
      {cvObject.summary.split("\n").map((line, i) => (
        <p key={i} className="sp whitespace-pre-line">
          {line}
        </p>
      ))}
      {cvObject.summary && <div className="h-1" />}


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

export default TemplateOne;


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
  image,
}: {
  name: string;
  surname: string;
  jobTitle: string;
  image: string;
}) => {
  return (
    <div className="z-[999] my-2 flex flex-col items-center justify-center gap-2">
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full">
        <img className="h-full w-full object-cover" src={image || "/user-image.png"}></img>
      </div>
      <div className="flex flex-col justify-start">
        <p className="h6 text-center font-semibold">
          {name} {surname}
        </p>
        <p className="text-center sp">{jobTitle}</p>
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
    <div className="flex w-full flex-col gap-1">
      <p className="sp">{title}</p>
      <div className="h-[5px] w-full overflow-hidden rounded-full bg-white/50">
        <div
          className="h-[5px] bg-white"
          style={{ width: `${grade ? grade * 20 : 0}%` }}
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