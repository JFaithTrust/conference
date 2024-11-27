"use client";

import { ForgotPasswordForm } from "@/components/forms";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useForgotPasswordModal from "@/hook/useForgotPasswordModal";

import useLoginModal from "../../hook/useLoginModal";
import useRegisterModal from "../../hook/useRegisterModal";

const ForgotPasswordModal = () => {
  const forgotPasswordModal = useForgotPasswordModal();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();


  const onToggleRegister = () => {
    forgotPasswordModal.onClose();
    registerModal.onOpen();
  };

  const onToggleLogin = () => {
    forgotPasswordModal.onClose();
    loginModal.onOpen();
  };


  return (
      <Dialog open={forgotPasswordModal.isOpen} onOpenChange={forgotPasswordModal.onClose}>
        <DialogContent
            aria-describedby={undefined}
            className="w-full max-w-[450px] !bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center p-8 md:p-10 lg:p-12"
        >
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-medium text-primary-500 md:text-3xl">
              Parolni tiklash
            </DialogTitle>
          </DialogHeader>
          <ForgotPasswordForm />
          <div className="mb-4 flex w-full flex-col items-center justify-center gap-2 text-sm text-primary/70">
            <p>
              Yodingizdan chiqdimi?
              <span
                  className="ml-3 cursor-pointer text-primary underline hover:no-underline"
                  onClick={onToggleLogin}
              >
              Kirish
            </span>
            </p>
            <p>
              Akkauntingiz yo&apos;qmi?
              <span
                  className="ml-3 cursor-pointer text-primary underline hover:no-underline"
                  onClick={onToggleRegister}
              >
              Ro&apos;yxatdan o&apos;tish
            </span>
            </p>
          </div>
        </DialogContent>
      </Dialog>
  );
};

export default ForgotPasswordModal;
