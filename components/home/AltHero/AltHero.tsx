import H1Tag from "@/components/other/H1Tag";
import SectionSubtitle from "@/components/other/SectionSubtitle";
import { Button } from "@/components/ui/button";
import useRewrites from "@/hooks/useRewrites";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import styles from "./AltHero.module.scss";

const AltHero = () => {
  const { t } = useTranslation();
  const { rewrite } = useRewrites();
  return (
    <div className={styles.container}>
      <div
        className={`${styles.text} w-full h-full flex flex-col items-center justify-center gap-2`}
      >
        <H1Tag className="leading-none md:leading-14">
          {t("hero-landing-title-line-1")}<br />
          {t("hero-landing-title-line-2").split('.').map(el => <p key={el}>{el}</p>)}
        </H1Tag>
        <SectionSubtitle className="font-medium mb-2 text-blackgrey">
          {t("hero-landing-subtitle")}
        </SectionSubtitle>
        <Link href={rewrite("/create-cv")}>
          <Button>{t("create-your-cv")}</Button>
        </Link>
      </div>
      <div className={`absolute -top-1/2 -left-1/2 w-full flex gap-4 rotate-12 ${styles.grid}`}>
        {Array.from({ length: 14 }).map((_, col) => (
          <div
            key={col}
            className={`flex flex-col gap-4${col % 2 === 1 ? " relative -top-[100px]" : ""}`}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={styles.card}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AltHero;
