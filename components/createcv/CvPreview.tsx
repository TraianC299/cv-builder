"use client"
import COLORS from "@/constants/COLORS";
import useLockBody from "@/hooks/useLockBody";
import { exportCvElementToPdf } from "@/lib/cv-export-to-pdf";
import useCV from "@/store/cvStore";
import { Eye, X } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useRef, useState } from "react";
import TemplateZero from "../cv-templates/0";
import TemplateOne from "../cv-templates/1";
import TemplateTwo from "../cv-templates/2";
import TemplateThree from "../cv-templates/3";
import TemplateFour from "../cv-templates/4";
// import TemplateFive from "../cv-templates/5";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import FeedbackModal from "./FeedbackModal";

const templatesArray = [
  <TemplateZero key="0" />,
  <TemplateOne key="1" />,
  <TemplateTwo key="2" />,
  <TemplateThree key="3" />,
  <TemplateFour key="4" />,
  // <TemplateFive key="5" />,
];
const CvPreview = () => {
  const { cvObject } = useCV();
  const [openFeedback, setOpenFeedback] = useState(false)
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(["create-cv", "common"]);
  useLockBody();
  const cvRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    const pagesContainer = document.getElementById("pages-container");
    if (pagesContainer) {
      pagesContainer.classList.remove("gap-4");
    }
    setLoading(true);
    try {
      if (!cvRef.current) return;
      await exportCvElementToPdf(cvRef.current, "cv.pdf");
    } catch (e) {
      console.error(e);
    } finally {
      if (pagesContainer) {
        pagesContainer.classList.add("gap-4");
      }
      setLoading(false);
    }
    setTimeout(() => {

      setOpenFeedback(true)
    }, 5000)
  };

  async function onDownload(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    await generatePDF();
  }

  return (
    <>
      {!openModal && (
        <Button
          className="fixed bottom-4 right-4 lg:hidden"
          onClick={() => setOpenModal(true)}
        >
          Preview
          <Eye color="white" />
        </Button>
      )}
      <div
        className={`relative flex flex-col items-center justify-start overflow-scroll bg-[#F5F5F5] py-4 opacity-100 portrait:fixed portrait:inset-0 portrait:h-screen portrait:w-screen portrait: overflow-x-hidden ${openModal ? "portrait:z-100" : "portrait:opacity-0 portrait:pointer-events-none portrait:invisible"
          }`}
      >
        <FeedbackModal open={openFeedback} setOpen={setOpenFeedback} />
        <Button
          size={"icon"}
          variant={'secondary'}
          className="self-end items-center sm:hidden mr-4 mb-4"
          onClick={() => setOpenModal(false)}
        >
          <X />
        </Button>
        <div
          ref={cvRef}
        >
          {templatesArray[cvObject.template]}
        </div>
        <Button
          className="flex gap-2 justify-center items-center fixed right-4 bottom-4"
          style={{ boxShadow: `0 10px 15px ${COLORS.MAINCOLOR}50` }}
          disabled={loading}
          aria-label={t("download-pdf")}
          onClick={onDownload}
        >
          {loading && <Spinner color="white"></Spinner>}
          {t("download-pdf")}
        </Button>
      </div>
    </>
  );
};

export default CvPreview;
