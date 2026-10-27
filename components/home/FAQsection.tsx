import H2Tag from "@/components/other/H2Tag";
import SectionWrapper from "@/components/other/SectionWrapper";
import COLORS from "@/constants/COLORS";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { Button } from "../ui/button";
import Collapse from "../ui/utilities/Collapse";


const Question = ({
    question,
    answer,
}: {
    question: string;
    answer: string;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-bordercolor py-4 hover:border-maincolor">
            <div className="flex w-full justify-between items-center">
                <p className="text-base md:text-xl mb-1">{question}</p>
                <div
                    className="cursor-pointer transition"
                    style={{ color: COLORS.MAINCOLOR }}
                    onClick={() => setOpen((prev) => !prev)}
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full border-maincolor"
                    >
                        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>
                </div>
            </div>
            <Collapse on={open}>
                <p className="text-base font-light pt-4">{answer}</p>
            </Collapse>
        </div>
    );
};
const FAQsection = () => {
    const { t } = useTranslation("common");
    return (
        <SectionWrapper className="flex flex-col justify-center items-center gap-8 max-w-4xl">
            <H2Tag>{t("faq")}</H2Tag>
            <div>
                <Question
                    question={t("faq-free-to-use-q")}
                    answer={t("faq-free-to-use-a")}
                ></Question>
                <Question
                    question={t("faq-cutomize-q")}
                    answer={t("faq-cutomize-a")}
                ></Question>
                <Question
                    question={t("faq-download-q")}
                    answer={t("faq-download-a")}
                ></Question>
                <Question
                    question={t("faq-account-q")}
                    answer={t("faq-account-a")}
                ></Question>
                <Question
                    question={t("faq-progress-q")}
                    answer={t("faq-progress-a")}
                ></Question>
            </div>
        </SectionWrapper>
    );
};

export default FAQsection;
