import Link from "next/link";
import {FaArrowLeftLong} from "react-icons/fa6";

import DirectionForm from "@/components/forms/direction.form";
import {getAllReviewers} from "@/lib/actions/user.action";
import {UserType} from "@/types";

const DirectionCreatePage = async () => {
    const [reviewerData] = await Promise.all([getAllReviewers()]);

    return (
        <div className="flex flex-col gap-y-4">
            <Link
                href={"/dashboard/conferences/fields"}
                className="inline-flex w-fit items-center justify-center gap-2 rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-medium text-destructive-foreground shadow transition-colors hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
                <FaArrowLeftLong className="size-4 text-white"/>
                Back
            </Link>
            <div
                className="flex flex-col gap-y-4 rounded-xl bg-mainwhite px-10 py-6 shadow">
                <h2 className="text-3xl font-semibold">
                    Yangi yo&apos;nalish yaratish
                </h2>
                <DirectionForm reviewerData={reviewerData as UserType[]} />
            </div>
        </div>
    );
};

export default DirectionCreatePage;



