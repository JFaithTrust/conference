import Link from "next/link";
import {FaArrowLeftLong} from "react-icons/fa6";

import ConferenceCreateForm from "@/components/forms/conference.create.form";
import {getAllDirections} from "@/lib/actions/direction.action";
import {IDirection} from "@/types";


const ConferenceCreatePage = async () => {
    const directionData = await getAllDirections();

    return (
        <div className="flex flex-col gap-y-4">
            <Link
                href={"/dashboard/conferences/all"}
                className="inline-flex w-fit items-center justify-center gap-2 rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-medium text-destructive-foreground shadow transition-colors hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
                <FaArrowLeftLong className="size-4 text-white"/>
                Back
            </Link>
            <div
                className="flex flex-col gap-y-4 rounded-xl bg-mainwhite px-10 py-6 shadow">
                <h2 className="text-3xl font-semibold">
                    Yangi konferensiya yaratish
                </h2>
                <ConferenceCreateForm directionData={directionData as IDirection[]} />
            </div>
        </div>
    );
};

export default ConferenceCreatePage;