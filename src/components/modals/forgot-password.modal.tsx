"use client";

import useForgotPasswordModal from "@/hook/useForgotPasswordModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ForgotPasswordForm } from "@/components/forms";

const ForgotPasswordModal = () => {
  const forgotPasswordModal = useForgotPasswordModal();

  return (
    <Dialog
      open={forgotPasswordModal.isOpen}
      onOpenChange={forgotPasswordModal.onClose}
    >
      <DialogContent
        aria-describedby={undefined}
        className="max-w-[450px] w-full p-8 md:p-10 lg:p-12 !bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center"
      >
        <DialogHeader>
          <DialogTitle className="font-medium text-2xl md:text-3xl text-primary-500 text-center">
            Parolni tiklash
          </DialogTitle>
        </DialogHeader>
        <ForgotPasswordForm />
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
