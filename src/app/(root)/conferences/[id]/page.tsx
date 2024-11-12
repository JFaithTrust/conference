import {getConferenceById} from "@/lib/actions/conference.action";
import {ConferenceType} from "@/types";
import {formatDate} from "@/functions/formats";
import CountdownTimer from "@/components/custom/CountdownTimer";
import {format} from "date-fns";
import {FaMapMarkerAlt, FaDollarSign, FaClock} from "react-icons/fa";
import Link from "next/link";
import {TbArrowNarrowLeft} from "react-icons/tb";

export default async function ConferencesSingleItem({params}: { params: { id: string } }) {
    const data = (await getConferenceById(params.id)) as ConferenceType || {};
    return (
        <div className="container my-10">
            <Link href="/conferences" className="flex gap-[2px] items-center pb-5">
                <TbArrowNarrowLeft className="w-5 h-5 text-black" size={24}/>
                Barcha konferensiyalar
            </Link>
            <div className="py-12 px-6 lg:px-10 bg-white rounded-lg shadow-lg mx-auto">
                <h2 className="text-3xl font-bold text-center text-violet-700 mb-6">
                    {data?.name}
                </h2>

                <div className="space-y-4 text-gray-700">
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-2">
                            <FaClock className="text-violet-500"/>
                            <p>Ro&apos;yxatdan o&apos;tish muddati:</p>
                        </div>
                        <p className="font-semibold lowercase">{formatDate(data.deadlineForThesis, false)}</p>
                    </div>

                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-2">
                            <FaClock className="text-violet-500"/>
                            <p>Boshlanish vaqti:</p>
                        </div>
                        <p className="font-semibold">{format(data.startsAt, "dd.MM.yyyy")}</p>
                    </div>

                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-2">
                            <FaClock className="text-violet-500"/>
                            <p>Tugash vaqti:</p>
                        </div>
                        <p className="font-semibold">{format(data.endsAt, "dd.MM.yyyy")}</p>
                    </div>

                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-2">
                            <FaDollarSign className="text-green-500"/>
                            <p>Konferensiya narxi:</p>
                        </div>
                        <p className="font-semibold">{`${data?.cost} so'm`}</p>
                    </div>

                    <div className="border-b pb-4">
                        <p className="text-lg font-medium text-gray-900 mb-2">Konferensiya haqida ma&apos;lumot:</p>
                        <p className="text-gray-600">{data?.description}</p>
                    </div>

                    <div className="border-b pb-4">
                        <p className="text-lg font-medium text-gray-900 mb-2">Konferensiyada ishtirok etish tartibi:</p>
                        <p className="text-gray-600">{data?.requirements}</p>
                    </div>

                    <div className="flex space-x-2">
                        <span className=""><span className="font-medium text-gray-900">Manzil:</span> {data?.address}</span>
                    </div>

                    <div className="flex flex-col items-center mt-8">
                        <p className="text-4xl font-bold text-violet-700">{data?.newApplicationsCount}</p>
                    </div>

                    <div className="mt-10 text-center lowercase">
                        <CountdownTimer
                            targetDate={data.deadlineForThesis}
                            classNames="border-2 border-violet-600 text-3xl py-2 px-4 rounded-lg text-violet-600"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
