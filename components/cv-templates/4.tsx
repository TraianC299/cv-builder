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
import { Fragment, type ReactNode } from "react";
import FontScaleWrapper from "../createcv/FontScaleWrapper/FontScaleWrapper";


const Template = () => {
  const { t } = useTranslation("create-cv");
  const { cvObject } = useCV()

  return (
    <FontScaleWrapper className={"p-6 bg-white relative"} color={cvObject.color}>

      <ProfileSection />

      <div className="float-left w-[167px] mr-2 h-[calc(100%-5rem)] border-r-2 border-black">
        <Section className="pl-0 w-full border-b-2 border-black"
          title={t("hobbies")}
        >
          <p className="sp">{cvObject.hobbies}</p>
        </Section>
        {cvObject.languages?.length > 0 && (
          <Section className="pl-0 w-full border-b-2 border-black" title={t("languages")}>
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
        {cvObject.skills?.length > 0 && (
          <Section className="pl-0 w-full border-b-2 border-black" title={t("skills")}>
            <div className="flex flex-col gap-2">
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
      <Section
        className="border-b-2 border-black w-[380px] ml-auto"
        title={t("professional-summary")}
      >
        <p className="sp">{cvObject.summary}</p>
      </Section>

      {/* employment */}
      {cvObject.employment.map((el, i) => (
        <Fragment key={el.id}>
          {i === 0 && <SpaceT />}
          {i === 0 && <Title>{t("employment")}</Title>}
          <EmploymentItem {...el} key={el.id} />
          {i === cvObject.employment.length - 1 && <BorderB />}
        </Fragment>
      ))}

      {cvObject.internships.map((el, i) => (
        <Fragment key={el.id}>
          {i === 0 && <SpaceT />}
          {i === 0 && <Title>{t("internships")}</Title>}
          <EmploymentItem {...el} key={el.id} />
          {i === cvObject.internships.length - 1 && <BorderB />}

        </Fragment>
      ))}
      {cvObject.education.map((el, i) => (
        <Fragment key={el.id}>
          {i === 0 && <SpaceT />}
          {i === 0 && <Title>{t("education")}</Title>}
          <EducationItem {...el} key={el.id}></EducationItem>
          {i === cvObject.education.length - 1 && <BorderB />}

        </Fragment>
      ))}

      {/* projects */}
      {cvObject.projects.map((el, i) => (
        <Fragment key={el.id}>
          {i === 0 && <SpaceT />}
          {i === 0 && <Title>{t("projects")}</Title>}
          <ProjectItem {...el} key={el.id}></ProjectItem>
          {i === cvObject.projects.length - 1 && <BorderB />}
        </Fragment>
      ))}

      {cvObject?.certifications?.map((el, i) => (
        <Fragment key={el.id}>
          {i === 0 && <SpaceT />}
          {i === 0 && <Title>{t("certifications")}</Title>}
          <CetificationItem {...el} key={el.id} />
          {i === (cvObject?.certifications?.length || 0) - 1 && <BorderB />}

        </Fragment>
      ))}
    </FontScaleWrapper>
  );
};

export default Template;


const Title = ({ children }: { children: string }) => <p className="sp font-semibold uppercase mb-1">{children}</p>

const BorderB = () => <div className="h-2 border-b-2 border-black w-[380px] ml-auto in-[#page-1]:w-full in-[#page-2]:w-full" />
const SpaceT = () => <div className="h-2" />
const Section = ({
  children,
  title,
  style,
  className
}: {
  children: ReactNode;
  title: string;
  style?: Object,
  className?: string
}) => {
  return (
    <div className={`p-2 ${className}`} style={style}>
      <Title>{title}</Title>
      {children}
    </div>
  );
};



const ProfileSection = () => {
  const { t } = useTranslation("create-cv");
  const { cvObject } = useCV()

  return (
    <div className="flex pb-2 items-center justify-between border-b-2 border-black">
      <div className="flex justify-start flex-col gap-1 name-position max-w-[70%]">
        <p className="h4 font-semibold uppercase leading-6">
          {cvObject.name}
          <br />
          {cvObject.surname}
        </p>
        <p className="sp uppercase">{cvObject.jobTitle}</p>
      </div>
      <ul>
        <li className="sp">
          <b>{t("location")}: </b>
          {cvObject.city} {cvObject.country}
        </li>
        <li className="sp">
          <b>{t("phone")}: </b>
          {cvObject.phone}

        </li>
        <li className="sp">
          <b>{t("email")}: </b>
          {cvObject.email}
        </li>
        <li className="sp">
          <b>{t("date-of-birth")}: </b>
          {cvObject.dateOfBirth}
        </li>
      </ul>
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
      <div
        className="h-1 w-full overflow-hidden bg-lightgrey"
      >
        <div
          className="h-1"
          style={{ width: `${grade ? grade * 20 : 0}%`, background: COLORS.BLACK }}
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
    <div>
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
    <div>
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
    <div>
      <p className="sp font-semibold">
        {degree} {t("at")} {school} ({city})
      </p>
      <p className="sp">
        {startDate} - {endDate}
      </p>
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
    <div>
      <p className="sp font-semibold">
        {title} ({t("issued-by")} {issuer})
      </p>
      <p className="sp">
        {t('issued-on')}: {issueDate} {expirationDate ? `/ ${t('expires-on')}: ${expirationDate}` : ''}
      </p>
    </div>
  );
};