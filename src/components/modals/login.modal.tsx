"use client";

import useLoginModal from "@/hook/useLoginModal";
import useForgotPasswordModal from "@/hook/useForgotPasswordModal";
import useRegisterModal from "@/hook/useRegisterModal";
import {useCallback} from "react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {LoginForm} from "@/components/forms";

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
                className="max-w-[450px] w-full p-12 !bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center">
                <DialogHeader>
                    <DialogTitle className="font-medium text-3xl text-primary-500 text-center">
                        Kirish
                    </DialogTitle>
                </DialogHeader>
                <LoginForm/>
                <DialogFooter>
                    <div
                        className="mb-4 text-sm text-primary/70 flex flex-col gap-2 justify-center items-center w-full">
                        <p>
                            Menda akkaunt mavjud emas
                            <span
                                className="cursor-pointer underline text-primary hover:no-underline ml-3"
                                onClick={onToggleRegister}
                            >
                                    Ro&apos;yxatdan o&apos;tish
                                </span>
                        </p>
                    </div>
                    <div
                        className="mb-4 text-sm text-primary/70 flex flex-col gap-2 justify-center items-center w-full">
                        <p>
                            Parolni unutdingizmi?
                            <span
                                className="cursor-pointer underline text-primary hover:no-underline ml-3"
                                onClick={onToggleForgot}
                            >
                                    Parolni tiklash
                                </span>
                        </p>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default LoginModal