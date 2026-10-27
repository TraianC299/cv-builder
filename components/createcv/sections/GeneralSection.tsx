import { Field, FieldLabel } from "@/components/ui/field";
import ColorSelector from "@/components/ui/input/ColorSelector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LANGUAGES from "@/constants/LANGUAGES";
import useRewrites from "@/hooks/useRewrites";
import type { LanguageType } from "@/interfaces/lang.types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Section from "../Section";
import TemplateSelector from "../TemplateSelector/TemplateSelector";

const GeneralSection = () => {
  const { rewrite } = useRewrites();
  const { t } = useTranslation(["create-cv", "common"]);
  const router = useRouter();
  const { locale } = router;

  const onChange = async (v: LanguageType) => {
    await router.push(
      rewrite(router.pathname as LanguageType, v),
      rewrite(router.pathname as LanguageType, v),
      {
        locale: v,
      },
    );
  };
  return (
    <Section title={t("general")}>
      <div className="flex flex-col gap-4">
        <ColorSelector></ColorSelector>
        <Field >
          <FieldLabel>{t("language")}</FieldLabel>
          <Select
            value={locale}
            onValueChange={onChange}
          >
            <SelectTrigger>
              <SelectValue placeholder={t("language")} />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((el) => (
                <SelectItem key={el.locale} value={el.locale}>
                  {t(el.translationKey, { ns: "common" })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <TemplateSelector></TemplateSelector>
      </div>
    </Section>
  );
};

export default GeneralSection;
