import {usersColumn} from "@/app/(admin)/dashboard/users/users-column";
import {DataTable} from "@/components/custom/data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllUsers } from "@/lib/actions/user.action";

const ReviewersPage = async () => {
    const userData = await getAllUsers();

    return (
        <div>
            <ScrollArea className="h-screen bg-slate-100">
                <DataTable
                    columns={usersColumn}
                    data={userData}
                    hasAddButton={true}
                    hasFilter={true}
                    addButtonLink="sddsf"
                    // openDialog={true}
                    hasPagination={true}
                />
            </ScrollArea>
        </div>
    );
};

export default ReviewersPage;
