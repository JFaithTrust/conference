"use client";

import { ForgotPasswordForm } from "@/components/forms";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useForgotPasswordModal from "@/hook/useForgotPasswordModal";

const ForgotPasswordModal = () => {
  const forgotPasswordModal = useForgotPasswordModal();

  return (
    <Dialog
      open={forgotPasswordModal.isOpen}
      onOpenChange={forgotPasswordModal.onClose}
    >
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
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
