import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";
import { FiHome, FiTag, FiShoppingCart, FiBarChart, FiUsers } from "react-icons/fi";


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

export interface SidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface DropdownContentProps {
  children: React.ReactNode;
}


export const options: OptionProps[] = [
  {
    title: "Asosiy sahifa",
    Icon: FiHome,
    selected: "Dashboard",
    setSelected: () => {},
    open: false,
    onDropdownToggle: () => {},
    pathName: "/main",
    dropdownItems: [
      { title: "Home Item 1", action: () => console.log("Home Item 1 clicked") },
      { title: "Home Item 2", action: () => console.log("Home Item 2 clicked") },
    ],
  },
  {
    title: "Konferensiyalar",
    Icon: FiTag,
    selected: "Dashboard",
    setSelected: () => {},
    open: false,
    onDropdownToggle: () => {},
    pathName: "/conferences",
    dropdownItems: [
      { title: "Conference Item 1", action: () => console.log(" Item 1 clicked") },
      { title: "Conference Item 2", action: () => console.log("Item 2 clicked") },
    ],
  },
  {
    title: "Maqolalar",
    Icon: FiShoppingCart,
    selected: "Dashboard",
    setSelected: () => {},
    open: false,
    onDropdownToggle: () => {},
    pathName: "/articles",
    dropdownItems: [
      { title: "Articles Item 1", action: () => console.log("Item 1 clicked") },
      { title: "Articles Item 2", action: () => console.log("Item 2 clicked") },
    ],
  },
  {
    title: "Taqrizchilar",
    Icon: FiBarChart,
    selected: "Dashboard",
    setSelected: () => {},
    open: false,
    onDropdownToggle: () => {},
    pathName: "/reviewers",
    dropdownItems: [
      { title: "ReviewersItem 1", action: () => console.log("Item 1 clicked") },
      { title: "Reviewers Item 2", action: () => console.log("Item 2 clicked") },
    ],
  },
  {
    title: "Foydalanuvchilar",
    Icon: FiUsers,
    selected: "Dashboard",
    setSelected: () => {},
    open: false,
    onDropdownToggle: () => {},
    pathName: "/users",
    dropdownItems: [
      { title: "User Item 1", action: () => console.log("User Item 1 clicked") },
      { title: "User Item 2", action: () => console.log("User Item 2 clicked") },
    ],
  },
];
