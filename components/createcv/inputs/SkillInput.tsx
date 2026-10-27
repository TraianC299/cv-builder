import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import LevelSelector from "@/components/ui/input/LevelSelector";
import LEVELS from "@/constants/LEVELS";
import type { SkillType } from "@/interfaces/cv.types";
import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import CollapseItem from "../CollapseItem";

const SkillInput = ({ title, metric, edit, id }: SkillType) => {
  const { t } = useTranslation(["create-cv", "common"]);
  const { deleteListItem, changeCvObject } = useCV();

  const onDelete = () => {
    deleteListItem("skills", id)
  };

  function changeSkill(key: string, value: string | boolean | number) {
    changeCvObject(key, value, id, "skills");
  }

  return (
    <CollapseItem
      onDelete={onDelete}
      title={title || t("not-specified")}
      subtitle={metric ? LEVELS[metric] : t("not-specified")}
      open={edit}
      setOpen={(value) => changeSkill("edit", value)}
    >
      <div className="flex-col gap-4 lg:flex-row flex">
        <Field>
          <FieldLabel>{t("skill")}</FieldLabel>
          <Input
            value={title}
            onChange={(e) => changeSkill("title", e.target.value)}
          ></Input>
        </Field>
        <LevelSelector
          label={t("level")}
          value={metric}
          onChange={(v) => changeSkill("metric", v)}
        ></LevelSelector>
      </div>
    </CollapseItem>
  );
};

export default SkillInput;
