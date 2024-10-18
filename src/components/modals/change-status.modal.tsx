"use client";

import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import { useChangeStatus } from "@/hook";
import { changeUserStatus } from "@/lib/actions/user.action";
import { toast } from "sonner";

const ChangeStatusModal = () => {
    const { isOpen, selectedUserId, nextStatus, onClose } = useChangeStatus();

    const handleConfirm = async () => {
        if (selectedUserId === null || nextStatus === null) return;

        try {
            await changeUserStatus(selectedUserId, nextStatus === "ACTIVE");
            toast.success(`Foydalanuvchi holati o'zgartirildi!`);
            onClose();
        } catch (error) {
            toast.error("Xatolik yuz berdi, iltimos qayta urinib ko'ring.");
            console.log(error);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-[450px] w-full p-8 md:p-10 lg:p-12 !bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {nextStatus && selectedUserId !== null
                            ? `This will make the user ${nextStatus.toLowerCase()}. Are you sure?`
                            : "Are you sure you want to perform this action?"}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ChangeStatusModal;
