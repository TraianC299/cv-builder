import { useState, useEffect, useRef, useCallback, useMemo, ReactNode } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { FaRegFilePdf } from "react-icons/fa";
import { MdFormatListBulleted, MdOutlineDesignServices } from "react-icons/md";

// Assets
import chooseTemplate from "@/assets/svg/choose-template-step.svg";
import downloadButton from "@/assets/svg/download-button-step.svg";
import personalInfo from "@/assets/svg/personal-information-step.svg";
import { useThrottle } from "@/hooks/useThrottle";

// --- 1. Custom Hook: useThrottle (Included inline for convenience) ---


// --- 2. Main Component ---
export default function HowToSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const { t } = useTranslation("common");

  // Memoize steps so they aren't recreated on every render
  const steps = useMemo(() => [
    {
      icon: <MdOutlineDesignServices className="text-2xl text-white" />,
      title: t("step1.title"),
      desc: t("step1.desc"),
      img: chooseTemplate,
      alt: "Choose Template Step"
    },
    {
      icon: <MdFormatListBulleted className="text-2xl text-white" />,
      title: t("step2.title"),
      desc: t("step2.desc"),
      img: personalInfo,
      alt: "Personal Information Step"
    },
    {
      icon: <FaRegFilePdf className="text-2xl text-white" />,
      title: t("step3.title"),
      desc: t("step3.desc"),
      img: downloadButton,
      alt: "Download PDF Step"
    },
  ], [t]);

  return (
    <section className="flex flex-col min-h-160 rounded-lg md:grid md:grid-cols-2 bg-[#f5f5f5] overflow-hidden">
      {/* List Section */}
      <div className="flex flex-col justify-center gap-6 p-6 md:p-16">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-gray-900">{t("title")}</h2>
          <p className="text-secondarytext max-w-md">{t("description")}</p>
        </div>
        
        <div className="flex flex-col gap-2">
          {steps.map((step, index) => (
            <StepItem
              key={index}
              step={step}
              isActive={activeStepIndex === index}
              onActivate={() => setActiveStepIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Image Section */}
      <StepImage steps={steps} activeStepIndex={activeStepIndex} />
      
    </section>
  );
}

// --- 3. Sub-Component: Step Item (Handles Hover Logic) ---
function StepItem({ 
  step, 
  isActive, 
  onActivate 
}: { 
  step: { icon: ReactNode; title: string; desc: string }; 
  isActive: boolean; 
  onActivate: () => void 
}) {
  
  // Throttle the activation to prevent lag when moving mouse quickly
  const handleActivate = useThrottle(() => {
    if (!isActive) onActivate();
  }, 150);

  // Ensure any pending throttled calls are cancelled when the component unmounts
  useEffect(() => {
    return () => {
      if (typeof handleActivate?.cancel === "function") {
        handleActivate.cancel();
      }
    };
  }, [handleActivate]);

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseEnter={() => handleActivate.throttledFunction()}
      onFocus={() => handleActivate.throttledFunction()} // For keyboard accessibility
      className={`
        group flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ease-in-out
        ${isActive ? "bg-maincolor shadow-md translate-x-2" : "bg-transparent hover:bg-white hover:shadow-sm"}
      `}
    >
      <div className={`
        flex items-center justify-center h-10 w-10 min-w-10 rounded-full transition-colors duration-300 bg-maincolor
      `}>
        {step.icon}
      </div>
      <div>
        <h3 className={`text-lg font-semibold transition-colors duration-300 ${isActive ? "text-white" : "text-gray-900"}`}>
          {step.title}
        </h3>
        <p className={`text-sm mt-1 transition-colors duration-300 ${isActive ? "text-white/90" : "text-secondarytext"}`}>
          {step.desc}
        </p>
      </div>
    </div>
  );
}
// --- REPLACEMENT COMPONENT ---

function StepImage({ 
  steps, 
  activeStepIndex 
}: { 
  steps: { img: any; alt: string }[]; 
  activeStepIndex: number 
}) {
  return (
    <div className="relative flex items-center justify-center h-full w-full bg-gray-100/50 p-8 md:p-0 overflow-hidden">
      {/* Container defines the aspect ratio. 
        Adjust max-w/h to fit your specific SVG dimensions.
      */}
      <div className="relative w-full max-w-md aspect-square">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`
              absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out
              ${activeStepIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"}
            `}
          >
            <Image
              src={step.img}
              alt={step.alt}
              fill
              className="object-contain"
              priority={index === 0} // Load the first one immediately
            />
          </div>
        ))}
      </div>
    </div>
  );
}