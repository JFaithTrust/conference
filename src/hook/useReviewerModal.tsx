import { create } from "zustand";

interface ReviewersState {
  reviewers: any[]; // Type-ni loyihangizga qarab moslashtiring
  isOpen: boolean;
  directionId?: number | null;
  onOpen: (directionId?: number) => void;
  onClose: () => void;
  setReviewers: (reviewers: any[]) => void;
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

