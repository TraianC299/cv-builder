import DownloadButton from "@/assets/svg/download-button-step.svg";
import PersonalInfo from "@/assets/svg/personal-information-step.svg";
import ChooseTemplate from "@/assets/svg/choose-template-step.svg";
import styled from "styled-components";
import COLORS from "@/constants/COLORS";
import { MdFormatListBulleted, MdOutlineDesignServices } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "next-i18next";

export default function HowToSection() {
  const [active, setActive] = useState(0);
  const { t } = useTranslation("common");

  const steps = [
    {
      icon: <MdOutlineDesignServices className="text-2xl text-white" />,
      title: t("step1.title"),
      desc: t("step1.desc"),
      img: <ChooseTemplate />
    },
    {
      icon: <MdFormatListBulleted className="text-2xl text-white" />,
      title: t("step2.title"),
      desc: t("step2.desc"),
      img: <PersonalInfo />
    },
    {
      icon: <FaRegFilePdf className="text-2xl text-white" />,
      title: t("step3.title"),
      desc: t("step3.desc"),
      img: <DownloadButton />
    },
  ];

  return (
    <section className="flex flex-col min-h-[40rem] rounded-lg md:grid md:grid-cols-2 bg-[#f5f5f5] ">
      {/* Steps section */}
      <div className="flex flex-col gap-4 p-4 md:p-16">
        <h2 className="text-4xl font-bold text-gray-900">
          {t("title")}
        </h2>
        <p className="text-gray-600 max-w-md">
          {t("description")}
        </p>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-colors ${active === index
                ? "bg-blue-100"
                : "bg-white hover:bg-gray-50"
              }`}
            onMouseEnter={() => setActive(index)}
          >
            <div className="flex items-center justify-center h-10 w-10 min-w-10 bg-maincolor rounded-full">{step.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Image section */}
      <div className="flex items-center justify-center h-full w-full aspect-square">
        {steps[active].img}
      </div>
    </section>
  );
}
