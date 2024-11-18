// table-skeleton.tsx:
"use client";

import {clsx} from "clsx";
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

function InsideTableSkeleton() {
    return (
        <div className="flex flex-col gap-y-[18px] px-[30px]">
            <div className="relative max-w-[300px] py-4">
                <div className="rounded-md">
                    <Skeleton className="h-8 w-[100px] rounded-md pl-10"/>
                </div>
            </div>

            {/* Table Header */}
            <div className="overflow-hidden rounded-md bg-mainwhite drop-shadow">
                <Skeleton className="flex h-12 space-x-2 rounded-b-none bg-slate-400 p-4 font-medium text-white"/>

                {/* Table Body */}
                <div className={"pb-4"}>
                    {[...Array(5)].map((_, rowIndex) => (
                        <div key={rowIndex} className="flex space-x-2 p-4">
                            {[...Array(4)].map((_, cellIndex) => (
                                <Skeleton
                                    key={cellIndex}
                                    className={clsx("h-4 rounded-md", {
                                        "w-full max-w-[10%] flex justify-end items-center": cellIndex === 3,
                                    })}
                                />
                            ))}
                        </div>
                    ))}
                <Skeleton className={"ml-10 h-8 w-full max-w-[150px] rounded-md "}/>
                </div>
            </div>

        </div>
    );
}

export default InsideTableSkeleton;
