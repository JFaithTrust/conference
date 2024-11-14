import { create } from "zustand";

interface UseChangeStatusState {
    isOpen: boolean;
    selectedUserId: number | null;
    onOpen: (userId: number) => void;
    onClose: () => void;
}

const useChangeStatus = create<UseChangeStatusState>((set) => ({
    isOpen: false,
    selectedUserId: null,
    onOpen: (userId) => set({ isOpen: true, selectedUserId: userId }),
    onClose: () => set({ isOpen: false, selectedUserId: null }),
}));

export default useChangeStatus;