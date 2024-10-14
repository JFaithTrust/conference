// import React from "react";
// import { motion } from "framer-motion";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { FiChevronsRight } from "react-icons/fi";
// import Link from "next/link";
// import { RiFileUserFill } from "react-icons/ri";
//
// const Logo = () => (
//   <motion.div layout
//   className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600">
//     <svg width="24" height="auto" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-slate-50">
//       <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" />
//       <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" />
//     </svg>
//   </motion.div>
// );
//
// const TitleSection = ({ open }: { open: boolean }) => {
//   return (
//     <Popover>
//       <PopoverTrigger>
//         <div className="mb-3 border-b border-slate-300 pb-3">
//           <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100 p-2">
//             <div className="flex items-center gap-2">
//               <Logo />
//               {open && (
//                 <motion.div
//                 layout
//                 initial={{ opacity: 0, y: 12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.125 }}>
//                   <span className="block text-xs font-semibold text-gray-800">Name & Surname</span>
//                 </motion.div>
//               )}
//             </div>
//             {open && <FiChevronsRight className="mx-2 text-gray-600" />}
//           </div>
//         </div>
//       </PopoverTrigger>
//       <PopoverContent align="end" side="right" className="bg-myindigo border border-gray-300 rounded-md shadow-lg p-1 ml-6 w-auto">
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.2 }}
//         >
//           <Link href='/profil' className="text-gray-800 font-bold border border-b-medium text-sm px-2 py-1 mb-1 flex items-center whitespace-nowrap">
//             <RiFileUserFill className="mr-2" />
//             Profil
//           </Link>
//           <Link href='/main' className="text-gray-900 font-bold border border-b-medium text-sm px-2 py-1 flex items-center whitespace-nowrap">
//             <FiChevronsRight className="mr-2" />
//             Chiqish
//           </Link>
//         </motion.div>
//       </PopoverContent>
//     </Popover>
//   );
// };
//

// export default TitleSection;

import { motion } from "framer-motion";
import {FiChevronDown} from "react-icons/fi";


const Logo = () => {
    // Temp logo from https://logoipsum.com/
    return (
        <motion.div
            layout
            className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
        >
            <svg
                width="24"
                height="32"
                viewBox="0 0 50 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-slate-50"
            >
                <path
                    d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                    stopColor="#000000"
                ></path>
                <path
                    d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                    stopColor="#000000"
                ></path>
            </svg>
        </motion.div>
    );
};

export const TitleSection = ({ open }: { open: boolean }) => {
  return (
      <div className="mb-3 border-b border-slate-300 pb-3">
        <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
          <div className="flex items-center gap-2">
            <Logo />
            {open && (
                <motion.div
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.125 }}
                >
                  <span className="block text-xs font-semibold">TomIsLoading</span>
                  <span className="block text-xs text-slate-500">Pro Plan</span>
                </motion.div>
            )}
          </div>
          {open && <FiChevronDown className="mr-2" />}
        </div>
      </div>
  );
};
