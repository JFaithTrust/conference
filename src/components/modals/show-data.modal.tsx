"use client";

import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { useEffect} from "react";

import useReviewersStore from "@/hook/useReviewerModal";
import { getUserByDirectionId } from "@/lib/actions/user.action";

import {
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";



const ShowDataModal = () => {
    const { isOpen, directionId, onClose, reviewers, setReviewers } = useReviewersStore();


    // const [directionsData] = await Promise.all([getUserByDirectionId()]);

    useEffect(() => {
        const fetchReviewers = async () => {
            if (isOpen && directionId) {
                const data = await getUserByDirectionId(directionId);
                if(data !== undefined){
                    setReviewers(data);
                }
            }
        };

        fetchReviewers();
    }, [isOpen, directionId]);

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="w-full max-w-[650px] bg-slate-50 p-8 md:p-10 lg:p-12">
                <AlertDialogHeader>
                    <AlertDialogTitle className="pb-4 text-2xl">Muharrirlar:</AlertDialogTitle>
                    <AlertDialogDescription>
                        {reviewers.length > 0 ? (
                            reviewers.map((user) => (
                                <div key={user.id} className="w-full ">
                                    <div className="flex items-center justify-between text-xl">
                                        <p>{user.fullName}</p>
                                        <p className="pb-1">{user.phoneNumber}</p>
                                    </div>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <p className="text-xl">No reviewers found.</p>
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose} className="absolute right-0 top-0  rounded-full border-none pb-4 text-xl shadow-none" >
                        x
                    </AlertDialogCancel>
                    {/* <AlertDialogCancel onClick={onClose} className="bg-red-500 text-white font-bold hover:bg-red-500 hover:text-white" >
            Yopish
          </AlertDialogCancel> */}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ShowDataModal;



