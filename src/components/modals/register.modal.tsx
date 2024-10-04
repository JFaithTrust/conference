"use client";

import useLoginModal from "@/hook/useLoginModal";
import useForgotPasswordModal from "@/hook/useForgotPasswordModal";
import useRegisterModal from "@/hook/useRegisterModal";
import {useCallback} from "react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {RegisterForm} from "@/components/forms";

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const forgotPasswordModal = useForgotPasswordModal();
    const registerModal = useRegisterModal();

    const onToggleLogin = useCallback(() => {
        registerModal.onClose();
        forgotPasswordModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal, forgotPasswordModal]);

    const onToggleForgot = useCallback(() => {
        loginModal.onClose();
        registerModal.onClose();
        forgotPasswordModal.onOpen();
    }, [loginModal, registerModal, forgotPasswordModal]);


    return (
        <Dialog open={registerModal.isOpen} onOpenChange={registerModal.onClose}>
            <DialogContent
                aria-describedby={undefined}
                className="max-w-[450px] w-full p-12 !bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center">
                <DialogHeader>
                    <DialogTitle className="font-medium text-3xl text-primary-500 text-center">
                        Ro&apos;yxatdan o&apos;tish
                    </DialogTitle>
                </DialogHeader>
                <RegisterForm />
                <DialogFooter>
                    <div className="mb-4 text-sm text-primary/70 flex flex-col gap-2 justify-center items-center w-full">
                        <p>
                            Menda allaqachon akkaunt mavjud
                            <span
                                className="cursor-pointer underline text-primary hover:no-underline ml-3"
                                onClick={onToggleLogin}
                            >
                                    Kirish
                                </span>
                        </p>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default RegisterModal