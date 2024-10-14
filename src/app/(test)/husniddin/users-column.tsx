"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserType } from "@/types";
import { clsx } from "clsx";
import { MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner"; // Notification library
import { changeUserStatus } from "@/lib/actions/user.action";

export const usersColumn: ColumnDef<UserType>[] = [

    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-medium text-lg"
                >
                    Id
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="font-medium text-sm flex">
                <div className="pl-4">{row.original.id}</div>
            </div>
        },
    },

    {
        accessorKey: "fullName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-medium text-lg"
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="font-medium text-sm flex">
                <div>{row.original.fullName}</div>
            </div>
        },
    },

    {
        accessorKey: "phoneNumber",
        header: () => <div>Phone Number</div>,
        cell: ({ row }) => {
            return <div className="font-medium text-sm">{row.original.phoneNumber}</div>
        },
    },

    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-medium text-lg"
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.original.email}</div>,
    },

    {
        accessorKey: "userStatus",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={" font-medium text-lg"}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        // header: (column) => <div className={"text-start min-w-24 pl-6"}>Status</div>,
        cell: ({ row }) => {
            return <div
                className={clsx("font-medium text-sm py-1.5 px-4 rounded-2xl text-center w-24  capitalize text-white", {
                    "bg-status-green": row.original.userStatus === "ACTIVE",
                    "bg-status-red": row.original.userStatus === "INACTIVE",
                })}>{
                    row.original.userStatus === "ACTIVE" ? "ACTIVE" :
                        row.original.userStatus === "INACTIVE" ? "INACTIVE" : ""
                }</div>
        },
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;
            const router = useRouter();
            const [isUpdating, setIsUpdating] = useState(false); // To track API call status

            const handleChangeStatus = async (id: number, enable: boolean) => {
                try {
                    setIsUpdating(true);
                    await changeUserStatus(id, enable);
                    toast.success(`Foydalanuvchi holati o'zgartirildi!`);
                } catch (error) {
                    toast.error("Xatolik yuz berdi, iltimos qayta urinib ko'ring.");
                } finally {
                    setIsUpdating(false);
                }
            };

            const isUserActive = user.userStatus === "ACTIVE";

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0" disabled={isUpdating}>
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={() => router.push(`/husniddin/${user.id}`)}
                        >
                            Ko&apos;rish
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() => handleChangeStatus(user.id, !isUserActive)}
                            className={clsx({
                                "text-status-red": isUserActive, // Show red for "Block"
                                "text-status-green": !isUserActive, // Show green for "Active"
                            })}
                            disabled={isUpdating}
                        >
                            {isUserActive ? "Inactive" : "Active"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
]