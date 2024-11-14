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
import {DataTable} from "@/components/custom/data-table";
import ChangeStatusModal from "@/components/modals/change-status.modal";
import ReviewerModal from "@/components/modals/reviewer.modal";
import {getAllReviewers, getAllUsers} from "@/lib/actions/user.action";
import {UserType} from "@/types";

const Users = async () => {
    const [reviewerData, userData] = await Promise.all([getAllReviewers(), getAllUsers()]);

    return (
        <>
            <ReviewerModal data={userData as UserType[]} label={"Iltimos tahlilchi qo'shing"} />
            <ChangeStatusModal title={"Tahlilchini ishdan bo'shatishni xoxlaysizmi?"} page={"reviewers"}/>
            <Suspense>
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
