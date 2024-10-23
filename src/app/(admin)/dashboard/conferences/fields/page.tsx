import { DataTable } from "@/components/custom/data-table";
import { getAllDirections } from "@/fetch-api/fetchConferences";
import { fieldsColumn } from "./fields-column";


const DirectionFieldsPage = async () => {
  const data = await getAllDirections();
  return (
    <div className="p-4 md:p-8">
      <DataTable
        columns={fieldsColumn}
        data={data}
        hasPagination
        hasSearchbar
        hasFilter
        hasAddButton
        addButtonLink="/dashboard/conferences/fields/fields-create"
      />
    </div>
  );
};

export default DirectionFieldsPage;
