"use client";

import { ColumnDef } from "@tanstack/react-table";
import { clsx } from "clsx";
import { ArrowUpDown , MoreHorizontal } from "lucide-react";
import {useRouter} from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChangeStatus } from "@/hook";
import { UserType } from "@/types";

export const usersColumn: ColumnDef<UserType>[] = [
    {
        accessorKey: "fullName",
        header: ({ column }) => (
            <Button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium"
            >
                Name
                <ArrowUpDown className="ml-2 size-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex font-medium">
                <div>{row.original.fullName}</div>
            </div>
        ),
    },
    {
        accessorKey: "phoneNumber",
        header: () => <div>Phone Number</div>,
        cell: ({ row }) => (
            <div className="font-medium">{row.original.phoneNumber}</div>
        ),
    },
    {
        accessorKey: "userStatus",
        header: ({ column }) => (
            <Button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className={"font-medium"}
            >
                Status
                <ArrowUpDown className="ml-2 size-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div
                className={clsx(
                    "w-24 rounded-xl px-4 py-1.5 text-center font-medium capitalize text-white",
                    {
                        "bg-status-green": row.original.userStatus === "ACTIVE",
                        "bg-status-red": row.original.userStatus === "INACTIVE",
                    }
                )}
            >
                {row.original.userStatus === "ACTIVE" ? "Active" : "Inactive"}
            </div>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const changeStatus = useChangeStatus();
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();
            const isUserActive = user.userStatus === "ACTIVE";

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="size-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push(`/dashboard/users/${user.id}`)}>
                            Ko&apos;rish
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={clsx({
                                "text-status-red": isUserActive, // Show red for "Block"
                                "text-status-green": !isUserActive, // Show green for "Active"
                            })}
                            onClick={() => {
                                changeStatus.onOpen(user.id); // Open modal with user ID and next status
                            }}
                        >
                            {isUserActive ? "Bloklash" : "Faollashtirish"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];