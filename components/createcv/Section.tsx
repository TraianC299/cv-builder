import type { CvListKey } from "@/interfaces/cv.types";
import useCV from "@/store/cvStore";
import type { ReactNode } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Button } from "../ui/button";

const Section = ({
  children,
  title,
  subtitle,
  onClick,
  objectKey,
  deletable,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  onClick?: Function;
  objectKey?: CvListKey;
  deletable?: boolean;
}) => {
  const { cvObject, clearCategory } = useCV();

  const isPresent = (key: CvListKey) => {
    return Object.keys(cvObject).includes(key);
  };

  return (
    <section className="border-b p-4 lg:p-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="flex items-center justify-start gap-4 transition">
            {deletable && (
              <Button
                type="button"
                size={"icon"}
                className="bg-red-500"
                onClick={() => clearCategory(objectKey as CvListKey)}
              >
                <FiTrash2 className="text-white" />
              </Button>
            )}
            <h3 className="text-xl font-medium md:text-2xl">{title}</h3>
          </div>
          <p className="text-sm text-grey">
            {subtitle}
          </p>
        </div>
        {onClick && (
          <Button
            size={"icon"}
            disabled={!isPresent(objectKey as CvListKey)}
            onClick={(e) => {
              e.preventDefault();
              onClick();
            }}
          >
            +
          </Button>
        )}
      </div>
      {children}
    </section>
  );
};

export default Section;
