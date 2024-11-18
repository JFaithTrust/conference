"use client";

import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {useRouter} from "next/navigation";

import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useChangeStatus} from "@/hook";
import useReviewersStore from "@/hook/useReviewerModal";
import {getUserByDirectionId} from "@/lib/actions/user.action";
import {IDirection, UserType} from "@/types";

export const fieldColumn: ColumnDef<IDirection>[] = [
    {
        accessorKey: "name",
        header: ({column}) => (
            <Button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Yo&apos;nalishlar
                <ArrowUpDown className="ml-2 size-4"/>
            </Button>
        ),
        cell: ({row}) => (
            <div className="flex">
                <div>{row.original.name}</div>
            </div>
        ),
    },
    {
        accessorKey: "reviewers",
        header: () => <div className="pl-20">Muharrirlar</div>,
        cell: ({row}) => {
            const field= row.original;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const reviewer = useReviewersStore();

            const handleClick = async () => {
               const reviewers = await getUserByDirectionId(field.id) as UserType[];
                reviewer.onOpen(reviewers);
            };
            return (
                <Button variant="outline" onClick={handleClick}>
                    <span className="w-52 truncate text-sm">Muharrirlarni ko‘rish</span>
                </Button>
            );
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            const field = row.original;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const changeStatus = useChangeStatus();
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="size-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="size-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem
                            className="text-orange-500"
                            onClick={() => router.push(`/dashboard/conferences/fields/${field.id}/edit`)}
                        >
                            Tahrirlash
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => {
                                changeStatus.onOpen(field.id); // Open modal with user ID and next status
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