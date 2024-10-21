
// import { Button } from "@/components/ui/button";
// import { FaArrowLeftLong } from "react-icons/fa6";
// import { getAllUsers } from "@/lib/actions/user.action";
// import { UserType } from "@/types";
// import { DataTable } from "@/components/custom/data-table";
// import { reviewersColumn } from "./reviewers.column";

// const TypeCreate = async () => {
//   const allReviewers: UserType[] = await getAllUsers("REVIEWER");

 
//   return (
//     <div className="flex flex-col gap-y-[18px] px-[30px]">
//       <Button
//         className="w-fit px-[18px] py-[12px] flex gap-y-2"
//         onClick={() => router.back()}
//       >
//         <FaArrowLeftLong className="text-white w-6 h-4" />
//         Back
//       </Button>

//       {/* DataTable component */}
//       <DataTable
//         columns={reviewersColumn}
//         data={allReviewers}
//         hasPagination={true}
//         hasSearchbar={true}
//         hasAddButton={true} 
//         openDialog={() => console.log("Open modal for adding new reviewer")}
//       />
//     </div>
//   );
// };

// export default TypeCreate;
