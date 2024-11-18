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
          "rounded-md border-2 border-primary  bg-white  px-2 py-1 md:block lg:px-2",
          // "hidden text-base font-medium text-primary md:block"
        )}
      >
        Ro&apos;yxatdan o&apos;tish
      </button>
      <button
        className={clsx(
          "rounded-md border-2 border-primary bg-primary  px-2 py-[2px] text-white md:block md:py-1",
          // "text-base font-medium text-primary"
        )}
        onClick={() => loginModal.onOpen()}
      >
        Kirish
      </button>
    </div>
  );
};

export default AuthButtons;
