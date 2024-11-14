import { create } from "zustand";

import {UserType} from "@/types";

interface ReviewersState {
    reviewers: UserType[]; // Type-ni loyihangizga qarab moslashtiring
    isOpen: boolean;
    directionId?: number | null;
    onOpen: (directionId?: number) => void;
    onClose: () => void;
    setReviewers: (reviewers: UserType[]) => void;
}

const useReviewersStore = create<ReviewersState>((set) => ({
    isOpen: false,
    reviewers: [],
    directionId: null,
    onOpen: (directionId) => set({ isOpen: true, directionId }), // directionId ni to'g'ri saqlash
    onClose: () => set({ isOpen: false, directionId: null }),
    setReviewers: (reviewers) => set({ reviewers }), // reviewersni yangilash
}));

export default useReviewersStore;

