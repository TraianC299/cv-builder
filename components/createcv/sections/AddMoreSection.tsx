import { Button } from "@/components/ui/button";
import { INITIAL_CV_VALS } from "@/constants/INITIAL_CV_VALS";
import type { CvListKey } from "@/interfaces/cv.types";
import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import Section from "../Section";


const AddMoreSection = () => {
  const { t } = useTranslation(["create-cv", "common"]);
  const { cvObject, addNewSection } = useCV();

  const isPresent = (key: CvListKey) => {
    return cvObject[key] && cvObject[key].length;
  };

  const missing = Object.keys(INITIAL_CV_VALS).filter(
    (el) => !isPresent(el as CvListKey),
  );

  return missing.length ? (
    <Section title={t("others")}>
      <div className="flex w-full max-w-full gap-4 flex-wrap">
        {missing.map((el) => (
          <Button
            type="button"
            variant={"outline"}
            key={el}
            onClick={() => addNewSection(el as CvListKey)}
          >
            + {t(el)}
          </Button>
        ))}
      </div>
    </Section>
  ) : (
    <></>
  );
};

export default AddMoreSection;
