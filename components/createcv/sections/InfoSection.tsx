import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import React from "react";
import ButtonInputImage from "../../ui/input/ButtonImageInput";
import Section from "../Section";

const InfoSection = () => {
  const {
    cvObject,
    changeCvStringProperty
  } = useCV();
  const { t } = useTranslation(["create-cv", "common"]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    changeCvStringProperty(name, value)
  }

  function handleImageChange(image: string) {
    changeCvStringProperty("profileImage", image)
  }
  return (
    <Section title={t("personal-info")}>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center items-center gap-4">
          <Field>
            <FieldLabel>{t("job-title")}</FieldLabel>
            <Input
              value={cvObject.jobTitle}
              name="jobTitle"
              onChange={handleChange}
              placeholder="eg. Teacher"
            ></Input>
          </Field>
          <ButtonInputImage
            image={cvObject.profileImage}
            setImage={handleImageChange}
            label={t("your-photo")}
          ></ButtonInputImage>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Field>
            <FieldLabel>{t("first-name")}</FieldLabel>

            <Input
              value={cvObject.name}
              name="name"
              onChange={handleChange}
              placeholder="eg. Doe"
            ></Input>
          </Field>
          <Field>
            <FieldLabel>{t("last-name")}</FieldLabel>
            <Input
              value={cvObject.surname}
              name="surname"
              onChange={handleChange}
              placeholder="eg. John"
            ></Input>
          </Field>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Field>
            <FieldLabel>{t("email")}</FieldLabel>
            <Input
              value={cvObject.email}
              name="email"
              onChange={handleChange}
              placeholder="eg. johndoe@gmail.com"
            ></Input>
          </Field>
          <Field>
            <FieldLabel>{t("phone")}</FieldLabel>
            <Input
              value={cvObject.phone}
              name="phone"
              onChange={handleChange}
              placeholder="eg. +48 123 456 789"
            ></Input>
          </Field>
        </div>
        <div className="flex justify-center items-center gap-4">
          <Field>
            <FieldLabel>{t("country")}</FieldLabel>
            <Input
              value={cvObject.country}
              name="country"
              onChange={handleChange}
              placeholder="eg. Poland"
            ></Input>
          </Field>
          <Field>
            <FieldLabel>{t("city")}</FieldLabel>
            <Input
              value={cvObject.city}
              name="city"
              onChange={handleChange}
              placeholder="eg. Warsaw"
            ></Input>
          </Field>

        </div>
        <div>
          <Field>
            <FieldLabel>{t("date-of-birth")}</FieldLabel>
            <Input
              value={cvObject.dateOfBirth}
              name="dateOfBirth"
              onChange={handleChange}
            ></Input>
          </Field>
        </div>
      </div>
    </Section>
  );
};

export default InfoSection;
