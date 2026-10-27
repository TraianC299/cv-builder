import H2Tag from "@/components/other/H2Tag";
import SectionSubtitle from "@/components/other/SectionSubtitle";
import SectionWrapper from "@/components/other/SectionWrapper";
import { useTranslation } from "next-i18next";
import { FiDollarSign, FiDownload, FiSave, FiShield } from "react-icons/fi";
import SectionTag from "../other/SectionTag";
import Feature from "./Feature";

const FeaturesSection = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: <FiDollarSign size={20} />,
      title: t("no-fees-title"),
      description: t("no-fees-subtitle"),
    },
    {
      icon: <FiShield size={20} />,
      title: t("privacy-first-title"),
      description: t("privacy-first-subtitle"),
    },
    {
      icon: <FiSave size={20} />,
      title: t("save-progess-title"),
      description: t("save-progress-subtitle"),
    },
    {
      icon: <FiDownload size={20} />,
      title: t("download-pdf-title"),
      description: t("download-pdf-subtitle"),
    },
  ];

  return (
    <SectionWrapper
      className=""
      aria-labelledby="features-title"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 lg:grid-cols-2 lg:items-center">
        {/* Left: heading */}
        <div className="flex flex-col gap-4 text-left lg:max-w-lg">
          <SectionTag>
            {t("features")}
          </SectionTag>
          <H2Tag>{t("why-us-title")}</H2Tag>
          <SectionSubtitle>{t("why-us-subtitle")}</SectionSubtitle>
        </div>

        {/* Right: feature cards */}
        <ul
          role="list"
          aria-label={t("why-us-title")}
          className="grid grid-cols-1 gap-6"
        >
          {features.map((feature, index) => (
            <li
              key={index}
              className="contents"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <Feature
                svg={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
};

export default FeaturesSection;
