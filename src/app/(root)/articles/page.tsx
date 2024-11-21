

import columns from "@/app/(root)/articles/my-articles-page";
import { DataTable } from "@/components/custom/data-table";
import {getApplicationByConferenceId} from "@/lib/actions/application.action";


const ArticlesPage = async (conferenceId: string) => {
 const [applicationData] = await Promise.all([getApplicationByConferenceId(conferenceId)])
  return (
    <div className={"container"}>
        <h1>Mening maqolalarim</h1>
      <DataTable
        columns={columns}
        data={applicationData}
        hasPagination={true}
        hasFilter={true}
        route={"/articles"}
      />
    </div>
  );
};

export default ArticlesPage;
