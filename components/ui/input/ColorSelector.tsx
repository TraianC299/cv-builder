import COLORS from "@/constants/COLORS";
import useCV from "@/store/cvStore";
import { useTranslation } from "next-i18next";
import { Field, FieldLabel } from "../field";

const availableColors = [
  COLORS.MAINCOLOR,
  "#6f42c1",
  "#dc3545",
  "#fd7e14",
  COLORS.YELLOW,
  COLORS.DARKGREEN,
  COLORS.NAVY,
  "#6c757d",
  "#000000",
];
const ColorSelector = () => {
  const { t } = useTranslation("create-cv");
  const { cvObject, changeCvStringProperty } = useCV();

  function changeColor(color: string) {
    changeCvStringProperty("color", color)
  }
  return (
    <Field>
      <FieldLabel htmlFor="color">{t("color")}</FieldLabel>
      <div className="flex w-full flex-wrap gap-x-2 gap-y-2">
        <div className="bg-lightgrey flex items-center justify-between px-2 gap-2 min-w-32 rounded-full overflow-hidden cursor-pointer flex-1 h-8">
          <span className="text-xs">{t("custom")}</span>
          <div
            className="relative h-5 w-5 min-w-5 overflow-hidden rounded-full border-1"
            style={{ backgroundColor: cvObject.color || 'white' }}
          >
            <input
              id="color"
              name="color"
              className="inset-0 cursor-pointer opacity-0"
              value={cvObject.color ?? ''}
              onChange={(e) => changeColor(e.target.value)}
              type="color"
            />
          </div>
        </div>
        {availableColors.map((el) => (
          <SingleColor
            key={el}
            color={el}
            onClick={() => changeColor(el)}
            selected={cvObject.color === el}
          ></SingleColor>
        ))}
      </div>
    </Field>
  );
};

const SingleColor = ({
  color,
  onClick,
  selected,
}: {
  color: string;
  onClick: () => void;
  selected: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className={`h-8 w-8 cursor-pointer rounded-full transition-transform hover:scale-110 ${selected ? "border-2 border-white outline outline-2 outline-black" : ""}`}
      style={{ backgroundColor: color }}
    ></div>
  );
};

export default ColorSelector;
