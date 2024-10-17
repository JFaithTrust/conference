import { ScrollArea } from "@/components/ui/scroll-area";
import { usersColumn } from "@/app/(test)/husniddin/users-column";
import { DataTable } from "@/components/custom/data-table";
import { getAllUsers } from "@/lib/actions/user.action";

const ReviwersPage = async () => {
  const userData = await getAllUsers();


  return (
    <div>
      <div>
        +
      </div>
      <ScrollArea className="h-[100vh] bg-slate-100">
      <DataTable
          columns={usersColumn}
          data={userData}
          hasAddButton={true}
          hasFilter={false}
          hasPagination={true}
        />
      </ScrollArea>
    </div>
  );
};

export default ReviwersPage;

