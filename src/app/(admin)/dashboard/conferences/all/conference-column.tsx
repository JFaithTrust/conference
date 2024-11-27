"use client";

import { ColumnDef } from "@tanstack/react-table";
import {format} from "date-fns";
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
import {ConferenceType} from "@/types";

export const conferenceColumn: ColumnDef<ConferenceType>[] = [
    {
        accessorKey: "name",
        header: () => <div>Konferensiya nomi</div>,
        cell: ({ row }) => (
            <div className="flex">
                <div>{row.original.name}</div>
            </div>
        ),
    },
    {
        accessorKey: "deadlineForThesis",
        header: ({ column }) => (
            <Button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium"
            >
                Registratsiya vaqti
                <ArrowUpDown className="ml-2 size-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex pl-2">
                <div>{format(row.original.deadlineForThesis, "dd.MM.yyyy")}</div>
            </div>
        ),
    },
    {
        accessorKey: "startsAt",
        header: ({ column }) => (
            <Button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium"
            >
                Boshlanish vaqti
                <ArrowUpDown className="ml-2 size-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex pl-2">
                <div>{format(row.original.startsAt, "dd.MM.yyyy")}</div>
            </div>
        ),
    },
    {
        accessorKey: "endsAt",
        header: ({ column }) => (
            <Button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium"
            >
                Tugash vaqti
                <ArrowUpDown className="ml-2 size-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex pl-2">
                <div>{format(row.original.endsAt, "dd.MM.yyyy")}</div>
            </div>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const conference = row.original;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const changeStatus = useChangeStatus();
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();

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
                        <DropdownMenuItem onClick={() => router.push(`/dashboard/conferences/all/${conference.id}`)}>
                            Ko&apos;rish
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={"text-orange-500"}
                            onClick={() => router.push(`/dashboard/conferences/all/${conference.id}/edit`)}
                        >
                            Tahrirlash
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={"text-destructive"}
                            onClick={() => {
                                changeStatus.onOpen(conference.id); // Open modal with user ID and next status
                            }}
                        >
                            O&apos;chirish
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];