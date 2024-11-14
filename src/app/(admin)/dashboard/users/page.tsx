import {Suspense} from "react";

import {usersColumn} from "@/app/(admin)/dashboard/users/users-column";
import {DataTable} from "@/components/custom/data-table";
import ChangeStatusModal from "@/components/modals/change-status.modal";
import {getAllUsers} from "@/lib/actions/user.action";
import {UserType} from "@/types";

const Users = async () => {
    const [userData] = await Promise.all([getAllUsers()]);

    return (
        <>
            <ChangeStatusModal title={"Foydalamuvchini statusini o'zgartirishni xohlaysizmi?"} page={"users"} />
            <Suspense >
                <DataTable
                    columns={usersColumn}
                    data={userData as UserType[]}
                    hasAddButton={false}
                    hasFilter={true}
                    hasPagination={true}
                    route={"/dashboard/users"}
                />
            </Suspense>
        </>
    );
};

export default Users;