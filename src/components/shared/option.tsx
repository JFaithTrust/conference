import React from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface DropdownItem {
  title: string;
  action: () => void;
}

export interface OptionProps {
  Icon: IconType;
  title: string;
  selected: string;
  setSelected: (title: string) => void;
  open: boolean;
  onDropdownToggle?: () => void; 
  pathName: string; 
  dropdownItems?: DropdownItem[];
}

const Option: React.FC<OptionProps> = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  onDropdownToggle,
  pathName,
}) => {
  return (
    <motion.button
      layout
      onClick={() => {
        setSelected(title);
        if (onDropdownToggle) {
          onDropdownToggle();
        }
      }}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${selected === title ? "bg-indigo-100 text-indigo-800" : "text-slate-500 hover:bg-slate-100"}`}
    >
      <motion.div className="grid h-full w-10 place-content-center text-lg">
        <Icon />
      </motion.div>
      {open && (
       <motion.span
       layout
       initial={{ opacity: 0, y: 12 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.125 }}
       className="text-xs font-medium"
     >
          {title}
        </motion.span>
      )}
    </motion.button>
  );
};

export default Option;
