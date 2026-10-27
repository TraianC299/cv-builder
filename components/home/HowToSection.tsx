import COLORS from "@/constants/COLORS";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useMemo, useState } from "react";

// Assets
import chooseTemplate from "@/assets/svg/choose-template-step.svg";
import downloadButton from "@/assets/svg/download-button-step.svg";
import personalInfo from "@/assets/svg/personal-information-step.svg";
import H2Tag from "@/components/other/H2Tag";
import SectionSubtitle from "@/components/other/SectionSubtitle";
import SectionWrapper from "@/components/other/SectionWrapper";

// --- 2. Main Component ---
export default function HowToSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const { t } = useTranslation("common");

  // Memoize steps so they aren't recreated on every render
  const steps = useMemo(
    () => [
      {
        title: t("step1.title"),
        desc: t("step1.desc"),
        img: chooseTemplate,
        alt: "Choose Template Step",
      },
      {
        title: t("step2.title"),
        desc: t("step2.desc"),
        img: personalInfo,
        alt: "Personal Information Step",
      },
      {
        title: t("step3.title"),
        desc: t("step3.desc"),
        img: downloadButton,
        alt: "Download PDF Step",
      },
    ],
    [t],
  );

  return (
    <SectionWrapper className="mx-auto px-5 py-14 md:py-20 bg-lightgrey w-full">
      <header className="text-center">
        <H2Tag>{t("title")}</H2Tag>

        <SectionSubtitle className="mx-auto">
          {t("description")}
        </SectionSubtitle>
      </header>

      <div className="relative mt-10 md:mt-14">
        <div className="hidden md:block">
          <svg
            className="absolute left-1/2 top-12 -translate-x-1/2"
            width="860"
            height="120"
            viewBox="0 0 860 120"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 60 C 180 10, 320 110, 430 60 C 560 0, 700 110, 840 60"
              stroke={COLORS.BORDERCOLOR}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 8"
            />
          </svg>
        </div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <button
                type="button"
                onMouseEnter={() => setActiveStepIndex(index)}
                onFocus={() => setActiveStepIndex(index)}
                onClick={() => setActiveStepIndex(index)}
                className="mx-auto flex w-full flex-col items-center gap-5 text-center"
              >
                <div
                  className="relative flex h-56 aspect-square items-center justify-center rounded-lg overflow-hidden border bg-white"
                  style={{
                    borderColor:
                      activeStepIndex === index
                        ? COLORS.MAINCOLOR
                        : COLORS.BORDERCOLOR,
                  }}
                >
                  <Image
                    src={step.img}
                    alt={step.alt}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
                <div>
                  <h3
                    className="mt-2 text-lg font-semibold"
                    style={{ color: COLORS.DARKBLUE }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
