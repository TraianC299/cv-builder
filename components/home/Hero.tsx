import useRewrites from "@/hooks/useRewrites";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import H1Tag from "../other/H1Tag";
import SectionSubtitle from "../other/SectionSubtitle";
import { Button } from "../ui/button";
import styles from "./Hero.module.scss";

const Hero = () => {
  const { t } = useTranslation();
  const { rewrite } = useRewrites();
  return (
    <div className={styles.container}>
      <div
        className={`${styles.text} w-full h-full flex flex-col items-start justify-center gap-2 md:items-center`}
      >
        <H1Tag className="leading-none md:leading-14 text-left md:text-center">
          {t("hero-landing-title-line-1")}<br />
          <span className="block text-xl md:text-inherit md:text-3xl">{t("hero-landing-title-line-2")}</span>
        </H1Tag>
        <SectionSubtitle className="font-medium mb-2 text-blackgrey whitespace-pre-line text-left md:text-center">
          {t("hero-landing-subtitle")}
        </SectionSubtitle>
        <Link href={rewrite("/create-cv")}>
          <Button>{t("create-your-cv")}</Button>
        </Link>
      </div>
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className={styles.card}></div>
      ))}
    </div>
  );
};

export default Hero;
