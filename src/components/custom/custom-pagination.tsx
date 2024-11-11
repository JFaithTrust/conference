import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  className?: string;
}

export function CustomPagination<TData>({ table, className }: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  // Sahifa raqamlarini ko'rsatish uchun funktsiya
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3; // Hozirgi sahifa atrofida nechta sahifa ko'rinadi

    if (pageCount <= 7) {
      // Agar kam sahifalar bo'lsa hammasini ko'rsatamiz
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
    } else {
      // Birinchi sahifa
      pages.push(1);
      // Oldingi "..." ni qo'shish kerakmi
      if (pageIndex > maxVisiblePages) {
        pages.push("...");
      }
      // Hozirgi, oldingi va keyingi sahifalarni ko'rsatish
      for (
        let i = Math.max(2, pageIndex); // 2 dan boshlanadi (1 allaqachon qo'shilgan)
        i <= Math.min(pageIndex + 2, pageCount - 1);
        i++
      ) {
        pages.push(i);
      }
      // Keyingi "..." ni qo'shish kerakmi
      if (pageIndex + 2 < pageCount - 1) {
        pages.push("...");
      }
      // Oxirgi sahifa
      pages.push(pageCount);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex items-center justify-between px-2 ${className}`}>
      <div className="flex w-full items-center justify-between space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 15, 20].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          {/* Birinchi sahifaga o'tish */}
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <DoubleArrowLeftIcon className="size-4" />
          </Button>

          {/* Oldingi sahifaga o'tish */}
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>

          {/* Sahifa raqamlari */}
          {pageNumbers.map((page, index) => (
            <Button
              key={index}
              variant={page === pageIndex + 1 ? "primary" : "outline"}
              className="size-8 p-0"
              onClick={() => typeof page === "number" && table.setPageIndex(page - 1)}
              disabled={typeof page !== "number"}
            >
              {typeof page === "number" ? page : "⋯"}
            </Button>
          ))}

          {/* Keyingi sahifaga o'tish */}
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="size-4" />
          </Button>

          {/* Oxirgi sahifaga o'tish */}
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
          >
            <DoubleArrowRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
