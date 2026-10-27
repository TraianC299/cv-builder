import image5 from "@/assets/images/cv-images/4.png";
import H2Tag from "@/components/other/H2Tag";
import SectionSubtitle from "@/components/other/SectionSubtitle";
import SectionWrapper from "@/components/other/SectionWrapper";
import { useTranslation } from "next-i18next";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import React from "react";
import image1 from "../../assets/images/cv-images/0.png";
import image2 from "../../assets/images/cv-images/1.png";
import image3 from "../../assets/images/cv-images/2.png";
import SectionTag from "../other/SectionTag";


const templateImages: StaticImageData[] = [
  image5,
  image2,
  image3,
  image1,
];





const TemplatesSection: React.FC = () => {
  const { t } = useTranslation();




  return (
    <SectionWrapper className="bg-lightgrey flex flex-col gap-8 p-4">
      {/* Header row */}
      <div className="flex flex-col gap-3 text-black">
        <SectionTag variant="border">{t("templates-section-label")}</SectionTag>
        <H2Tag>{t("templates-section-title")}</H2Tag>
        <SectionSubtitle>{t("templates-section-subtitle")}</SectionSubtitle>
      </div>

      {/* Cards row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-6 items-center">
        {templateImages.map((image, index) => (
          <div
            key={index}
            className="relative aspect-595/842 shadow-2xl transition hover:-translate-y-1.5">
            <Image
              alt={t("cv-template-alt", { defaultValue: "CV template preview" })}
              src={image}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 24vw, 20vw"
              className="object-contain h-full w-full"
            />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default TemplatesSection;
