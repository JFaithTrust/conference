"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DirectionType } from "@/types";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useReviewersStore from "@/hook/useReviewerModal";

export const typesColumn: ColumnDef<DirectionType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="font-medium"
      >
        Yo'nalishlar
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
    header: () => <div className="pl-20">Muharrirlar</div>,
    cell: ({ row }) => {
      const { onOpen } = useReviewersStore(); // Modalni ochish funksiyasini chaqirish
      
      const handleClick = () => {
        onOpen(row.original.id); // Yo‘nalishning ID sini berish orqali modalni ochish
      };

      return (
        <Button variant="outline" onClick={handleClick}>
          <span className="text-sm w-52 truncate">Muharrirlarni ko‘rish</span>
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
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
          <DropdownMenuItem onClick={() => alert("Ko‘rish")} >
          Ko&apos;rish
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
