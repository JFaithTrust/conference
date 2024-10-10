
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

  // Page raqamlarini olish
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className={`flex items-center justify-between px-2 ${className}`}>
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
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
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          {/* Birinchi pagega o'tish */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>

          {/* Oldingi pagega o'tish */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          {/* Page raqamlari */}
          {pageNumbers.map((page) => (
            <Button
              key={page}
              variant={pageIndex + 1 === page ? "primary-btn" : "outline"} // Hozirgi sahifa belgilangan bo'ladi
              className="h-8 w-8 p-0"
              onClick={() => table.setPageIndex(page - 1)} // Bosilganda sahifaga yo'naltirish
              disabled={pageIndex + 1 === page}
            >
              {page}
            </Button>
          ))}

          {/* Keyingi pagega o'tish */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>

          {/* Oxirgi page ga o'tish */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
          >
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// import {
//     ChevronLeftIcon,
//     ChevronRightIcon,
//     DoubleArrowLeftIcon,
//     DoubleArrowRightIcon,
//   } from "@radix-ui/react-icons"
//   import { Table } from "@tanstack/react-table"
  
//   import { Button } from "@/components/ui/button"
//   import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
//   } from "@/components/ui/select"
  
//   interface DataTablePaginationProps<TData> {
//     table: Table<TData>
//     className?: string
//   }
  
//   export function CustomPagination<TData>({
//     table,
//     className,
//   }: DataTablePaginationProps<TData>) {
//     return (
//       <div className={`flex items-center justify-between px-2 ${className}`}>
//         <div className="flex-1 text-sm text-muted-foreground">
//           {table.getFilteredSelectedRowModel().rows.length} of{" "}
//           {table.getFilteredRowModel().rows.length} row(s) selected.
//         </div>
//         <div className="flex items-center space-x-6 lg:space-x-8">
//           <div className="flex items-center space-x-2">
//             <p className="text-sm font-medium">Rows per page</p>
//             <Select
//               value={`${table.getState().pagination.pageSize}`}
//               onValueChange={(value) => {
//                 table.setPageSize(Number(value))
//               }}
//             >
//               <SelectTrigger className="h-8 w-[70px]">
//                 <SelectValue placeholder={table.getState().pagination.pageSize} />
//               </SelectTrigger>
//               <SelectContent side="top">
//                 {[10, 20, 30, 40, 50].map((pageSize) => (
//                   <SelectItem key={pageSize} value={`${pageSize}`}>
//                     {pageSize}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="flex w-[100px] items-center justify-center text-sm font-medium">
//             Page {table.getState().pagination.pageIndex + 1} of{" "}
//             {table.getPageCount()}
//           </div>
//           <div className="flex items-center space-x-2">
//             <Button
//               variant="outline"
//               className="hidden h-8 w-8 p-0 lg:flex"
//               onClick={() => table.setPageIndex(0)}
//               disabled={!table.getCanPreviousPage()}
//             >
//               <span className="sr-only">Go to first page</span>
//               <DoubleArrowLeftIcon className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="outline"
//               className="h-8 w-8 p-0"
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               <span className="sr-only">Go to previous page</span>
//               <ChevronLeftIcon className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="outline"
//               className="h-8 w-8 p-0"
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//             >
//               <span className="sr-only">Go to next page</span>
//               <ChevronRightIcon className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="outline"
//               className="hidden h-8 w-8 p-0 lg:flex"
//               onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//               disabled={!table.getCanNextPage()}
//             >
//               <span className="sr-only">Go to last page</span>
//               <DoubleArrowRightIcon className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     )
//   }