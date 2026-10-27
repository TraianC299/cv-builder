import { AutoHeightTextarea } from "@/components/ui/auto-height-textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import Section from '../Section';

const SummarySection = () => {
    const { t } = useTranslation(["create-cv", "common"]);
    const { cvObject, changeCvStringProperty } = useCV();
    return (
        <Section
            title={t("professional-summary")}
            subtitle={t("professional-summary-subtitle")}
        >
            <Field>
                <FieldLabel>{t("summary")}</FieldLabel>
                <AutoHeightTextarea
                    value={cvObject?.summary}
                    onChange={(v) => {
                        changeCvStringProperty('summary', v.target.value)
                    }}
                ></AutoHeightTextarea>
            </Field>
        </Section>
    )
}

export default SummarySection