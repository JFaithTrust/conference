import { IconType } from "react-icons";

export interface DropdownItem {
  title: string;
  action: () => void;
}

export interface OptionProps {
  Icon: IconType;
  title: string;
  selected: string;
  setSelected: (title: string) => void;
  open: boolean;
  onDropdownToggle: () => void;
  pathName: string;
  dropdownItems?: DropdownItem[];
}