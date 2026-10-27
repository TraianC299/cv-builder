import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import { ReactSortable } from "react-sortablejs";
import InternshipInput from "../inputs/InternshipInput";
import Section from "../Section";

const InternshipsSection = () => {
  const { t } = useTranslation(["create-cv", "common"]);
  const { cvObject, changeListOrder, addNewSection, deleteListItem } = useCV();

  const deleteInternship = (id: string) => {
    deleteListItem('internships', id)
  };
  return (
    <Section
      deletable
      objectKey="internships"
      title={t("internships")}
      onClick={() => addNewSection("internships")}
    >
      <ReactSortable
        className="flex flex-col [&>*:last-child]:border-none"
        list={cvObject.internships}
        setList={(v) => {
          changeListOrder('internships', v)
        }}
        handle=".handle"
      >
        {cvObject?.internships?.map((el) => (
          <InternshipInput
            onDelete={() => deleteInternship(el.id)}
            {...el}
            key={el.id}
          ></InternshipInput>
        ))}
      </ReactSortable>
    </Section>
  );
};

export default InternshipsSection;
