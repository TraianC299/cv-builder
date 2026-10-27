import logoSvg from "@/assets/svg/logo.svg";
import COLORS from "@/constants/COLORS";
import LANG_ICONS from "@/constants/LANG_ICONS";
import LANGUAGES from "@/constants/LANGUAGES";
import useRewrites from "@/hooks/useRewrites";
import { MenuSquareIcon, X } from "lucide-react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import Collapse from "../ui/utilities/Collapse";
import DropdownButton from "../ui/utilities/DropdownButton";

const PhoneNav = () => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const router = useRouter();
  const { t } = useTranslation("common");


  useEffect(() => {
    if (openMenu) {
      setOpenMenu((previous) => !previous);
    }
  }, [router.asPath]);

  return (
    <header className="w-full sticky flex items-center justify-center bg-white top-0 z-50 border-b border-bordercolor lg:hidden mb-4">
      <nav
        id="header"
        className={"w-full max-w-[1400px] bg-white p-4"}
      >
        <div className="mx-auto flex w-full items-center justify-between">
          <Link
            href="/"
            id="logo"
            className="flex items-center justify-center"
          >
            <Image src={logoSvg} alt="Logo" className="h-8 w-auto" />
          </Link>
          <Button
            onClick={() => setOpenMenu((previous) => !previous)}
            className="flex items-center justify-center gap-2 leading-none"
          >
            <MenuSquareIcon />
            {/* <Image height={20} alt="menu button icon" src={menuSvg} /> */}
            <p className="leading-none mt-px">{t("menu")}</p>
          </Button>
          <MobileMenuModal
            open={openMenu}
            setOpen={setOpenMenu}
          ></MobileMenuModal>
        </div>
      </nav>
    </header>
  );
};

interface MobileMenuModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenuModal: React.FC<MobileMenuModalProps> = ({ open, setOpen }) => {
  const [openServices, setOpenServices] = React.useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const { rewrite, rewriteLocalized, rewriteQuery } = useRewrites();

  return (
    <div
      className={`fixed left-0 top-0 z-2 flex h-full w-full flex-col items-center justify-start transition ${open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      style={{
        background: COLORS.MAINCOLOR,
        opacity: open ? 1 : 0,
        transform: `translateY(${open ? 0 : "-2rem"})`,
      }}
    >
      <div className="flex w-full items-center justify-between bg-transparent p-4">
        <Link
          aria-label={t('home')}
          href="/"
          id="logo"
          className="flex items-center justify-center"
        ></Link>
        <Button
          onClick={() => setOpen((previous) => !previous)}
          className="flex items-center justify-center gap-2"
          style={{
            background: "white",
            color: COLORS.BLACKGREY,
          }}
        >
          {t("close")}
          <X className="text-lg" />
        </Button>
      </div>
      <nav className="flex w-full flex-col items-start justify-start gap-4 p-4">
        <div className="flex w-full flex-col border-b border-white pb-4">
          <Link
            href={rewrite("/create-cv")}
            className="main-title flex items-center justify-between text-2xl font-medium text-white"
          >
            {t("create-your-cv")}
          </Link>
        </div>
        <div className="flex w-full flex-col border-b border-white pb-4">
          <Link
            href={rewrite("/about-us")}
            className="main-title flex items-center justify-between text-2xl font-medium text-white"
          >
            {t("about-us")}
          </Link>
        </div>
        <div className="flex w-full flex-col border-b border-white pb-4">
          <Link
            href={rewrite("/blog")}
            className="main-title flex items-center justify-between text-2xl font-medium text-white"
          >
            {t("blog")}
          </Link>
        </div>
        <div className="flex w-full flex-col border-b border-white pb-4">
          <Link
            href="https://buymeacoffee.com/resumelio"
            className="main-title flex items-center gap-4 text-2xl font-medium text-amber-400"
          >
            {t("support-resumelio")}
          </Link>
        </div>
        <div
          className="flex w-full flex-col border-b border-white pb-4"
          onClick={() => setOpenServices((previous) => !previous)}
        >
          <div className="main-title flex items-center justify-between text-2xl font-medium text-white">
            {t("language")}
            <DropdownButton open={openServices} />
          </div>
          <Collapse on={openServices}>
            <div className="mt-2 flex flex-col gap-4 pl-4">
              {LANGUAGES.map((el) => {
                return (
                  <Link
                    className="flex gap-2 text-white"
                    as={rewriteLocalized(router.asPath, el.locale)}
                    href={rewriteQuery(router.query, el.locale)}
                    locale={el.locale}
                    key={el.locale}
                  >
                    <Image
                      src={LANG_ICONS[el.locale]}
                      alt={`${t(el.translationKey)} flag`}
                      width={16}
                      height={16}
                    />
                    {t(el.translationKey)}
                  </Link>
                );
              })}
            </div>
          </Collapse>
        </div>
      </nav>
    </div>
  );
};

export default PhoneNav;
