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
import React from "react";
import { CustomPagination } from "@/components/custom/custom-pagination";
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
    globalFilterFn,
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
    <div className={clsx("flex flex-col gap-y-[18px] px-[30px]")}>
      <div className={"flex items-center justify-between"}>
        {/* Search Bar and Filter (if needed) */}
        <div className="relative max-w-[300px] py-4">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
            <AiOutlineSearch className=" size-5" />
          </span>
          <div className={"rounded-md"}>
            <Input
              placeholder={"Enter name..."}
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="pl-10 w-[300px]"
            // className="max-w-sm"
            />
          </div>
        </div>

        <div className={"flex gap-x-2 items-center"}>
          {hasFilter && <ColumnFilter table={table} />}
          {hasAddButton && (
            <AddButton link={addButtonLink} onClick={openDialog} />
          )}
        </div>
      </div>

      {/* Table rendering logic */}
          <Table className="overflow-hidden bg-mainwhite rounded-md drop-shadow">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead className="font-medium bg-indigo-500 text-white" key={header.id}>
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
        {hasPagination && <CustomPagination table={table} className="pt-10 pb-7" />}
      </div>
  );
}
