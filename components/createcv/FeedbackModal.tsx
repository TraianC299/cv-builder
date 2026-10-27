import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import COLORS from "@/constants/COLORS"
import { CheckCircle2, Star } from "lucide-react"
import { useTranslation } from "next-i18next"
import type { SetStateAction } from "react"
import { useState } from "react"
import { toast } from "sonner"
import { Textarea } from "../ui/textarea"

const submitContact = async (message: string, score: number) => {
    const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: 'FEEDBACK', score, message }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "");
};
const FeedbackModal = ({
    open, setOpen
}: { open: boolean, setOpen: React.Dispatch<SetStateAction<boolean>> }) => {
    const { t } = useTranslation("create-cv")
    const [score, setScore] = useState(0)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const changeScore = (i: number) => {
        setScore(i)
    }


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            setLoading(true)
            await submitContact(message.trim(), score);
            setScore(0);
            setMessage("");
            toast(t("feedback-toast-success-title"), {
                description: t("feedback-toast-success-description"),
                icon: <CheckCircle2 color={COLORS.GREEN} className="mr-2" />
            })
            setOpen(false)
        } catch {
            toast(t("feedback-toast-error-title"), {
                description: t("feedback-toast-error-description"),
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogContent className="max-w-[calc(100%-1rem)] sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>{t("feedback-modal-title")}</DialogTitle>
                        <DialogDescription>
                            {t("feedback-modal-description")}
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="feedback-review">{t("feedback-review-label")}</Label>
                            <StarReviewInput score={score} changeScore={changeScore} />
                        </Field>
                        <Field>
                            <Label htmlFor="feedback-message">{t("feedback-text-label")}</Label>
                            <Textarea
                                id="feedback-message"
                                minLength={3}
                                required
                                value={message}
                                name="message"
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={t("feedback-text-placeholder")}
                            ></Textarea>
                        </Field>
                    </FieldGroup>
                    <DialogFooter className="flex flex-col flex-col-reverse gap-2 md:flex-row">
                        <DialogClose asChild>
                            <Button variant="outline">{t("feedback-cancel")}</Button>
                        </DialogClose>
                        <Button
                            onClick={handleSubmit}
                            disabled={score === 0 || loading}
                            type="submit">{t("feedback-submit")}</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}


const StarReviewInput = ({ score, changeScore }: {
    score: number, changeScore: (v: number) => void
}) => {
    return (<div id="feedback-review" className="flex gap-2 mt-1">
        {[1, 2, 3, 4, 5].map((nr) => (
            <Star
                key={nr}
                className="cursor-pointer"
                onClick={() => changeScore(nr)}
                fill={score >= nr ? COLORS.YELLOW : COLORS.WHITE} />
        ))}

    </div>)
}

export default FeedbackModal
