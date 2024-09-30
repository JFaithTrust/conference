"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavItems from "./nav-items";
import MobileNav from "./mobile-nav";
import Register from "./register";
import { Login } from "./login";
import useRegisterModal from "@/hook/useRegisterModal";
import useLoginModal from "@/hook/useLoginModal";
export const Header = () => {
  const { onOpen } = useLoginModal();
  const registerModal = useRegisterModal();
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
            <div onClick={() => registerModal?.onOpen()}>
              <Register situation="button" />
            </div>
            <div onClick={() => onOpen()}>
              <Login situation="button" />
            </div>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
