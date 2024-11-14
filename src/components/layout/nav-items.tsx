"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { headerLinks } from "@/constants";

const NavItems = () => {
  const pathname = usePathname();

  return (
    <ul className="flex w-full flex-col items-start gap-3 md:flex-row lg:gap-5"> 
      {/* md:flex-between */}
      {headerLinks.map((link, i) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={i}
            className={`${
              isActive && "text-primary-500"
            } whitespace-nowrap text-base font-medium lg:text-lg`}
            // flex-center
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;