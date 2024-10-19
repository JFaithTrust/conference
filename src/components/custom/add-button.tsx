import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import Link from "next/link";
import React from "react";

interface AddButtonProps {
    link?: string;
    onClick?: () => void; // Added an onClick prop
}

export function AddButton({ link, onClick }: AddButtonProps) {
    return link ? (
        <Link href={link}>
            <Button
                className="ml-auto rounded-lg font-medium py-3 px-4 gap-1 bg-white text-muted-foreground outline-none focus-visible:ring-0 focus-visible:ring-offset-0 hover:text-indigo-500"
            >
                {/* py-3 px-4 flex gap-x-2 bg-white  rounded-lg  */}
                <LuPlus className={"size-4"} />
                <span>Yaratish</span>
            </Button>
        </Link>
    ) : (
        <Button
            onClick={onClick} // Handle onClick
            className="ml-auto rounded-lg font-medium py-3 px-4 gap-1 bg-white text-muted-foreground outline-none focus-visible:ring-0 focus-visible:ring-offset-0 hover:text-indigo-500"
        >
            <LuPlus className={"size-4"} />
            <span>Yaratish</span>
        </Button>
    );
}