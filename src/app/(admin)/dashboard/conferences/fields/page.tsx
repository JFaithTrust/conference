import { Suspense } from "react";

import {fieldColumn} from "@/app/(admin)/dashboard/conferences/fields/field-column";
import { DataTable } from "@/components/custom/data-table";
import Loading from "@/components/loading/loading";
import ChangeStatusModal from "@/components/modals/change-status.modal";
import ReviewerDataModal from "@/components/modals/reviewer-data.modal";
import { getAllDirections } from "@/lib/actions/direction.action";
import {IDirection} from "@/types";

const ConferenceFieldsPage = async () => {
    const [directionsData] = await Promise.all([getAllDirections()]);

    return (
        <div>
            <ChangeStatusModal
                title={"Yo'nalishni o'chirishni xohlaysizmi?"}
                page={"fields"}
            />
            <ReviewerDataModal />
            <Suspense fallback={<Loading />}>
                <DataTable
                    columns={fieldColumn}
                    data={directionsData as IDirection[]}
                    hasAddButton={true}
                    hasFilter={false}
                    hasPagination={true}
                    addButtonLink={"/dashboard/conferences/fields/create"}
                    route={"/dashboard/conferences/fields"}
                />
            </Suspense>
        </div>
    );
};

export default ConferenceFieldsPage;

