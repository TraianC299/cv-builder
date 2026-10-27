import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { EmploymentType } from "@/interfaces/cv.types";
import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import CollapseItem from "../CollapseItem";

const EmploymentInput = ({
  title,
  employer,
  city,
  description,
  edit,
  startDate,
  endDate,
  id,
}: EmploymentType) => {
  const { changeCvObject, deleteListItem } = useCV();
  const { t } = useTranslation(["create-cv", "common"]);

  function changeSkills(key: string, value: string | boolean | number) {
    changeCvObject(key, value, id, "employment");
  }

  const deleteEmployment = () => {
    deleteListItem("employment", id)
  };

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    changeSkills(name, value);
  }

  return (
    <CollapseItem
      onDelete={deleteEmployment}
      title={title || t("not-specified")}
      subtitle={employer || t("not-specified")}
      open={edit}
      setOpen={(value) => changeSkills("edit", value)}
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Field>
            <FieldLabel>{t("job-title")}</FieldLabel>
            <Input onChange={handleChange} value={title} name={"title"}></Input>
          </Field>
          <Field>
            <FieldLabel>{t("employer")}</FieldLabel>
            <Input
              onChange={handleChange}
              value={employer}
              name={"employer"}
            ></Input>
          </Field>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-4 w-full">
            <Field>
              <FieldLabel>{t("start-date")}</FieldLabel>
              <Input
                onChange={handleChange}
                value={startDate}
                name={"startDate"}
              ></Input>
            </Field>
            <Field>
              <FieldLabel>{t("end-date")}</FieldLabel>
              <Input
                onChange={handleChange}
                value={endDate}
                name={"endDate"}
              ></Input>
            </Field>
          </div>
          <Field>
            <FieldLabel>{t("city")}</FieldLabel>
            <Input onChange={handleChange} value={city} name={"city"}></Input>
          </Field>
        </div>
        <Field>
          <FieldLabel>{t("description")}</FieldLabel>
          <Textarea
            onChange={handleChange}
            value={description}
            name={"description"}
          ></Textarea>
        </Field>
      </div>
    </CollapseItem>
  );
};

export default EmploymentInput;
