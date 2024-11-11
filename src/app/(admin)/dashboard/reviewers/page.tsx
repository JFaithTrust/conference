// import {usersColumn} from "@/app/(admin)/dashboard/users/users-column";
// import {DataTable} from "@/components/custom/data-table";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { getAllUsers } from "@/lib/actions/user.action";
// import {UserType} from "@/types";
//
// const ReviewersPage = async () => {
//     const userData = await getAllUsers();
//
//     return (
//         <div>
//             <ScrollArea className="h-screen bg-slate-100">
//                 <DataTable
//                     columns={usersColumn}
//                     data={userData as UserType[]}
//                     hasAddButton={true}
//                     hasFilter={true}
//                     addButtonLink="sddsf"
//                     // openDialog={true}
//                     hasPagination={true}
//                 />
//             </ScrollArea>
//         </div>
//     );
// };
//
// export default ReviewersPage;

import {Suspense} from "react";

import {reviewerColumn} from "@/app/(admin)/dashboard/reviewers/reviewer-column";
import Loading from "@/app/(admin)/dashboard/users/loading";
import {DataTable} from "@/components/custom/data-table";
import ChangeStatusModal from "@/components/modals/change-status.modal";
import {getAllReviewers} from "@/lib/actions/user.action";
import {UserType} from "@/types";

const Users = async () => {
    const [reviewerData] = await Promise.all([getAllReviewers()]);

    return (
        <>
            <ChangeStatusModal/>
            <Suspense fallback={<Loading/>}>
                <DataTable
                    columns={reviewerColumn}
                    data={reviewerData as UserType[]}
                    hasAddButton={true}
                    hasFilter={true}
                    hasPagination={true}
                    route="/dashboard/reviewers"
                />
            </Suspense>
        </>
    );
};

export default Users;
