// table-skeleton.tsx:
"use client";

import { clsx } from "clsx";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

import { Skeleton } from "@/components/ui/skeleton";

function TableSkeleton() {
    return (
        <div className="flex flex-col gap-y-[18px] px-[30px]">
            {/* Header with search and filter */}
            <div className="flex items-center justify-between">
                <div className="relative max-w-[300px] py-4">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
            <AiOutlineSearch className="size-5" />
          </span>
                    <div className="rounded-md">
                        <Skeleton className="h-10 w-[300px] rounded-md pl-10" />
                    </div>
                </div>
                <div className="flex items-center gap-x-2">
                    <Skeleton className="h-10 w-24 rounded-md" />
                    <Skeleton className="h-10 w-24 rounded-md" />
                </div>
            </div>

            {/* Table Header */}
            <div className="overflow-hidden rounded-md bg-mainwhite drop-shadow">
                <Skeleton className="flex space-x-2 bg-slate-400 p-4 h-12 font-medium text-white rounded-b-none" />

                {/* Table Body */}
                <div>
                    {[...Array(5)].map((_, rowIndex) => (
                        <div key={rowIndex} className="flex space-x-2 p-4">
                            {[...Array(4)].map((_, cellIndex) => (
                                <Skeleton
                                    key={cellIndex}
                                    className={clsx("h-8 rounded-md", {
                                        "w-full max-w-[10%] flex justify-end items-center": cellIndex === 3,
                                    })}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-between pb-7 pt-10">
                <Skeleton className="h-10 w-32 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-md" />
            </div>
        </div>
    );
}

export default TableSkeleton;
