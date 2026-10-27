import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import LevelSelector from "@/components/ui/input/LevelSelector";
import LEVELS from "@/constants/LEVELS";
import type { CVLanguageType } from "@/interfaces/cv.types";
import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import CollapseItem from "../CollapseItem";


const LanguageInput = ({ title, metric, edit, id }: CVLanguageType) => {
  const { t } = useTranslation(["create-cv", "common"]);
  const { deleteListItem, changeCvObject } = useCV();

  function changeLanguage(key: string, value: string | boolean | number) {
    changeCvObject(key, value, id, "languages");
  }

  const onDelete = () => {
    deleteListItem("languages", id)
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    changeLanguage(name, value);
  }
  return (
    <CollapseItem
      onDelete={onDelete}
      title={title || t("not-specified")}
      subtitle={metric ? LEVELS[metric] : t("not-specified")}
      open={edit}
      setOpen={(value) => changeLanguage("edit", value)}
    >
      <div className="flex gap-4 flex-col lg:flex-row">
        <Field>
          <FieldLabel>{t("language")}</FieldLabel>
          <Input value={title} name="title" onChange={handleChange} />
        </Field>
        <LevelSelector
          label={t("level")}
          value={metric}
          // name='metric'
          onChange={(v) => changeLanguage("metric", v)}
        />
      </div>
    </CollapseItem>
  );
};

export default LanguageInput;
