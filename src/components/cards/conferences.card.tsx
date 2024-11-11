import React from "react";
import {ConferenceType} from "@/types";
import CountDownConference from "../custom/CountDownConference";
import {FaLocationDot} from "react-icons/fa6";
import {formatDate} from "@/functions/formats";
import Link from "next/link";

export const Card = ({data}: { data: ConferenceType }) => {
    return (
        <div
            className="group cursor-pointer drop-shadow-lg hover:drop-shadow-xl overflow-hidden relative bg-white w-full max-w-[350px] rounded-lg inline-block">
            <div className="overflow-hidden h-[230px] object-cover">
                <img
                    className="group-hover:scale-[1.1] h-full object-center w-full ease-in transition-all duration-300"
                    src={data?.images}
                    alt={data?.name}
                />
                <div className="absolute top-[10px] rounded-md text-white px-2 right-4 bg-black/40">
                    <CountDownConference targetDate={data?.deadlineForThesis}/>
                </div>
                <div className="absolute lowercase top-[10px] rounded-md text-white px-2 left-4 bg-black/40">
                    {formatDate(data?.deadlineForThesis, false)}
                </div>
            </div>
            <div className="p-5">
                <h3 className="text-lg leading-[22px] line-clamp-2 font-medium h-[50px]">
                    {data?.name}
                </h3>
                <p className="text-justify line-clamp-2 pt-2 font-normal">
                    {data?.description}
                </p>
                <div className="flex items-center gap-1">
                    <FaLocationDot/>
                    <p className="text-sm font-normal text-primary">{data?.address}</p>
                </div>
            </div>
            <div className="relative group">
                <div
                    className="absolute bottom-4 w-[90%] bg-red-200 left-1/2 transform -translate-x-1/2 translate-y-10 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0 transition-all duration-300">
                    <Link
                        href={`conferences/${data?.id}`}
                        className="px-6 py-2 block text-center text-white w-full font-semibold rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 transform hover:shadow-xl transition-transform duration-300 ease-in-out"
                    >
                        Batafsil
                    </Link>
                </div>
            </div>
        </div>
    );
};
