import { ColumnDef } from "@tanstack/react-table";

import {IApplication} from "@/types";


const columns: ColumnDef<IApplication>[] = [
    {
        header: "Id",
        accessorKey: "id",
    },
    {
        header: "Konferensiya nomi",
        accessorKey: "conference.name",
    },
    {
        header: "Maqola",
        accessorKey: "name",
    },
    {
        header: "Status",
        accessorKey: "status",
    },
    {
        header: "To'lov",
        accessorKey: "paymentStatus",
    },
];

export default columns;
