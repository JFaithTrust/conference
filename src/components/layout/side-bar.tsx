import React, { useState } from "react";
import { motion } from "framer-motion";
import TitleSection from "@/components/shared/title-section";
import Option from "@/components/shared/option";
import ToggleClose from "@/components/shared/toggle-close";
import { SidebarProps, options } from "@/types/side-bar-types";
import { usePathname } from "next/navigation";

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>("Dashboard");

  const pathname = usePathname();
  const selectedOption = options.find((option) => option.pathName === pathname)?.title || "Dashboard";

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  const handleToggleClose = () => {
    setOpen((prev) => !prev);
    
    if (open) {
      setOpenDropdown(null);
    }
  };

  return (
    <motion.nav
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.125 }}
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2 overflow-y-auto"
      style={{ width: open ? "225px" : "fit-content" }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        {options.map((option) => (
          <div key={option.title}>
            <Option
              Icon={option.Icon}
              title={option.title}
              selected={selectedOption}
              setSelected={(title) => {
                setSelected(title);
                if (option.dropdownItems) {
                  toggleDropdown(title);
                }
              }}
              open={open}
              onDropdownToggle={() => {
                if (option.dropdownItems) {
                  toggleDropdown(option.title);
                }
              }}
              pathName={option.pathName} // Ensure pathname is passed to Option
            />
            {option.dropdownItems && openDropdown === option.title && (
              <div className="pl-8 mt-1 space-y-1">
                {option.dropdownItems.map((item) => (
                  <motion.button
                    key={item.title}
                    onClick={item.action}
                    className="w-full text-left px-2 py-1 text-sm bg-myindigo text-blue-50 hover:text-gray-900 rounded-md transition-colors duration-150 ease-in-out"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.title}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <ToggleClose open={open} setOpen={handleToggleClose} />
    </motion.nav>
  );
};

export default Sidebar;