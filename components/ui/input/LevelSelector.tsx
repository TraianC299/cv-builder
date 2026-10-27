import COLORS from "@/constants/COLORS";
import LEVELS from "@/constants/LEVELS";
import React from "react";
import { useTranslation } from "react-i18next";
import { Field, FieldLabel } from "../field";

const values = {
  1: {
    name: LEVELS[1],
    color: COLORS.GREY,
  },
  2: {
    name: LEVELS[2],
    color: COLORS.ORANGE,
  },
  3: {
    name: LEVELS[3],
    color: COLORS.YELLOW,
  },
  4: {
    name: LEVELS[4],
    color: COLORS.GREEN,
  },
  5: {
    name: LEVELS[5],
    color: COLORS.PURPLE,
  },
};



interface LevelSelectorProps {
  value: 1 | 2 | 3 | 4 | 5 | null;
  onChange: (value: 1 | 2 | 3 | 4 | 5) => void;
  label: string;
}
const LevelSelector = ({ value, onChange, label }: LevelSelectorProps) => {
  const { t } = useTranslation("create-cv");

  return (
    <Field>
      <FieldLabel>
        {label}: {t(values[value || 1]?.name) || "..."}
      </FieldLabel>

      <div className="flex rounded-sm w-full relative overflow-hidden bg-lightgrey">
        {Object.keys(values).map((key, index) => {
          return (
            <React.Fragment key={key}>
              {index !== 0 && <div className="w-px h-1/2 bg-bordercolor mt-2 z-99"  ></div>}
              <button
                className="w-9 h-9 bg-lightgrey flex-1 overflow-hidden cursor-pointer hover:bg-bordercolor"

                type="button"
                onClick={() => onChange(Number(key) as 1 | 2 | 3 | 4 | 5)}
              ></button>
            </React.Fragment>
          );
        })}
        {value && (
          <div className="absolute bottom-0 left-0 w-full h-12 pointer-events-none transition"
            style={{
              width: `${value * 20}%`,
              background: `${values[value]?.color || ""}30`,
            }}
          ></div>
        )}
      </div>
    </Field>
  );
};

export default LevelSelector;
