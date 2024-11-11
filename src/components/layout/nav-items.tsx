"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { headerLinks } from "@/constants";

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-3 md:flex-row lg:gap-5">
      {headerLinks.map((link, i) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={i}
            className={`${
              isActive && "text-primary-500"
            } flex-center whitespace-nowrap text-base font-medium lg:text-lg`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
