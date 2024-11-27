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
import {clsx} from "clsx";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import {AiOutlineSearch} from "react-icons/ai";

import {AddButton} from "@/components/custom/add-button";
import {ColumnFilter} from "@/components/custom/column-filter";
import {CustomPagination} from "@/components/custom/custom-pagination";
import {Input} from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {formUrlQuery, removeKeysFromUrlQuery} from "@/lib/url";

interface TableProps<D, V> {
    columns: ColumnDef<D, V>[]
    data: D[]
    hasFilter?: boolean
    hasSearchbar?: boolean
    hasPagination?: boolean
    hasAddButton?: boolean
    addButtonLink?: string
    // openDialog?: () => void
    // searchedBy?: string
    // isReportPage?: boolean
    route?: string
}

export function DataTable<D, V>({
                                    columns,
                                    data,
                                    hasFilter = false,
                                    hasPagination = false,
                                    hasAddButton = false,
                                    addButtonLink,
                                    route,
                                }: TableProps<D, V>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";
    const [searchQuery, setSearchQuery] = useState(query)


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "query",
                    value: searchQuery
                })

                router.push(newUrl, {scroll: false})
            } else {
                if (pathname === route) {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["query"]
                    })

                    router.push(newUrl, {scroll: false})
                }
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, router, route, searchParams, pathname]);

    const table = useReactTable({
        initialState: {
            globalFilter: "",
        },
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        // onPaginationChange: setPagination,
        manualFiltering: false,
        state: {
            // pagination,
            sorting,
            globalFilter: searchQuery,
            columnFilters,
            columnVisibility,
        }
    })
    return (
        // px-[30px]
        <div className={clsx("flex flex-col gap-y-[18px]")}>
            <div className={"flex items-center justify-between"}>
                {/* Search Bar and Filter (if needed) */}
                <div className="relative max-w-[300px] py-4">
                      <span
                          className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                        <AiOutlineSearch className=" size-5"/>
                      </span>
                    <div className={"rounded-md"}>
                        <Input
                            placeholder={"Enter name..."}
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            className="w-[300px] pl-10"
                            // className="max-w-sm"
                        />
                    </div>
                </div>

                <div className={"flex items-center gap-x-2"}>
                    {hasFilter && <ColumnFilter table={table}/>}
                    {hasAddButton && (
                        <AddButton
                            link={addButtonLink}
                        />
                    )}
                </div>
            </div>

            {/* Table rendering logic */}
            <Table className="overflow-hidden rounded-md bg-mainwhite drop-shadow">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead className="bg-indigo-500 font-medium text-white" key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell, cellIndex) => (
                                    <TableCell
                                        key={cell.id}
                                        className={clsx({
                                            "min-w-28 flex justify-end items-center": cellIndex === row.getVisibleCells().length - 1, // Oxirgi ustun bo'lsa `max-w-32` klassi qo'shiladi
                                        })}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
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
            {hasPagination && <CustomPagination table={table} className="pb-7 pt-10"/>}
        </div>
    );
}
