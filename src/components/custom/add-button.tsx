"use client";

import Link from "next/link";
import React from "react";
import { LuPlus } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import {useReviewerAdd} from "@/hook";

interface AddButtonProps {
    link?: string;
}

export function AddButton({ link }: AddButtonProps) {
    const reviewerAdd = useReviewerAdd();

    return link ? (
        <Link href={link}>
            <Button
                className="ml-3 flex gap-x-2 rounded-lg border-none bg-indigo-500 px-4 py-3 text-white"
            >
                <LuPlus className={"size-4"} />
                <span>Yaratish</span>
            </Button>
        </Link>
    ) : (
        <Button
            onClick={reviewerAdd.onOpen} // Handle onClick
            className="ml-3 flex gap-x-2 rounded-lg border-none bg-indigo-500 px-4 py-3 text-white"
        >
            <LuPlus className={"size-4"} />
            <span>Yaratish</span>
        </Button>
    );
}