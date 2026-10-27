import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import { ReactSortable } from "react-sortablejs";
import EducationInput from "../inputs/EducationInput";
import Section from "../Section";
const EducationSection = () => {
  const { t } = useTranslation(["create-cv", "common"]);
  const { cvObject, changeListOrder, addNewSection } = useCV();

  return (
    <Section
      deletable
      objectKey="education"
      title={t("education")}
      onClick={() => addNewSection("education")}
    >
      <ReactSortable
        className="flex flex-col [&>*:last-child]:border-none"
        list={cvObject.education}
        setList={(v) => {
          changeListOrder('education', v)
        }}
        handle=".handle"
      >
        {cvObject?.education?.map((el) => (
          <EducationInput key={el.id} {...el}></EducationInput>
        ))}
      </ReactSortable>
    </Section>
  );
};

export default EducationSection;
