import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { CertificationType } from "@/interfaces/cv.types";
import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import CollapseItem from "../CollapseItem";

const CertificationInput = ({
    issuer,
    title,
    id,
    edit,
    expirationDate,
    issueDate,
}: CertificationType) => {
    const { t } = useTranslation(["create-cv", "common"]);
    const { deleteListItem, changeCvObject } = useCV();

    const deleteCertification = () => {
        deleteListItem("certifications", id)
    };

    function changeCV(key: string, value: string | boolean | number) {
        changeCvObject(key, value, id, "certifications");
    }

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        const { name, value } = e.target;
        changeCV(name, value);
    }

    return (
        <CollapseItem
            onDelete={deleteCertification}
            title={issuer ? `${title} - ${issuer}` : t("not-specified")}
            subtitle={expirationDate ? `${t("valid-till")} ${expirationDate}` : t("not-specified")}
            open={edit}
            setOpen={(value) => changeCV("edit", value)}
        >
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <Field>
                        <FieldLabel>{t("title")}</FieldLabel>
                        <Input value={title} name="title" onChange={handleChange} />
                    </Field>
                    <Field>
                        <FieldLabel>{t("issuer")}</FieldLabel>
                        <Input value={issuer} name="issuer" onChange={handleChange} />
                    </Field>
                </div>
                <div className="flex gap-4">
                    <div className="flex gap-4 w-full">
                        <Field>
                            <FieldLabel>{t("issue-date")}</FieldLabel>
                            <Input
                                value={issueDate ?? ""}
                                name="issueDate"
                                onChange={handleChange}
                            ></Input>
                        </Field>
                        <Field>
                            <FieldLabel>{t("expiration-date")}</FieldLabel>
                            <Input
                                value={expirationDate ?? ""}
                                name="expirationDate"
                                onChange={handleChange}
                            ></Input>
                        </Field>
                    </div>
                    {/* <Field>
                        <FieldLabel>{t("city")}</FieldLabel>

                        <Input value={city} name="city" onChange={handleChange}></Input>
                    </Field> */}
                </div>
                {/* <Field>
                    <FieldLabel>{t("description")}</FieldLabel>
                    <Textarea
                        onChange={handleChange}
                        value={description}
                        name={"description"}
                    ></Textarea>
                </Field> */}
            </div>
        </CollapseItem>
    );
};

export default CertificationInput;
