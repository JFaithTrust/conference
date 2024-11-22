import columns from "@/app/(root)/articles/my-articles-page";
import {DataTable} from "@/components/custom/data-table";
import {getApplicationByCurrentUser} from "@/lib/actions/application.action";
import {IApplication} from "@/types";

const ArticlesPage = async () => {
    const [applicationData] = await Promise.all([getApplicationByCurrentUser()])
    return (
        <div className={"container mt-6 space-y-6"}>
            <h1 className="text-3xl font-semibold text-gray-800">
                Mening maqolalarim
            </h1>
            <DataTable
                columns={columns}
                data={applicationData as IApplication[]}
                hasPagination={true}
                hasFilter={true}
                route={"/articles"}
            />
        </div>
    );
};

export default ArticlesPage;
