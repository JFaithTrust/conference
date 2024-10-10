import { ScrollArea } from "@/components/ui/scroll-area";
import { usersColumn } from "@/app/(test)/husniddin/users-column";
import { DataTable } from "@/components/custom/data-table";
import { getAllUsers } from "@/lib/actions/user.action";

const Users = async () => {
  const userData = await getAllUsers();

  console.log(userData);


  return (
    <div>
      <ScrollArea className="h-[100vh] bg-slate-100">
        <DataTable
          columns={usersColumn}
          data={userData}
          hasAddButton={false}
          hasFilter={false}
          hasPagination={true}
        />
      </ScrollArea>
    </div>
  );
};

export default Users;

