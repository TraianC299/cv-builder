import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import { ReactSortable } from "react-sortablejs";
import SkillInput from "../inputs/SkillInput";
import Section from "../Section";

const SkillsSection = () => {
  const { cvObject, changeListOrder, addNewSection } = useCV();
  const { t } = useTranslation(["create-cv", "common"]);

  return (
    <Section
      deletable
      objectKey="skills"
      title={t("skills")}
      onClick={() => addNewSection("skills")}
    >
      <ReactSortable
        className="flex flex-col [&>*:last-child]:border-none"
        list={cvObject.skills}
        setList={(v) => {
          changeListOrder('skills', v)
        }}
        handle=".handle"
      >
        {cvObject?.skills?.map((el) => (
          <SkillInput
            key={el.id}
            id={el.id}
            edit={el.edit || false}
            title={el.title}
            metric={el.metric}
          ></SkillInput>
        ))}
      </ReactSortable>
    </Section>
  );
};

export default SkillsSection;
