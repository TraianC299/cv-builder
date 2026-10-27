import { Check, Plus } from "lucide-react";
import { useTranslation } from "next-i18next";
import { Button } from "../button";
import { Field, FieldLabel } from "../field";
import ImageInput from "./ImageInput";

type ButtonInputImageProps = {
  image: string;
  setImage: (image: string) => void;
  [key: string]: any;
};
const ButtonInputImage = ({
  image,
  setImage,
  ...props
}: ButtonInputImageProps) => {
  const { t } = useTranslation(["create-cv", "common"]);

  return (
    <ImageInput resize={200} imageUrl={image} setImageUrl={setImage} {...props}>
      <Field>
        <FieldLabel>{t("your-photo")}</FieldLabel>
        <Button
          className={image ? "bg-green-400 hover:bg-green-500" : ""}
          variant={image ? "secondary" : "default"}
          type="button"
        >
          {image && <Check className="text-2xl text-white" />}
          {!image && <Plus className="text-2xl" />}
        </Button>
      </Field>
    </ImageInput>
  );
};

export default ButtonInputImage;
