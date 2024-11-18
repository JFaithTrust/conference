import { create } from "zustand";

import {UserType} from "@/types";

interface ReviewersState {
    reviewers: UserType[]; // Type-ni loyihangizga qarab moslashtiring
    isOpen: boolean;
    onOpen: (reviewers: UserType[]) => void;
    onClose: () => void;
}

const useReviewersStore = create<ReviewersState>((set) => ({
    reviewers: [],
    isOpen: false,
    onOpen: (reviewers: UserType[]) => set({ isOpen: true, reviewers }), // directionId ni to'g'ri saqlash
    onClose: () => set({ isOpen: false}),
}));

export default useReviewersStore;

