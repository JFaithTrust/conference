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
            <ReviewerModal data={userData as UserType[]} label={"Muharrir qo'shish"} />
            <ChangeStatusModal title={"Muharrirni ishdan bo'shatishni xoxlaysizmi?"} page={"reviewers"}/>
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
