"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import useReviewersStore from "@/hook/useReviewerModal";

const ReviewerDataModal = () => {
    const { isOpen, onClose, reviewers } = useReviewersStore();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-full max-w-[650px] border-2 border-indigo-500 bg-slate-50 p-8 md:p-10 lg:p-12">
                <DialogHeader>
                    <DialogTitle className="pb-4 text-2xl text-gray-500">Muharrirlar:</DialogTitle>
                    <DialogDescription>
                        {reviewers.length > 0 ? (
                            reviewers.map((user) => (
                                <div key={user.id} className="my-4 w-full">
                                    <div
                                        className="flex items-center justify-between text-xl font-semibold text-indigo-500">
                                        <p>{user.fullName}</p>
                                        <p className="pb-1">{user.phoneNumber}</p>
                                    </div>
                                    <hr className="border-t-2 border-gray-300"/>
                                </div>
                            ))
                        ) : (
                            <p className="text-xl">No reviewers found.</p>
                        )}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewerDataModal;



