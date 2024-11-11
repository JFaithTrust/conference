"use client";

import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { toast } from "sonner";

import { useChangeStatus } from "@/hook";
import { changeUserStatus } from "@/lib/actions/user.action";

import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";

const ChangeStatusModal = () => {
    const { isOpen, selectedUserId, nextStatus, onClose } = useChangeStatus();

    const handleConfirm = async () => {
        if (selectedUserId === null || nextStatus === null) return;
        const res = await changeUserStatus(selectedUserId, nextStatus === "ACTIVE")

        if(res === "ok"){
            toast.success(`Foydalanuvchi holati o'zgartirildi!`);
        }else{
            toast.error("Xatolik yuz berdi, iltimos qayta urinib ko'ring.");
        }
        // try {
        //     await changeUserStatus(selectedUserId, nextStatus === "ACTIVE");
        //     toast.success(`Foydalanuvchi holati o'zgartirildi!`);
        //     onClose();
        // } catch (error) {
        //     toast.error("Xatolik yuz berdi, iltimos qayta urinib ko'ring.");
        //     console.log(error);
        // }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="w-full max-w-[450px] !bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center p-8 md:p-10 lg:p-12">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {nextStatus && selectedUserId !== null
                            ? `This will make the user ${nextStatus.toLowerCase()}. Are you sure?`
                            : "Are you sure you want to perform this action?"}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className={"bg-status-red text-white hover:bg-status-red/80 hover:text-white"}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} className={"bg-indigo-500 text-white hover:bg-indigo-500/80 hover:text-white"}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ChangeStatusModal;
