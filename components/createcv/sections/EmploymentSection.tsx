import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import { ReactSortable } from "react-sortablejs";
import EmploymentInput from "../inputs/EmploymentInput";
import Section from "../Section";
const EmploymentSection = () => {
  const { cvObject, changeListOrder, addNewSection } = useCV();
  const { t } = useTranslation(["create-cv", "common"]);

  return (
    <Section
      deletable
      objectKey="employment"
      title={t("employment")}
      onClick={() => addNewSection("employment")}
    >
      <ReactSortable
        className="flex flex-col [&>*:last-child]:border-none"
        list={cvObject.employment}
        setList={(v) => { changeListOrder('employment', v) }}
        handle=".handle"
      >
        {cvObject?.employment?.map((el) => (
          <EmploymentInput key={el.id} {...el} edit={el.edit}></EmploymentInput>
        ))}
      </ReactSortable>
    </Section>
  );
};

export default EmploymentSection;
