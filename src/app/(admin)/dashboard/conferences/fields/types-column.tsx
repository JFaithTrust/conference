"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
// import { useState } from "react";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { toast } from "sonner";

import { Button } from "@/components/ui/button";
// import {
//     DropdownMenu,
//     DropdownMenuContent, DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu";
// import useReviewersStore from "@/hook/useReviewerModal";
// import { deleteDirectionById } from "@/lib/actions/direction.action"; // Import the fetch-based delete function
import { IDirection } from "@/types";

export const TypesColumn: ColumnDef<IDirection>[] = (() => {
    // const { onOpen } = useReviewersStore(); // Hookni yuqoriga olib chiqamiz

    return [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="font-medium"
                >
                    Yo&apos;nalishlar
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex font-medium">
                    <div>{row.original.name}</div>
                </div>
            ),
        },
        // {
        //     accessorKey: "reviewers",
        //     header: () => <div className="pl-20">Muharrirlar</div>,
        //     cell: ({ row }) => {
        //         const handleClick = () => onOpen(row.original.id);
        //         return (
        //             <Button variant="outline" onClick={handleClick}>
        //                 <span className="w-52 truncate text-sm">Muharrirlarni ko‘rish</span>
        //             </Button>
        //         );
        //     },
        // },
        // {
        //     id: "actions",
        //     cell: ({ row }) => {
        //         const [allDirections, setAllDirections] = useState<IDirection[]>([]);
        //
        //         const handleDelateType = async (id: number) => {
        //             try {
        //                 const result = await deleteDirectionById(id);
        //                 if (result.success) {
        //                     setAllDirections(allDirections.filter((item) => item.id !== id));
        //                     toast.success("Yo'nalish muvaffaqiyatli o'chirildi");
        //                 } else {
        //                     toast.error(
        //                         "Yo'nalish o'chirilmadi chunki bu yo'nalish konferesiyada mavjud!",
        //                         {
        //                             action: {
        //                                 label: "Qayta urinish",
        //                                 onClick: () => handleDelateType(id),
        //                             },
        //                             actionButtonStyle: {
        //                                 backgroundColor: '#ff5733',
        //                                 color: '#ffffff',
        //                                 padding: '8px 16px',
        //                                 borderRadius: '4px',
        //                                 border: 'none',
        //                                 cursor: 'pointer',
        //                             },
        //                             duration: 5000,
        //                         }
        //                     );
        //                 }
        //             } catch (error) {
        //                 toast.error("An error occurred while deleting the direction", {
        //                     action: {
        //                         label: "Qayta urinish",
        //                         onClick: () => handleDelateType(id),
        //                     },
        //                     actionButtonStyle: {
        //                         backgroundColor: '#ff5733',
        //                         color: '#ffffff',
        //                         padding: '8px 16px',
        //                         borderRadius: '4px',
        //                         border: 'none',
        //                         cursor: 'pointer',
        //                     },
        //                     duration: 5000,
        //                 });
        //             }
        //         };
        //
        //         return (
        //             <DropdownMenu>
        //                 <DropdownMenuTrigger asChild>
        //                     <Button variant="ghost" className="size-8 p-0">
        //                         <span className="sr-only">Open menu</span>
        //                         <MoreHorizontal className="size-4" />
        //                     </Button>
        //                 </DropdownMenuTrigger>
        //                 <DropdownMenuContent align="end">
        //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
        //                     <DropdownMenuSeparator />
        //                     <DropdownMenuItem
        //                         className="justify-center bg-yellow-400 text-lg text-white"
        //                         onClick={() => alert("Ko‘rish")}
        //                     >
        //                         <FaEdit />
        //                     </DropdownMenuItem>
        //                     <DropdownMenuItem
        //                         className="mt-1 justify-center bg-red-500 text-lg text-white"
        //                         onClick={() => handleDelateType(row.original.id)}
        //                     >
        //                         <MdDelete />
        //                     </DropdownMenuItem>
        //                 </DropdownMenuContent>
        //             </DropdownMenu>
        //         );
        //     },
        // },
    ];
})();



// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import { ArrowUpDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { DirectionType } from "@/types";
// import { MoreHorizontal } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import useReviewersStore from "@/hook/useReviewerModal";
// import { FaRegEdit } from "react-icons/fa";
// import { CiEdit } from "react-icons/ci";
// import { MdDelete } from "react-icons/md";
// import { MdDeleteOutline } from "react-icons/md";
// import { FaEdit } from "react-icons/fa";

// export const typesColumn: ColumnDef<DirectionType>[] = [
//   {
//     accessorKey: "name",
//     header: ({ column }) => (
//       <Button
//         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         className="font-medium"
//       >
//         Yo'nalishlar
//         <ArrowUpDown className="ml-2 h-4 w-4" />
//       </Button>
//     ),
//     cell: ({ row }) => (
//       <div className="font-medium flex">
//         <div>{row.original.name}</div>
//       </div>
//     ),
//   },
//   {
//     accessorKey: "reviewers",
//     header: () => <div className="pl-20">Muharrirlar</div>,
//     cell: ({ row }) => {
//       const { onOpen } = useReviewersStore(); // Modalni ochish funksiyasini chaqirish

//       const handleClick = () => {
//         onOpen(row.original.id); // Yo‘nalishning ID sini berish orqali modalni ochish
//       };

//       return (
//         <Button variant="outline" onClick={handleClick}>
//           <span className="text-sm w-52 truncate">Muharrirlarni ko‘rish</span>
//         </Button>
//       );
//     },
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       // const [reviewersId, setReviewersId] = React.useState([] as string[]);
//       // const handleDelete = (id: string) => {
//       //   // const deleteReviewersId = reviewersId.filter((item) => {
//       //   //   return item !== id;
//       //   // });
//       //   // const deleted = reviewersId.find((item) => item === id);
//       //   setReviewersId(reviewersId.filter((item) => item !== id));
//       // };
//       return(

//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="h-8 w-8 p-0">
//             <span className="sr-only">Open menu</span>
//             <MoreHorizontal className="h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuLabel>Actions</DropdownMenuLabel>
//           <DropdownMenuSeparator />

//           <DropdownMenuItem className="bg-yellow-400 text-white text-lg justify-center" onClick={() => alert("Ko‘rish")} >
//           <FaEdit />
//           </DropdownMenuItem>

//           <DropdownMenuItem className="bg-red-500 text-white text-lg justify-center mt-1" onClick={() => alert("Ko‘rish")} >
//           <MdDelete />
//           </DropdownMenuItem>

//         </DropdownMenuContent>
//       </DropdownMenu>
//  );
// },
//   },
// ];
