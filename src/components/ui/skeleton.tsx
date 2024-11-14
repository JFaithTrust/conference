// ui/skeleton.tsx:
import React from "react";

import { cn } from "@/lib/utils";

function Skeleton({
                    className,
                    ...props
                  }: React.HTMLAttributes<HTMLDivElement>) {
  return (
      <div className={cn("relative overflow-hidden rounded-md bg-slate-300", className)} {...props}>
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
      </div>
  );
}

export { Skeleton };



// import React from "react";
//
// import { cn } from "@/lib/utils"
//
// function Skeleton({
//   className,
//   ...props
// }: React.HTMLAttributes<HTMLDivElement>) {
//   return (
//     <div
//       className={cn("animate-pulse rounded-md bg-primary/10", className)}
//       {...props}
//     />
//   )
// }
//
// export { Skeleton }
