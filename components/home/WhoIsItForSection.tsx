import H2Tag from "@/components/other/H2Tag";
import SectionSubtitle from "@/components/other/SectionSubtitle";
import SectionTag from "@/components/other/SectionTag";
import SectionWrapper from "@/components/other/SectionWrapper";
import { useTranslation } from "next-i18next";
import React from "react";
import { FiBriefcase, FiPenTool, FiShuffle, FiUser } from "react-icons/fi";

type AudienceItem = {
  key: string;
  icon: React.ReactNode;
  bg: string;
  iconBg: string;
  iconColor: string;
};

const items: AudienceItem[] = [
  {
    key: "students",
    icon: <FiUser className="h-5 w-5" />,
    bg: "#eef2ff",
    iconBg: "#dce5ff",
    iconColor: "#1255f7",
  },
  {
    key: "career_changers",
    icon: <FiShuffle className="h-5 w-5" />,
    bg: "#fff7ed",
    iconBg: "#fed7aa",
    iconColor: "#c2410c",
  },
  {
    key: "professionals",
    icon: <FiBriefcase className="h-5 w-5" />,
    bg: "#f0fdf4",
    iconBg: "#bbf7d0",
    iconColor: "#15803d",
  },
  {
    key: "freelancers",
    icon: <FiPenTool className="h-5 w-5" />,
    bg: "#faf5ff",
    iconBg: "#e9d5ff",
    iconColor: "#7e22ce",
  },
];

const WhoIsItForSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SectionWrapper className="bg-white">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-3 lg:mb-12">
        <SectionTag>{t("who_for_eyebrow")}</SectionTag>
        <H2Tag>{t("who_for_title")}</H2Tag>
        <SectionSubtitle className="max-w-2xl">
          {t("who_for_subtitle")}
        </SectionSubtitle>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <article
            key={item.key}
            className="flex flex-col gap-2 rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-1 md:gap-4 md:p-6"
            style={{ background: item.bg }}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: item.iconBg, color: item.iconColor }}
            >
              {item.icon}
            </div>
            <h3 className="text-base font-semibold text-blackgrey">
              {t(`who_for_${item.key}_title`)}
            </h3>
            <p className="text-sm leading-relaxed text-grey">
              {t(`who_for_${item.key}_text`)}
            </p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default WhoIsItForSection;
