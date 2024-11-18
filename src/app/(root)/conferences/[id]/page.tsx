import {format} from "date-fns";
import Link from "next/link";
import {FaDollarSign, FaClock} from "react-icons/fa";
import {TbArrowNarrowLeft} from "react-icons/tb";

import CountdownTimer from "@/components/custom/CountdownTimer";
import PostArticleForm from "@/components/forms/post-article-form";
import {formatDate} from "@/functions/formats";
import {getConferenceById} from "@/lib/actions/conference.action";
import {getDirectionByConferenceId} from "@/lib/actions/direction.action";
import {ConferenceType} from "@/types";

export default async function ConferencesSingleItem({params}: { params: { id: number } }) {

    const data = (await getConferenceById(params.id)) as ConferenceType || {};
    const directions = (await getDirectionByConferenceId(params.id)) as ConferenceType[];
    return (
        <div className="container my-10">
            <Link href="/conferences" className="flex items-center gap-[2px] pb-5">
                <TbArrowNarrowLeft className="size-5 text-black" size={24}/>
                Barcha konferensiyalar
            </Link>
            <div className="mx-auto rounded-lg bg-white px-6 py-12 shadow-lg lg:px-10">
                <h2 className="mb-6 text-center text-3xl font-bold text-violet-700">
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

                    <>
                        <p className="mb-2 text-lg font-medium text-gray-900">Konferensiya yo&apos;nalishlari</p>
                        <p className="list-decimal pl-5 text-xl font-semibold">• {directions.map(direction => direction?.name)}</p>
                    </>

                    <div className="border-b pb-4">
                        <p className="mb-2 text-lg font-medium text-gray-900">Konferensiya haqida ma&apos;lumot:</p>
                        <p className="text-gray-600">{data?.description}</p>
                    </div>

                    <div className="border-b pb-4">
                        <p className="mb-2 text-lg font-medium text-gray-900">Konferensiyada ishtirok etish tartibi:</p>
                        <p className="text-gray-600">{data?.requirements}</p>
                    </div>

                    <div className="flex space-x-2">
                        <span><span className="font-medium text-gray-900">Manzil:</span> {data?.address}</span>
                    </div>

                    <div className="mt-8 flex flex-col items-center">
                        <p className="text-4xl font-bold text-violet-700">{data?.newApplicationsCount}</p>
                    </div>

                    <div className="mt-10 text-center lowercase">
                        <CountdownTimer
                            targetDate={data.deadlineForThesis}
                            classNames="border-2 border-violet-600 text-3xl py-2 px-4 rounded-lg text-violet-600"
                        />
                    </div>
                </div>
                <PostArticleForm name={data?.name} id={data?.id} direction={directions}/>
            </div>
        </div>
    );
}
