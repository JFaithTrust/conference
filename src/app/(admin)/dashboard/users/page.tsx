import { Suspense } from "react";

import { usersColumn } from "@/app/(admin)/dashboard/users/users-column";
import {DataTable} from "@/components/custom/data-table";
import Loading from "@/components/loading/loading";
import ChangeStatusModal from "@/components/modals/change-status.modal";
import { getAllUsers } from "@/lib/actions/user.action";

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