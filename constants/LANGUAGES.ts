import { LanguageType } from "interfaces/lang.types";

const LANGUAGES:{
    locale: LanguageType;
    label: string;
    emoji: string;
    translationKey: string;
}[] = [
    {
        locale: 'en',
        label: 'English',
        emoji: '🇺🇸',
        translationKey: 'english'
    },
    {
        locale: 'ro',
        label: 'Română',
        emoji: '🇷🇴',
        translationKey: 'romanian'
    },
    {
        locale: 'ru',
        label: 'Русский',
        emoji: '🇷🇺',
        translationKey: 'russian'
    },
    {
        locale: 'fr',
        label: 'Français',
        emoji: '🇫🇷',
        translationKey: 'french'
    },
    {
        locale: 'de',
        label: 'Deutsch',
        emoji: '🇩🇪',
        translationKey: 'german'
    }
]


export default LANGUAGES;