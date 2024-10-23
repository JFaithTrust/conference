
import { typesColumn } from "@/app/(test)/husniddin/types-column";
import { DataTable } from "@/components/custom/data-table";
import { getAllDirections } from "@/lib/actions/direction.action";
import Loading from "@/components/loading/loading";
import { Suspense } from "react";
import ShowDataModal from "@/components/modals/show-data.modal";

const Directions = async () => {
  const directionsData = await getAllDirections();

  return (
    <div>
      <ShowDataModal />
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

