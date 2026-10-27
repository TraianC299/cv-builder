import type { ReactNode } from "react";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineDragIndicator } from "react-icons/md";
import Collapse from "../ui/utilities/Collapse";
import DropdownButton from "../ui/utilities/DropdownButton";

const CollapseItem = ({
  children,
  title,
  open,
  setOpen,
  onDelete,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  onDelete?: Function;
}) => {
  return (
    <li className="group relative flex w-full items-center gap-4 border-b border-lightgrey p-2">
      <button type="button" className="handle cursor-grab active:cursor-grabbing">
        <MdOutlineDragIndicator />
      </button>
      <div className="flex-1 p-2">
        <div
          onClick={() => setOpen(!open)}
          className="flex justify-between items-center cursor-pointer"
        >
          <p className="text-base font-medium transition-colors group-hover:text-maincolor">{title}</p>
          <DropdownButton open={open} />
        </div>
        <Collapse on={open}>
          <div className="mt-2 w-full">{children}</div>
        </Collapse>
      </div>
      {onDelete && (
        <button
          className="delete cursor-pointer"
          type="button"
          onClick={() => onDelete()}
        >
          <FiTrash2 className="p text-red" />
        </button>
      )}
    </li>
  );
};

export default CollapseItem;
