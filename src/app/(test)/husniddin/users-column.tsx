"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserType } from "@/types";
import { clsx } from "clsx";


export const usersColumn: ColumnDef<UserType>[] = [
    // {
    //     accessorKey: "id",
    //     header: () => <div>Id</div>,
    //     cell: ({row}) => {
    //         return <div className="font-medium text-sm flex gap-x-2">
    //             <div>{row.original.id}</div>
    //         </div>
    //     },
    // },

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

    // {
    //     accessorKey: "fullName",
    //     header: () => <div>Name</div>,
    //     cell: ({row}) => {
    //         return <div className="font-medium text-sm">{row.original.fullName}</div>
    //     },
    // },

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
        header: () => <div className={"text-end min-w-24 pr-6"}>Status</div>,
        cell: ({ row }) => {
            return <div
                className={clsx("font-medium text-sm py-1.5 px-4 rounded-2xl text-center w-24  capitalize text-white", {
                    "bg-status-green": row.original.userStatus === "Active",
                    "bg-status-red": row.original.userStatus === "Blocked",
                })}>{
                    row.original.userStatus === "Active" ? "Aktive" :
                        row.original.userStatus === "Blocked" ? "Blocked" : ""
                }</div>
        },
    },
]