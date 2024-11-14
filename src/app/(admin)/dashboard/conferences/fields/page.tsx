import { Suspense } from "react";

import {TypesColumn} from "@/app/(admin)/dashboard/conferences/fields/types-column";
import { DataTable } from "@/components/custom/data-table";
import Loading from "@/components/loading/loading";
import ShowDataModal from "@/components/modals/show-data.modal";
import { getAllDirections } from "@/lib/actions/direction.action";
import {IDirection} from "@/types";


const ConferenceFieldsPage = async () => {
    const [directionsData] = await Promise.all([getAllDirections()]);

    return (
        <div>
            <ShowDataModal />
            <Suspense fallback={<Loading />}>
                <DataTable
                    columns={TypesColumn}
                    data={directionsData as IDirection[]}
                    hasAddButton={true}
                    hasFilter={false}
                    hasPagination={true}
                />
            </Suspense>
        </div>
    );
};

export default ConferenceFieldsPage;

