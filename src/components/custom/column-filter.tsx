"use client"

import {Table} from "@tanstack/table-core";
import React from "react";
import {LuListFilter} from "react-icons/lu";

import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface FilterProps<D> {
    table: Table<D>;
}

export function ColumnFilter<D>(props: FilterProps<D>) {

    return (
        <div className="flex gap-x-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                        <Button  className="ml-auto rounded-lg bg-white px-4 py-3 font-medium text-muted-foreground outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                            <LuListFilter className="mr-2 size-4"/>
                            <span>
                            Filter
                            </span>
                        </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {props.table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}