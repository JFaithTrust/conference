import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import  {usersColumn}  from "@/app/(test)/husniddin/users-column";
import { DataTable } from "@/components/custom/data-table";
// import { TicketsAll } from "@/lib/actions/auth.action";
import { Suspense } from "react";
import { getAllUsers } from "@/lib/actions/user.action";
// import SkeletonTable from "@/components/custom/skeleton-table";

const Users = async () => {
  const userData = await getAllUsers();

  console.log(userData);
  

  return (
    <div className="space-y-4">
      <h2 className="font-normal text-2xl text-white">Shikoyatlar</h2>
      {/* <Suspense fallback={<SkeletonTable />}> */}
        <ScrollArea className="h-[80vh]">
          <DataTable
            columns={usersColumn}
            data={userData}
            hasAddButton={true}
            hasFilter={true}
          />
        </ScrollArea>
      {/* </Suspense> */}
    </div>
  );
};

export default Users;