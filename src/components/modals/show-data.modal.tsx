"use client";

import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import useReviewersStore from "@/hook/useReviewerModal";
import { useEffect} from "react";
import { getUserByDirectionId } from "@/lib/actions/user.action";

const ShowDataModal = () => {
  const { isOpen, directionId, onClose, reviewers, setReviewers } = useReviewersStore();

  useEffect(() => {
    const fetchReviewers = async () => {
      if (isOpen && directionId) {
        const data = await getUserByDirectionId(directionId);
        setReviewers(data);
      }
    };

    fetchReviewers();
  }, [isOpen, directionId]);

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-[650px] w-full p-8 md:p-10 lg:p-12 bg-slate-50">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl pb-4">Muharrirlar:</AlertDialogTitle>
          <AlertDialogDescription>
            {reviewers.length > 0 ? (
              reviewers.map((user) => (
                <div key={user.id} className="w-full ">
                    <div className="flex justify-between items-center text-xl">
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
          <AlertDialogCancel onClick={onClose} className="absolute top-0 pb-4  right-0 border-none rounded-full text-xl shadow-none" >
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



