"use client";

import { useCallback } from "react";

import { RegisterForm } from "@/components/forms";
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

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const forgotPasswordModal = useForgotPasswordModal();
  const registerModal = useRegisterModal();

  const onToggleLogin = useCallback(() => {
    registerModal.onClose();
    forgotPasswordModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal, forgotPasswordModal]);

  return (
    <Dialog open={registerModal.isOpen} onOpenChange={registerModal.onClose}>
      <DialogContent
        aria-describedby={undefined}
        className="w-full max-w-[450px] !bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center p-8 md:p-10 lg:p-12"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-medium text-primary-500 md:text-3xl">
            Ro&apos;yxatdan o&apos;tish
          </DialogTitle>
        </DialogHeader>
        <RegisterForm />
        <DialogFooter>
          <div className="mb-4 flex w-full flex-col items-center justify-center gap-2 text-sm text-primary/70">
            <p>
              Menda allaqachon akkaunt mavjud
              <span
                className="ml-3 cursor-pointer text-primary underline hover:no-underline"
                onClick={onToggleLogin}
              >
                Kirish
              </span>
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
