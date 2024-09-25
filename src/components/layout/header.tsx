"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavItems from "./nav-items";
import MobileNav from "./mobile-nav";
import Register from "./register";
import { useModal } from "@/hook/useModal";
export const Header = () => {
  const { close, isOpen ,setIsOpen} = useModal();
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between container py-3">
        <Link
          href="/"
          className="flex items-center gap-[2px] md:text-2xl text-lg font-bold md:font-bold"
        >
          <Image src="/logo.svg" alt="logo" width={38} height={38} />
          Konferensiya
        </Link>
        <nav className="md:flex-between md:flex hidden w-full max-w-xs">
          <NavItems />
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Register isOpen={isOpen} open={setIsOpen} />
            <Link
              className="py-1 px-2 md:text-base text-sm font-medium text-white bg-primary rounded-md border-[2px] border-primary "
              href={"#"}
            >
              Login
            </Link>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
