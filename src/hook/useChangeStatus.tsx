import { create } from "zustand";

interface UseChangeStatusState {
    isOpen: boolean;
    selectedUserId: number | null;
    nextStatus: "ACTIVE" | "INACTIVE" | null;
    onOpen: (userId: number, nextStatus: "ACTIVE" | "INACTIVE") => void;
    onClose: () => void;
}

const useChangeStatus = create<UseChangeStatusState>((set) => ({
    isOpen: false,
    selectedUserId: null,
    nextStatus: null,
    onOpen: (userId, nextStatus) => set({ isOpen: true, selectedUserId: userId, nextStatus }),
    onClose: () => set({ isOpen: false, selectedUserId: null, nextStatus: null }),
}));

export default useChangeStatus;