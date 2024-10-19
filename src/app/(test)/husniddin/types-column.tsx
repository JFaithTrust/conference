"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DirectionType, UserType } from "@/types";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export const typesColumn: ColumnDef<DirectionType>[] = [

    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="font-medium"
            >
                Yo&apos;nalishlar
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
        accessorKey: "reviewers",
        header: () => 
            <div className="pl-4">Muharrirlar</div>,
        
        cell: ({ row }) => (<Button variant={"outline"}><span  className="text-sm w-64 truncate">Salom Lorem amet consectetur adipisicing elit elit elit elit e. Dolorum dignissimos ratione laudantium quae dolores? </span></Button>),
        // cell: ({ row }) => <Button variant={"outline"} className=" py-1 px-2 text-sm">{`Muharrirlar`}<span className="tracking-widest"> ...</span></Button>,
    },
  
    {
        id: "actions",
        cell: ({ row }) => {
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
                        <DropdownMenuItem onClick={() => router.push(`/husniddin/`)}>
                            Ko&apos;rish
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/husniddin/`)}>
                            Ko&apos;rish
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];