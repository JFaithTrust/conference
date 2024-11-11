"use client";

import { useCallback } from "react";

import { LoginForm } from "@/components/forms";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useForgotPasswordModal from "@/hook/useForgotPasswordModal";
import useLoginModal from "@/hook/useLoginModal";
import useRegisterModal from "@/hook/useRegisterModal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const forgotPasswordModal = useForgotPasswordModal();
  const registerModal = useRegisterModal();

  const onToggleRegister = useCallback(() => {
    loginModal.onClose();
    forgotPasswordModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal, forgotPasswordModal]);

  const onToggleForgot = useCallback(() => {
    loginModal.onClose();
    registerModal.onClose();
    forgotPasswordModal.onOpen();
  }, [loginModal, registerModal, forgotPasswordModal]);

  return (
    <Dialog open={loginModal.isOpen} onOpenChange={loginModal.onClose}>
      <DialogContent
        aria-describedby={undefined}
        className="w-full max-w-[450px]  !bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center p-8 md:p-10 lg:p-12"
      >
        <DialogHeader>
          <DialogTitle className="text-center  text-2xl font-medium text-primary-500 md:text-3xl">
            Kirish
          </DialogTitle>
        </DialogHeader>
        <LoginForm />
        <DialogFooter className="">
          <div className="mb-4 flex w-full flex-col items-center justify-center gap-2 text-sm text-primary/70 sm:mb-0">
            <p>
              Menda akkaunt mavjud emas
              <span
                className="ml-3 cursor-pointer text-primary underline hover:no-underline"
                onClick={onToggleRegister}
              >
                Ro&apos;yxatdan o&apos;tish
              </span>
            </p>
          </div>
          <div className=" flex w-full flex-col items-center justify-center gap-2 text-sm text-primary/70">
            <p>
              Parolni unutdingizmi?
              <span
                className="ml-3 cursor-pointer text-primary underline hover:no-underline"
                onClick={onToggleForgot}
              >
                Parolni tiklash
              </span>
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
