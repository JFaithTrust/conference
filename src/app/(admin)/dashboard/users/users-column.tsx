"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserType } from "@/types";
import { clsx } from "clsx";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChangeStatus } from "@/hook";
import {router} from "next/client";
import { useRouter } from "next/navigation";

export const usersColumn: ColumnDef<UserType>[] = [
    {
        accessorKey: "fullName",
        header: ({ column }) => (
            <Button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium"
            >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="font-medium flex">
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
        accessorKey: "email",
        header: ({ column }) => (
            <Button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium"
            >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="lowercase">{row.original.email}</div>,
    },
    {
        accessorKey: "userStatus",
        header: ({ column }) => (
            <Button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className={"font-medium"}
            >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div
                className={clsx(
                    "font-medium py-1.5 px-4 rounded-xl w-24 text-center capitalize text-white",
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
            const isUserActive = user.userStatus === "ACTIVE";
            const newStatus = isUserActive ? "INACTIVE" : "ACTIVE";
            const router = useRouter();
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
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
                                changeStatus.onOpen(user.id, newStatus as "ACTIVE" | "INACTIVE"); // Open modal with user ID and next status
                            }}
                        >
                            {isUserActive ? "Inactive" : "Active"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];