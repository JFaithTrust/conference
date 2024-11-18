"use client";

import {AlertDialog} from "@radix-ui/react-alert-dialog";
import {toast} from "sonner";

import {useChangeStatus} from "@/hook";
import {deleteDirectionById} from "@/lib/actions/direction.action";
import {changeReviewerToUser, changeUserStatus} from "@/lib/actions/user.action";

import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";

interface ModalProps {
    title: string
    page: "users" | "reviewers" | "fields"
}

const ChangeStatusModal = ({title, page}: ModalProps) => {
    const {isOpen, selectedUserId, onClose} = useChangeStatus();

    const handleConfirm = async () => {
        if (selectedUserId === null) return;
        switch (page) {
            case "users":
                await changeUserStatus(selectedUserId).then((res) =>
                    res === "ok" ? toast.success(`Foydalanuvchi holati o'zgartirildi!`) : toast.error("Xatolik yuz berdi, iltimos qayta urinib ko'ring.")
                );
                break;
            case "reviewers":
                await changeReviewerToUser(selectedUserId).then((res) =>
                    res === "ok" ? toast.success(`Muharrir bo'shatildi!`) : toast.error("Xatolik yuz berdi, iltimos qayta urinib ko'ring.")
                );
                break;
            case "fields":
                await deleteDirectionById(selectedUserId).then((res) =>
                    res === "ok" ? toast.success(`Yo'nalish o'chirildi!`) : toast.error("Xatolik yuz berdi, iltimos qayta urinib ko'ring.")
                );
                break;
            default:
                break;
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent
                className="w-full max-w-[450px] !bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center p-6">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        <p>Agar ishonchingiz komil bo&apos;lmasa bekor qilish tugmasini bosing</p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className={"bg-status-red text-white hover:bg-status-red/80 hover:text-white"}>Bekor
                        qilish</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}
                                       className={"bg-indigo-500 text-white hover:bg-indigo-500/80 hover:text-white"}>Tasdiqlash</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ChangeStatusModal;
