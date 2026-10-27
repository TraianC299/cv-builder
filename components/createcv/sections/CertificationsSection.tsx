import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import { ReactSortable } from "react-sortablejs";
import CertificationInput from "../inputs/CertificationInput";
import Section from "../Section";
const CertificationsSection = () => {
  const { cvObject, changeListOrder, addNewSection } = useCV();
  const { t } = useTranslation(["create-cv", "common"]);

  return (
    <Section
      deletable
      objectKey="certifications"
      title={t("certifications")}
      onClick={() => addNewSection("certifications")}
    >
      <ReactSortable
        className="flex flex-col [&>*:last-child]:border-none"
        list={cvObject?.certifications}
        setList={(v) => { changeListOrder('certifications', v) }}
        handle=".handle"
      >
        {cvObject?.certifications?.map((el) => (
          <CertificationInput key={el.id} {...el} edit={el.edit} />
        ))}
      </ReactSortable>
    </Section>
  );
};

export default CertificationsSection;
