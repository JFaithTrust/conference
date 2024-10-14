import { ScrollArea } from "@/components/ui/scroll-area";
import { usersColumn } from "@/app/(admin)/dashboard/users/users-column";
import { DataTable } from "@/components/custom/data-table";
import { getAllUsers } from "@/lib/actions/user.action";
import { Suspense } from "react";
import Loading from "@/components/loading/loading";

const Users = async () => {
  const userData = await getAllUsers();

  return (
    <div>
      <ScrollArea className="h-[100vh] bg-slate-100">
        <Suspense fallback={<Loading />}>
          <DataTable
            columns={usersColumn}
            data={userData}
            hasAddButton={false}
            hasFilter={true}
            hasPagination={true}
          />
        </Suspense>
      </ScrollArea>
    </div>
  );
};

export default Users;

