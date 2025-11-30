import chooseTemplate from "@/assets/svg/choose-template-step.svg";
import downloadButton from "@/assets/svg/download-button-step.svg";
import personalInfo from "@/assets/svg/personal-information-step.svg";
import { useThrottle } from "@/hooks/useThrottle";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { ReactNode, use, useCallback, useEffect, useMemo, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { MdFormatListBulleted, MdOutlineDesignServices } from "react-icons/md";

export default function HowToSection() {
  const [active, setActive] = useState(0); // The "target" step (highlighted in list)
  
  // New State for Animation Logic
  const [isVisible, setIsVisible] = useState(true); // Controls opacity (1 or 0)
  
  const { t } = useTranslation("common");
  const steps = useMemo(()=>[
    {
      icon: <MdOutlineDesignServices className="text-2xl text-white" />,
      title: t("step1.title"),
      desc: t("step1.desc"),
      img: chooseTemplate
    },
    {
      icon: <MdFormatListBulleted className="text-2xl text-white" />,
      title: t("step2.title"),
      desc: t("step2.desc"),
      img: personalInfo
    },
    {
      icon: <FaRegFilePdf className="text-2xl text-white" />,
      title: t("step3.title"),
      desc: t("step3.desc"),
      img: downloadButton
    },
  ], []);

  // Logic to handle the sequence: Fade Out -> Swap -> Fade In
  useEffect(() => {
      // 1. Start Fade Out
      setIsVisible(false);

      // 2. Wait for the CSS transition to finish (300ms matches the Tailwind duration)
      const timer = setTimeout(() => {
        setIsVisible(true); // Start Fade In
      }, 300);

      return () => clearTimeout(timer);
    
  }, [active]);

  const memoizedImageComponent = useCallback(() => {
    return (
      <Image
        alt={steps[active].title} // Use displayedIndex, not active
        src={steps[active].img}   // Use displayedIndex, not active
        // You might need width/height or layout='fill' depending on your setup
        // width={500}
        // height={500}
      />
    );
  }, [active]);

  useEffect(() => {

  console.log("Rendering HowToSection with active step:", isVisible);
  }, [active]);
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
            active={active} // Highlight based on the immediate 'active' state
            setActive={setActive}
          />
        ))}
      </div>

      {/* Image section */}
      <div className="flex items-center justify-center h-full w-full aspect-square">
        <div 
          className={`transition-opacity duration-300 ease-in-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {memoizedImageComponent()}
        </div>
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
  active: number;
  setActive: (index: number) => void;
}) {

  // 1. Define the action function to be throttled
  const updateActiveStep = useCallback(() => {
    // Only update the state if it's not already the active one
    if (active !== index) {
      setActive(index);
    }
  }, [active, index, setActive]);

  // 2. Apply the throttle hook (e.g., 200ms delay)
  const { throttledFunction: setActiveThrottled, cancel: cancelThrottled } = useThrottle(
    updateActiveStep,
    200 // Set your desired delay in milliseconds
  );

  // 3. Define the mouse handler to call the throttled function
  function handleMouseEnter() {
    setActiveThrottled();
  }
  
  // 4. Cleanup on component unmount
  useEffect(() => {
    return () => {
      cancelThrottled();
    };
  }, [cancelThrottled]);

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-colors ${active === index
        ? "bg-maincolor text-white"
        : "bg-white hover:bg-gray-50"
        }`}
      onMouseEnter={handleMouseEnter}
      
    >
      <div className="flex items-center justify-center h-10 w-10 min-w-10 bg-maincolor rounded-full">{step.icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{step.title}</h3>
        <p className={`${active === index ? "text-white" : 'text-secondarytext'}`}>{step.desc}</p>
      </div>
    </div>
  );
}