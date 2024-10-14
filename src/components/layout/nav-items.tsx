"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start lg:gap-5 gap-3 md:flex-row">
      {headerLinks.map((link, i) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={i}
            className={`${
              isActive && "text-primary-500"
            } flex-center font-medium lg:text-lg text-base whitespace-nowrap`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
