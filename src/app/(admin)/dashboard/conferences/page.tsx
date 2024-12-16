

import {Suspense} from "react";

import {conferenceColumn} from "@/app/(admin)/dashboard/conferences/all/conference-column";
import {DataTable} from "@/components/custom/data-table";
import TableSkeleton from "@/components/custom/skletons/table-skleton";
import {getAllConferences} from "@/lib/actions/conference.action";
import {ConferenceType} from "@/types";

async function ConferenceTable() {
    const [conferenceData] = await Promise.all([getAllConferences()]);
    return (
        <div>
            <h1>Konferensiyalar ro`yxati</h1>
            <Suspense fallback={<TableSkeleton />}>
                <DataTable
                    columns={conferenceColumn}
                    data={conferenceData as ConferenceType[]}
                    hasAddButton={true}
                    hasFilter={true}
                    hasPagination={true}
                />
            </Suspense>
        </div>
    );
}

export default ConferenceTable
