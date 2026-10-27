import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import { ReactSortable } from "react-sortablejs";
import LanguageInput from "../inputs/LanguageInput";
import Section from "../Section";

const LanguagesSection = () => {
  const { cvObject, changeListOrder, addNewSection } = useCV();
  const { t } = useTranslation(["create-cv", "common"]);

  return (
    <Section
      deletable
      objectKey="languages"
      title={t("languages")}
      onClick={() => addNewSection("languages")}
    >
      <ReactSortable
        className="flex flex-col [&>*:last-child]:border-none"
        list={cvObject.languages}
        setList={(v) => {
          changeListOrder('languages', v)
        }}
        handle=".handle"
      >
        {cvObject.languages &&
          cvObject.languages.map((el) => (
            <LanguageInput
              id={el.id}
              edit={el.edit || false}
              title={el.title}
              metric={el.metric}
              key={el.id}
            ></LanguageInput>
          ))}
      </ReactSortable>
    </Section>
  );
};

export default LanguagesSection;
