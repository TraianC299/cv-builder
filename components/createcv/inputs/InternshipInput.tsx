import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { EmploymentType } from "@/interfaces/cv.types";
import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import CollapseItem from "../CollapseItem";

interface Props extends EmploymentType {
  onDelete?: Function;
  edit: boolean;
  id: string;
  title: string;
  employer: string;
  city: string;
  description: string;
  startDate: string;
  endDate: string;
}

const InternshipInput = ({
  title,
  employer,
  city,
  description,
  edit,
  startDate,
  endDate,
  id,
  onDelete,
}: Props) => {
  const { t } = useTranslation(["create-cv", "common"]);
  const { changeCvObject } = useCV();

  function changeInternship(key: string, value: string | boolean | number) {
    changeCvObject(key, value, id, "internships");
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    changeInternship(name, value);
  }

  return (
    <CollapseItem
      onDelete={onDelete}
      title={title || t("not-specified")}
      subtitle={employer || t("not-specified")}
      open={edit}
      setOpen={(value) => changeInternship("edit", value)}
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Field>
            <FieldLabel>{t("job-title")}</FieldLabel>
            <Input value={title} onChange={handleChange} name="title"></Input>
          </Field>
          <Field>
            <FieldLabel>{t("employer")}</FieldLabel>
            <Input
              value={employer}
              onChange={handleChange}
              name="employer"
            ></Input>
          </Field>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-4 w-full">
            <Field>
              <FieldLabel>{t("start-date")}</FieldLabel>
              <Input
                value={startDate}
                onChange={handleChange}
                name="startDate"
              ></Input>
            </Field>
            <Field>
              <FieldLabel>{t("end-date")}</FieldLabel>
              <Input
                value={endDate}
                onChange={handleChange}
                name="endDate"
              ></Input>
            </Field>
          </div>
          <Field>
            <FieldLabel>{t("city")}</FieldLabel>
            <Input value={city} onChange={handleChange} name="city"></Input>
          </Field>
        </div>
        <Field>
          <FieldLabel>{t("description")}</FieldLabel>
          <Textarea
            value={description}
            onChange={handleChange}
            name="description"
          ></Textarea>
        </Field>
      </div>
    </CollapseItem>
  );
};

export default InternshipInput;
