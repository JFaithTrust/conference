import { ScrollArea } from "@/components/ui/scroll-area";
import { typesColumn } from "@/app/(test)/husniddin/types-column";
import { DataTable } from "@/components/custom/data-table";
import { getAllDirections } from "@/lib/actions/direction.action";
import ChangeStatusModal from "@/components/modals/change-status.modal";
import Loading from "@/components/loading/loading";
import { Suspense } from "react";

const Directions = async () => {
  const directionsData = await getAllDirections();

  console.log("data: ",directionsData);


  return (
<div>
<ChangeStatusModal/>
    <Suspense fallback={<Loading />}>
        <DataTable
            columns={typesColumn}
            data={directionsData}
            hasAddButton={true}
            hasFilter={false}
            hasPagination={true}
        />
    </Suspense>
</div>
  );
};

export default Directions;

