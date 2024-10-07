"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
// import {PaginationType} from "@/types";
// import {CustomPagination} from "@/components/custom/custom-pagination";
import { clsx } from "clsx";
import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { ColumnFilter } from "@/components/custom/column-filter";
import { AddButton } from "@/components/custom/add-button";

interface TableProps<D, V> {
    columns: ColumnDef<D, V>[]
    data: D[]
    hasFilter?: boolean
    hasSearchbar?: boolean
    hasPagination?: boolean
    hasAddButton?: boolean
    addButtonLink?: string
    openDialog?: () => void
    searchedBy?: string
    isReportPage?: boolean
}

const globalFilterFn = (row: any, columnId: string, filterValue: string) => {
  const rowValue = row.getValue(columnId);

  // Boshqa ustunlar uchun standart filtr
  return rowValue?.toString().toLowerCase().includes(filterValue.toLowerCase());
};

export function DataTable<D, V>({
                                    columns,
                                    data,
                                    hasFilter = false,
                                    hasPagination = false,
                                    hasAddButton = false,
                                    addButtonLink = "",
                                    openDialog,
                                }: TableProps<D, V>) {
    // const [pagination, setPagination] = useState<PaginationType>({
    //     pageIndex: 0,
    //     pageSize: 5,
    // })
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [globalFilter, setGlobalFilter] = React.useState("")


    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: globalFilterFn,
        onColumnVisibilityChange: setColumnVisibility,
        // onPaginationChange: setPagination,
        manualFiltering: false,
        state: {
            // pagination,
            sorting,
            globalFilter,
            columnFilters,
            columnVisibility,
        }
    })
    return (
        <div className={clsx("w-full flex flex-col gap-y-2 text-white")}>
            <div className={"flex items-center justify-between"}>
                {/* Search Bar and Filter (if needed) */}
                <div className="relative max-w-[300px] py-4">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <AiOutlineSearch className="text-white size-5" />
                    </span>
                    <div className={"bg-child-black rounded-md"}>
                        <Input
                            placeholder={"Qidirish"}
                            value={globalFilter ?? ""}
                            onChange={(event) => setGlobalFilter(event.target.value)}
                            className="pl-10 bg-card-black w-[300px] placeholder:text-white text-white focus-visible:ring-0 focus-visible:ring-offset-0 outline-none border-none"
                        />
                    </div>
                </div>

                <div className={"flex gap-x-2 items-center mr-4"}>
                    {hasFilter && <ColumnFilter table={table} />}
                    {hasAddButton && (
                          <AddButton link={addButtonLink} onClick={openDialog} /> 
                    )}
                </div>
            </div>

            {/* Table rendering logic */}
            <div className="rounded-3xl bg-child-black overflow-hidden">
                <Table className={"overflow-hidden"}>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
