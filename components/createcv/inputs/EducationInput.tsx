import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { EducationType } from "@/interfaces/cv.types";
import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import CollapseItem from "../CollapseItem";

const EducationInput = ({
  school,
  degree,
  city,
  id,
  edit,
  startDate,
  endDate,
}: EducationType) => {
  const { t } = useTranslation(["create-cv", "common"]);
  const { deleteListItem, changeCvObject } = useCV();

  const deleteEducation = () => {
    deleteListItem("education", id)
  };

  function changeCV(key: string, value: string | boolean | number) {
    changeCvObject(key, value, id, "education");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    changeCV(name, value);
  }

  return (
    <CollapseItem
      onDelete={deleteEducation}
      title={school ? `${school} - ${degree}` : t("not-specified")}
      subtitle={startDate ? `${startDate} - ${endDate}` : t("not-specified")}
      open={edit}
      setOpen={(value) => changeCV("edit", value)}
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Field>
            <FieldLabel>{t("school")}</FieldLabel>
            <Input value={school} name="school" onChange={handleChange} />
          </Field>
          <Field>
            <FieldLabel>{t("degree")}</FieldLabel>
            <Input value={degree} name="degree" onChange={handleChange} />
          </Field>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-4 w-full">
            <Field>
              <FieldLabel>{t("start-date")}</FieldLabel>
              <Input
                value={startDate}
                name="startDate"
                onChange={handleChange}
              ></Input>
            </Field>
            <Field>
              <FieldLabel>{t("end-date")}</FieldLabel>
              <Input
                value={endDate}
                name="endDate"
                onChange={handleChange}
              ></Input>
            </Field>
          </div>
          <Field>
            <FieldLabel>{t("city")}</FieldLabel>

            <Input value={city} name="city" onChange={handleChange}></Input>
          </Field>
        </div>
      </div>
    </CollapseItem>
  );
};

export default EducationInput;
