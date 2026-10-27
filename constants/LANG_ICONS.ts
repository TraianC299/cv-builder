import deFlag from "@/assets/svg/deFlagSvg.svg";
import usFlag from "@/assets/svg/enFlagSvg.svg";
import esFlag from "@/assets/svg/esFlagSvg.svg";
import frFlag from "@/assets/svg/frFlagSvg.svg";
import itFlag from "@/assets/svg/itFlagSvg.svg";
import plFlag from "@/assets/svg/plFlagSvg.svg";
import ptFlag from "@/assets/svg/ptFlagSvg.svg";
import roFlag from "@/assets/svg/roFlagSvg.svg";
import ruFlag from "@/assets/svg/ruFlagSvg.svg";
import type { LanguageType } from "@/interfaces/lang.types";
const LANG_ICONS: Record<LanguageType, any> = {
    ro: roFlag,
    en: usFlag,
    de: deFlag,
    fr: frFlag,
    es: esFlag,
    pt: ptFlag,
    pl: plFlag,
    it: itFlag,
    ru: ruFlag,
};

export default LANG_ICONS
