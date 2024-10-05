"use client"

import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal} from "lucide-react"
// import {format} from "date-fns" // date-fns dan format funksiyasini import qilamiz
import {Button} from "@/components/ui/button"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
import {UserType} from "@/types";
// import {useLocale} from "next-intl";
// import {useRouter} from "next/navigation";
import {clsx} from "clsx";


export const usersColumn: ColumnDef<UserType>[] = [
    {
        accessorKey: "id",
        header: () => <div>Id</div>,
        cell: ({row}) => {
            return <div className="font-medium text-sm flex gap-x-2">
                <div>{row.original.id}</div>
            </div>
        },
    },
  
    {
        accessorKey: "fullName",
        header: () => <div>Name</div>,
        cell: ({row}) => {
            return <div className="font-medium text-sm">{row.original.fullName}</div>
        },
    },
    {
        accessorKey: "phoneNumber",
        header: () => <div>Phone Number</div>,
        cell: ({row}) => {
            return <div className="font-medium text-sm">{row.original.phoneNumber}</div>
        },
    },
    {
        accessorKey: "email",
        header: () => <div>Email</div>,
        cell: ({row}) => {
            return <div className="font-medium text-sm truncate">{row.getValue("email")}</div>
        },
    },
    {
        accessorKey: "email",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase pl-8">{row.original.email}</div>,
    },

    {
        accessorKey: "userStatus",
        header: () => <div className={"text-center"}>Status</div>,
        cell: ({row}) => {
            return <div
                className={clsx("font-medium text-sm py-1 px-4 rounded-2xl text-center",{
                    "bg-status-green": row.original.userStatus === "Accepted",
                    "bg-status-yellow": row.original.userStatus === "Feedback",
                    "bg-status-red": row.original.userStatus === "Rejected",
                })}>{
                row.original.userStatus === "Accepted" ? "Qabul qilingan" :
                    row.original.userStatus === "Feedback" ? "Fikr-mulohaza" :
                            row.original.userStatus === "Rejected" ? "Rad etilgan" : ""
            }</div>
        },
    },

    // {
    //     id: "actions",
    //     cell: ({row}) => {
    //         const user = row.original

    //         // eslint-disable-next-line react-hooks/rules-of-hooks
    //         // const locale = useLocale()
    //         // eslint-disable-next-line react-hooks/rules-of-hooks
    //         // const router = useRouter()

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontal className="h-4 w-4 text-status-btn-payment"/>
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuItem
    //                         // onClick={() => router.push(`/${locale}/dashboard/complaints/${complaint.id}`)}
    //                         onClick={() => navigator.clipboard.writeText(user.id)}
    //                     >
    //                         Javob berish
    //                     </DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         )
    //     },
    // },
]