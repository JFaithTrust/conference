import {Suspense} from "react";

import {conferenceColumn} from "@/app/(admin)/dashboard/conferences/all/conference-column";
import {DataTable} from "@/components/custom/data-table";
import TableSkeleton from "@/components/custom/skletons/table-skleton";
import ChangeStatusModal from "@/components/modals/change-status.modal";
import {getAllConferences} from "@/lib/actions/conference.action";
import {ConferenceType} from "@/types";

const AllConferencePage = async () => {
    const [conferenceData] = await Promise.all([getAllConferences()]);
    console.log(conferenceData);

    return (
        <>
            <ChangeStatusModal title={"Konferensiyani o'chirishni xoxlaysizmi?"} page={"reviewers"}/>
            <Suspense fallback={<TableSkeleton/>}>
                <DataTable
                    columns={conferenceColumn}
                    data={conferenceData as ConferenceType[]}
                    hasAddButton={true}
                    hasFilter={true}
                    hasPagination={true}
                    route="/dashboard/reviewers"
                    addButtonLink={"/dashboard/conferences/all/create"}
                />
            </Suspense>
        </>
    );
};

export default AllConferencePage;
