import { usersColumn } from "@/app/(admin)/dashboard/users/users-column";
import { getAllUsers } from "@/lib/actions/user.action";
import { Suspense } from "react";
import Loading from "@/components/loading/loading";
import {DataTable} from "@/components/custom/data-table";
import ChangeStatusModal from "@/components/modals/change-status.modal";

const Users = async () => {
    const userData = await getAllUsers();

    return (
        <div>
            <ChangeStatusModal />
                <Suspense fallback={<Loading />}>
                    <DataTable
                        columns={usersColumn}
                        data={userData}
                        hasAddButton={false}
                        hasFilter={true}
                        hasPagination={true}
                    />
                </Suspense>
        </div>
    );
};

export default Users;