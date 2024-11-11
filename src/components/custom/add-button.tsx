import Link from "next/link";
import React from "react";
import { LuPlus } from "react-icons/lu";

import Modal from "@/components/custom/modal";
import { Button } from "@/components/ui/button";

interface AddButtonProps {
    link?: string;
    onClick?: () => void; // Added an onClick prop
}

export function AddButton({ link, onClick }: AddButtonProps) {
    return link ? (
        <Link href={link}>
            <Button
                className="flex gap-x-2 rounded-lg px-4 py-3 text-white"
            >
                <LuPlus className={"size-4"} />
                <span>Yaratish</span>
            </Button>
        </Link>
    ) : (
        <Modal onClick={onClick} />
        // <Button
        //     onClick={onClick} // Handle onClick
        //     className="py-3 px-4 flex gap-x-2 bg-card-orange text-white rounded-lg skew-x-[-20deg]"
        // >
        //     <LuPlus className={"size-4 skew-x-[20deg]"} />
        //     <span className={"skew-x-[20deg]"}>Yaratish</span>
        // </Button>
    );
}