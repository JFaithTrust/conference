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
import { FaRegEdit } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


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
    cell: ({ row }) => {
      // const [reviewersId, setReviewersId] = React.useState([] as string[]);
      // const handleDelete = (id: string) => {
      //   // const deleteReviewersId = reviewersId.filter((item) => {
      //   //   return item !== id;
      //   // });
      //   // const deleted = reviewersId.find((item) => item === id);
      //   setReviewersId(reviewersId.filter((item) => item !== id));
      // };
      return(
      
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
         
          <DropdownMenuItem className="bg-yellow-400 text-white text-lg justify-center" onClick={() => alert("Ko‘rish")} >
          <FaEdit />
          </DropdownMenuItem>
          
          <DropdownMenuItem className="bg-red-500 text-white text-lg justify-center mt-1" onClick={() => alert("Ko‘rish")} >
          <MdDelete />
          </DropdownMenuItem>
          
        </DropdownMenuContent>
      </DropdownMenu>
 );
},
  },
];
