"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DirectionType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
// import { FaTrash, FaUsers } from "react-icons/fa";
// import { MdEditNote } from "react-icons/md";
// import clsx from "clsx";

export const fieldsColumn: ColumnDef<DirectionType>[] = [
    {
        accessorKey: "name",
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
                <div>{row.original.name}</div>
            </div>
        ),
    },
   
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original;
            // eslint-disable-next-line react-hooks/rules-of-hooks
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
                        <DropdownMenuItem>
                            <button>
                                O&apos;chirish
                            </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <button>
                                Tahrirlash
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];