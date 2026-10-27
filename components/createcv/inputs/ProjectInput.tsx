import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ProjectType } from "@/interfaces/cv.types";
import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import CollapseItem from "../CollapseItem";

interface InputProps extends ProjectType {
  onDelete?: () => void;
}

const ProjectInput = ({
  title,
  description,
  edit,
  startDate,
  endDate,
  id,
  onDelete,
}: InputProps) => {
  const { t } = useTranslation(["create-cv", "common"]);
  const { changeCvObject } = useCV();

  function changeProject(key: string, value: string | boolean) {
    changeCvObject(key, value, id, "projects");
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    changeProject(name, value);
  }
  return (
    <CollapseItem
      onDelete={onDelete}
      subtitle=""
      title={title || t("not-specified")}
      open={edit}
      setOpen={(value) => changeProject("edit", value)}
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Field>
            <FieldLabel>{t("title")}</FieldLabel>
            <Input value={title} name={"title"} onChange={handleChange}></Input>
          </Field>
        </div>
        <div className="flex gap-4">
          <Field>
            <FieldLabel>{t("start-date")}</FieldLabel>
            <Input
              value={startDate}
              name={"startDate"}
              onChange={handleChange}
            ></Input>
          </Field>
          <Field>
            <FieldLabel>{t("end-date")}</FieldLabel>
            <Input
              value={endDate}
              name={"endDate"}
              onChange={handleChange}
            ></Input>
          </Field>
        </div>
        <Field>
          <FieldLabel>{t("description")}</FieldLabel>
          <Textarea
            value={description}
            name={"description"}
            onChange={handleChange}
          ></Textarea>
        </Field>
      </div>
    </CollapseItem>
  );
};

export default ProjectInput;
