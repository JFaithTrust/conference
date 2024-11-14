import { create } from "zustand";

interface ReviewerAddStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useReviewerAdd = create<ReviewerAddStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useReviewerAdd;
