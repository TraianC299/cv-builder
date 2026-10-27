import type { LanguageType } from "@/interfaces/lang.types";

const LANGUAGES: {
  locale: LanguageType;
  label: string;
  translationKey: string;
}[] = [
    {
      locale: "en",
      label: "English",
      translationKey: "english",
    },
    {
      locale: "es",
      label: "Español",
      translationKey: "spanish",
    },
    {
      locale: "fr",
      label: "Français",
      translationKey: "french",
    },
    {
      locale: "de",
      label: "Deutsch",
      translationKey: "german",
    },
    {
      locale: "ro",
      label: "Română",
      translationKey: "romanian",
    },
    {
      locale: "pl",
      label: "Polski",
      translationKey: "polish",
    },
    {
      locale: "pt",
      label: "Português",
      translationKey: "portuguese",
    },
    {
      locale: "it",
      label: "Italiano",
      translationKey: "italian",
    },
    {
      locale: "ru",
      label: "Русский",
      translationKey: "russian",
    },
  ];

export default LANGUAGES;
