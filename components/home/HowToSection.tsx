import chooseTemplate from "@/assets/svg/choose-template-step.svg";
import downloadButton from "@/assets/svg/download-button-step.svg";
import personalInfo from "@/assets/svg/personal-information-step.svg";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { MdFormatListBulleted, MdOutlineDesignServices } from "react-icons/md";

export default function HowToSection() {
  const [active, setActive] = useState(0);
  const { t } = useTranslation("common");

  const steps = [
    {
      icon: <MdOutlineDesignServices className="text-2xl text-white" />,
      title: t("step1.title"),
      desc: t("step1.desc"),
      img: <Image src={chooseTemplate} alt=""  />
    },
    {
      icon: <MdFormatListBulleted className="text-2xl text-white" />,
      title: t("step2.title"),
      desc: t("step2.desc"),
      img: <Image src={personalInfo} alt=""  />
    },
    {
      icon: <FaRegFilePdf className="text-2xl text-white" />,
      title: t("step3.title"),
      desc: t("step3.desc"),
      img: <Image src={downloadButton} alt=""  />
    },
  ];

  return (
    <section className="flex flex-col min-h-160 rounded-lg md:grid md:grid-cols-2 bg-[#f5f5f5] ">
      {/* Steps section */}
      <div className="flex flex-col gap-4 p-4 md:p-16">
        <h2 className="text-4xl font-bold text-gray-900">
          {t("title")}
        </h2>
        <p className="text-secondarytext max-w-md">
          {t("description")}
        </p>
        {steps.map((step, index) => (
          <Step
            key={index}
            step={step}
            index={index}
            active={active === index}
            setActive={setActive}
          />
        ))}
      </div>

      {/* Image section */}
      <div className="flex items-center justify-center h-full w-full aspect-square">
        {steps[active]?.img}
      </div>
    </section>
  );
}


function Step({
  step,
  index,
  active,
  setActive
}: {
  step: { icon: ReactNode; title: string; desc: string; img: ReactNode };
  index: number;
  active: boolean;
  setActive: (index: number) => void;
}) {
  function handleMouseEnter() {
    // check once in every 500ms
    if(!active){
      setActive(index);
    }
  }
  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-colors ${active
        ? "bg-maincolor text-white"
        : "bg-white hover:bg-gray-50"
        }`}
      onMouseEnter={handleMouseEnter}
      
    >
      <div className="flex items-center justify-center h-10 w-10 min-w-10 bg-maincolor rounded-full">{step.icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{step.title}</h3>
        <p className={`${active ? "text-white" : 'text-secondarytext'}`}>{step.desc}</p>
      </div>
    </div>
  );
}