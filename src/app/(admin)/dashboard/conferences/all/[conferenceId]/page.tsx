import {format} from "date-fns";
import Link from "next/link";
import {FaClock, FaDollarSign} from "react-icons/fa";
import {FaArrowLeftLong} from "react-icons/fa6";

import CountdownTimer from "@/components/custom/CountdownTimer";
import {formatDate} from "@/functions/formats";
import {getConferenceById} from "@/lib/actions/conference.action";
import {getDirectionByConferenceId} from "@/lib/actions/direction.action";

const AdminConferenceDetailPage = async ({params}: { params: { conferenceId: string } }) => {
    // const data = (await getConferenceById(params.conferenceId)) as ConferenceType || {};
    // const applicationData = (await getApplicationByConferenceId(params.conferenceId)) as IApplication[] || [];
    const [conferenceData, directionsData] = await Promise.all([getConferenceById(Number(params.conferenceId)), getDirectionByConferenceId(params.conferenceId)])

    // applicationData getApplicationByConferenceId(params.conferenceId),

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
                className="flex flex-col gap-y-4 rounded-xl bg-white px-10 py-6 shadow">
                    <h2 className="mb-6 text-center text-3xl font-bold text-violet-700">
                        {conferenceData?.name}
                    </h2>

                <div className="space-y-4 text-gray-700">
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-2">
                            <FaClock className="text-violet-500"/>
                            <p>Ro&apos;yxatdan o&apos;tish muddati:</p>
                        </div>
                        {conferenceData &&
                            <p className="font-semibold lowercase">{formatDate(conferenceData.deadlineForThesis, false)}</p>}
                    </div>

                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-2">
                            <FaClock className="text-violet-500"/>
                            <p>Boshlanish vaqti:</p>
                        </div>
                        {conferenceData &&
                            <p className="font-semibold">{format(conferenceData?.startsAt, "dd.MM.yyyy")}</p>
                        }
                    </div>

                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-2">
                            <FaClock className="text-violet-500"/>
                            <p>Tugash vaqti:</p>
                        </div>
                        {conferenceData &&
                            <p className="font-semibold">{format(conferenceData?.endsAt, "dd.MM.yyyy")}</p>
                        }
                    </div>

                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-2">
                            <FaDollarSign className="text-green-500"/>
                            <p>Konferensiya narxi:</p>
                        </div>
                        <p className="font-semibold">{`${conferenceData?.cost} so'm`}</p>
                    </div>

                    <div className="border-b pb-4">
                        <p className="mb-2 text-lg font-medium text-gray-900">Konferensiya haqida
                            ma&apos;lumot:</p>
                        <p className="text-gray-600">{conferenceData?.description}</p>
                    </div>

                    <div className="border-b pb-4">
                        <p className="mb-2 text-lg font-medium text-gray-900">Konferensiya yo&apos;nalishlari:</p>
                        <ul className={"list-disc pl-4"}>
                            {directionsData?.map((direction) => (
                                <li key={direction.id} className="text-gray-600 ">{direction.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-b pb-4">
                        <p className="mb-2 text-lg font-medium text-gray-900">Konferensiyada ishtirok etish
                            tartibi:</p>
                        <p className="text-gray-600">{conferenceData?.requirements}</p>
                    </div>

                    <div className="flex space-x-2">
                                <span className=""><span
                                    className="font-medium text-gray-900">Manzil:</span> {conferenceData?.address}</span>
                    </div>

                    <div className="mt-8 flex flex-col items-center">
                        <p className="text-4xl font-bold text-violet-700">{conferenceData?.newApplicationsCount}</p>
                    </div>

                    <div className="mt-10 text-center lowercase">
                        {conferenceData &&
                            <CountdownTimer
                                targetDate={conferenceData.deadlineForThesis}
                                classNames="border-2 border-violet-600 text-3xl py-2 px-4 rounded-lg text-violet-600"
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminConferenceDetailPage;