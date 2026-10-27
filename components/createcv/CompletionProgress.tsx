import { calculateProgress } from "@/lib/calculateProgress";
import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";

const CompletionProgress = () => {

  const { cvObject } = useCV();
  const progress = useMemo(() => calculateProgress(cvObject), [cvObject])
  const { t } = useTranslation(["create-cv", "common"]);
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p>{t("profile-completion")}</p>
        <div className="relative w-fit bg-maincolor text-white px-2 py-2 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[10px] after:border-transparent after:border-t-maincolor">
          {progress}%
        </div>
      </div>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default CompletionProgress;

interface ProgressBarProps {
  progress: number;
}
const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-full h-2 bg-lightgrey relative overflow-hidden">
      <div
        className="absolute h-full bg-maincolor transition-[width] duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
