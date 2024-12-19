import Image from "next/image";
import React from 'react'

import {Badge} from "@/components/ui/badge";

interface DirectionCardProps {
    name: string;
    handleRemove: () => void;
}

const DirectionCard = ({
                           name,
                           handleRemove,
                       }: DirectionCardProps) => {
    return (
        <Badge
            className="flex flex-row gap-2 rounded-md border-none px-4 py-2 text-[10px] font-medium capitalize leading-[13px]">
            <span>{name}</span>
            <Image
                src="/icons/close.svg"
                width={12}
                height={12}
                alt="close icon"
                className="cursor-pointer object-contain invert-0 dark:invert"
                onClick={handleRemove}
            />
        </Badge>
    )
}
export default DirectionCard
