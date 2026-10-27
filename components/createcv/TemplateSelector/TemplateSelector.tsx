import imageZero from "@/assets/images/cv-images/0.png";
import imageOne from "@/assets/images/cv-images/1.png";
import imageTwo from "@/assets/images/cv-images/2.png";
import imageThree from "@/assets/images/cv-images/3.png";
import imageFour from "@/assets/images/cv-images/4.png";
// import imageFive from "@/assets/images/cv-images/5.jpg";
import { Field, FieldLabel } from "@/components/ui/field";
import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import { BiCheckCircle } from "react-icons/bi";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import styles from "./TemplateSelector.module.scss";

const images = [imageZero, imageOne, imageTwo, imageThree, imageFour];
// const featured = images.pop()

const SCROLL_AMOUNT = 200;

const TemplateSelector = () => {
  const { t } = useTranslation(["create-cv", "common"]);
  const { cvObject, changeCvStringProperty } = useCV();
  const ref = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const updateScrollState = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  const scrollLeft = () => ref.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  const scrollRight = () => ref.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });

  return (
    <Field>
      <FieldLabel>{t("template")}</FieldLabel>
      <div className="relative">
        {canScrollLeft && (
          <button type="button" onClick={scrollLeft} className={styles.arrowLeft} aria-label={t("scroll-left")}>
            <MdChevronLeft size={28} />
          </button>
        )}
        <div ref={ref} className={"flex gap-2 bg-lightgrey p-2 rounded-md overflow-x-scroll no-scrollbar"}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative aspect-595/842 flex-1 min-w-28 ${cvObject.template === index ? styles.selected : ""}`}
              onClick={() => changeCvStringProperty("template", index)}
            >
              <Image
                fill
                src={image}
                alt={`template ${index}`}
              ></Image>
              <div className={styles.overlay}>
                <BiCheckCircle color="white" className="h5 shadow-md" />
              </div>
            </div>
          ))}
        </div>
        {canScrollRight && (
          <button type="button" onClick={scrollRight} className={styles.arrowRight} aria-label={t("scroll-right")}>
            <MdChevronRight size={28} />
          </button>
        )}
      </div>
    </Field>
  );
};

export default TemplateSelector;
