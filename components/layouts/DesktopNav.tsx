import buyMeACoffee from "@/assets/svg/bmc-brand-icon.svg";
import logoSvg from "@/assets/svg/logo.svg";
import LANG_ICONS from "@/constants/LANG_ICONS";
import LANGUAGES from "@/constants/LANGUAGES";
import useRewrites from "@/hooks/useRewrites";
import type { LanguageType } from "@/interfaces/lang.types";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const DektopNav = () => {
  const { t } = useTranslation("common");
  const { rewrite } = useRewrites();

  return (
    <header
      id="header"
      className="hidden mx-auto w-full max-w-[1400px] items-center justify-between bg-white p-4 lg:flex"
    >
      <Link
        href="/"
        id="logo"
        className="flex w-40 items-center justify-center text-[1.2rem] font-semibold"
      >
        <Image src={logoSvg} alt="Logo" className="h-auto w-full" />
      </Link>
      <nav
        aria-label="Desktop navigation links container"
        className="w-full items-center justify-start lg:landscape:ml-12 lg:landscape:mx-auto lg:landscape:flex"
      >
        <div className="flex items-center justify-center gap-8">
          <DesktopMenuItem link={"/about-us"}>
            {t("about-us")}
          </DesktopMenuItem>
          <DesktopMenuItem link="/blog">{t("blog")}</DesktopMenuItem>
          <DesktopMenuItem link="/contact">{t("contact")}</DesktopMenuItem>
          <Link href="https://buymeacoffee.com/resumelio">
            <div className="flex justify-start items-center gap-2 bg-amber-400 p-1 rounded-full">

              <div className="relative p-1 h-6 w-6 bg-white rounded-full">
                <Image alt="buy me a coffe logo" src={buyMeACoffee} className="h-4 w-4" />
              </div>
              <p className="text-xs mr-1 text-black font-semibold">{t("support-resumelio")}</p>
            </div>
          </Link>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center justify-center gap-4">
          <DesktopLanguageSelector />
          <Link href={rewrite("/create-cv")}>
            <Button>{t("start-now")}</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

type DesktopMenuItemProps = {
  children: ReactNode;
  link: string;
};

const DesktopLanguageSelector = () => {
  const { t } = useTranslation("common");

  const router = useRouter();
  const { rewriteLocalized } = useRewrites();
  const onChange = async (v: LanguageType) => {
    await router.push(
      rewriteLocalized(router.asPath, v),
      rewriteLocalized(router.asPath, v),
      {
        locale: v,
      },
    );
  };
  return (
    <Field className="min-w-32">
      <Select
        value={router.locale}
        onValueChange={onChange}
      >
        <SelectTrigger>
          <SelectValue placeholder={t("language")} />
        </SelectTrigger>
        <SelectContent>
          {LANGUAGES.map((el) => (
            <SelectItem key={el.locale} value={el.locale}>
              <div className="flex items-center gap-2">
                <Image
                  src={LANG_ICONS[el.locale as LanguageType]}
                  alt={`${el.locale.toUpperCase()} flag`}
                  width={16}
                  height={16}
                />
                {t(el.translationKey, { ns: "common" })}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
    // <ButtonGroup className="rounded-full border border-transparent">
    //   {LANGUAGES.map((el) => {
    //     const isActive = router.locale === el.locale;
    //     const label = el.locale.toUpperCase();
    //     return (
    //       <Button
    //         key={el.locale}
    //         type="button"
    //         size={"default"}
    //         variant="outline"
    //         onClick={() => onChange(el.locale)}
    //         style={{
    //           borderColor: isActive ? COLORS.MAINCOLOR : COLORS.BORDERCOLOR,
    //           color: isActive ? COLORS.WHITE : COLORS.BLACKGREY,
    //           backgroundColor: isActive ? COLORS.MAINCOLOR : COLORS.WHITE,
    //         }}
    //       >
    //         <Image
    //           src={LANG_ICONS[el.locale as LanguageType]}
    //           alt={`${label} flag`}
    //           width={16}
    //           height={16}
    //         />
    //         {label}
    //       </Button>
    //     );
    //   })}
    // </ButtonGroup>
  );
};

const DesktopMenuItem: React.FC<DesktopMenuItemProps> = ({
  children,
  link,
}) => {
  const router = useRouter();
  const { rewrite } = useRewrites();
  return (
    <Link
      href={rewrite(link)}
      className={`text-sm font-medium ${router.route === link ? "text-maincolor" : "text-grey"}`}
    >
      {children}
    </Link>
  );
};

export default DektopNav;
