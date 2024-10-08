// import { ScrollArea } from "@/components/ui/scroll-area";
// import React from "react";
// import  {usersColumn}  from "@/app/(test)/husniddin/users-column";
// import { DataTable } from "@/components/custom/data-table";
// // import { TicketsAll } from "@/lib/actions/auth.action";
// import { Suspense } from "react";
// import { getAllUsers } from "@/lib/actions/user.action";
// // import SkeletonTable from "@/components/custom/skeleton-table";

// const Users = async () => {
//   const userData = await getAllUsers();

//   console.log(userData);
  

//   return (
//     <div>
//       {/* <Suspense fallback={<SkeletonTable />}> */}
//         <ScrollArea className="h-[80vh] bg-slate-100">
//           <DataTable
//             columns={usersColumn}
//             data={userData}
//             hasAddButton={false}
//             hasFilter={false}
//           />
//         </ScrollArea>
//       {/* </Suspense> */}
//     </div>
//   );
// };

// export default Users;


import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { usersColumn } from "@/app/(test)/husniddin/users-column";
import { DataTable } from "@/components/custom/data-table";
import { UserType } from "@/types";

// Statik usersData
const usersData: UserType[] = [
  {
    id: 1,
    fullName: "Javlon Bekzodov",
    email: "javlon.bekzodov@example.com",
    phoneNumber: "+998901234567",
    role: "USER",
    userStatus: "Active"
  },
  {
    id: 2,
    fullName: "Shahnoza Ismailova",
    email: "shahnoza.ismailova@example.com",
    phoneNumber: "+998901234568",
    role: "REVIEWER",
    userStatus: "Blocked"
  },
  {
    id: 3,
    fullName: "Ulug'bek Hamidov",
    email: "ulugbek.hamidov@example.com",
    phoneNumber: "+998901234569",
    role: "SUPER_ADMIN",
    userStatus: "Active"
  },
  {
    id: 4,
    fullName: "Doston Nurmedov",
    email: "doston.nurmedov@example.com",
    phoneNumber: "+998901235667",
    role: "SUPER_ADMIN",
    userStatus: "Active"
  },
  {
    id: 5,
    fullName: "Aleksey Nurmedov",
    email: "aleksey.nurmedov@example.com",
    phoneNumber: "+998901235667",
    role: "USER",
    userStatus: "Blocked"
  },
  {
    id: 6,
    fullName: "Dimitriy Nurmedov",
    email: "dimitriy.nurmedov@example.com",
    phoneNumber: "+998901235667",
    role: "USER",
    userStatus: "Active"
  }
];

const Users = () => {

  return (
    <div>
      <ScrollArea className="h-[80vh] bg-slate-100">
        <DataTable
          columns={usersColumn} // UserType bilan mos bo'lgan columnlar
          data={usersData} // Statik ma'lumotlar UserType bilan mos
          hasAddButton={false}
          hasFilter={true}
          hasPagination={true}
        />
      </ScrollArea>
    </div>
  );
};

export default Users;
