"use client";

import clsx from "clsx";
import React from "react";
import useLoginModal from "@/hook/useLoginModal";
import useRegisterModal from "@/hook/useRegisterModal";

const AuthButtons = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => registerModal.onOpen()}
        className={clsx(
          // situation === "button" &&
          "py-1 lg:px-2 px-[2px]  md:block  border-[2px] rounded-md border-primary bg-white",
          // situation === "text" && "" +
          "text-base font-medium text-primary hidden md:block"
        )}
      >
        Ro&apos;yxatdan o&apos;tish
      </button>
      <button
        className={clsx(
          // situation === "button" &&
          "md:py-1 py-[2px] px-2  md:block  border-[2px] rounded-md border-primary bg-primary text-white",
          // situation === "text" &&
          "text-base font-medium text-primary"
        )}
        onClick={() => loginModal.onOpen()}
      >
        Login
      </button>
    </div>
  );
};

export default AuthButtons;
