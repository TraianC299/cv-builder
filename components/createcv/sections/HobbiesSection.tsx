import { AutoHeightTextarea } from "@/components/ui/auto-height-textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import Section from '../Section';

const HobbiesSection = () => {
    const { t } = useTranslation(["create-cv", "common"]);
    const { cvObject, changeCvStringProperty } = useCV();
    return (
        <Section title={t("hobbies")}>
            <Field>
                <FieldLabel>{t("what-do-you-like")}</FieldLabel>
                <AutoHeightTextarea
                    value={cvObject?.hobbies}
                    onChange={(v) => {
                        changeCvStringProperty("hobbies", v.target.value);
                    }}
                ></AutoHeightTextarea>
            </Field>
        </Section>
    )
}

export default HobbiesSection