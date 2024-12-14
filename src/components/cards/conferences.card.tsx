import Link from "next/link";
import React from "react";
import {FaLocationDot} from "react-icons/fa6";

import CustomImage from "@/components/custom/image";
import {formatDate} from "@/functions/formats";
import {IConference} from "@/types";

import CountDownConference from "../custom/CountDownConference";

export const Card = ({data}: { data: IConference }) => {
    return (
        <div
            className="group relative inline-block w-full max-w-[350px] cursor-pointer overflow-hidden rounded-lg bg-white drop-shadow-lg hover:drop-shadow-xl">
            <div className="h-[230px] overflow-hidden object-cover">
                <CustomImage src={"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={data.name} />
                <div className="absolute right-4 top-[10px] rounded-md bg-black/40 px-2 text-white">
                    <CountDownConference targetDate={data.deadlineForThesis}/>
                </div>
                <div className="absolute left-4 top-[10px] rounded-md bg-black/40 px-2 lowercase text-white">
                    {formatDate(data?.deadlineForThesis, false)}
                </div>
            </div>
            <div className="p-5">
                <h3 className="line-clamp-2 h-[50px] text-lg font-medium leading-[22px]">
                    {data.name}
                </h3>
                <p className="line-clamp-2 h-[60px] pt-2 text-justify font-normal">
                    {data.description}
                </p>
                <div className="flex items-center gap-1">
                    <FaLocationDot/>
                    <p className="text-sm font-normal text-primary">{data.address}</p>
                </div>
            </div>
            <div className="group relative">
                <div
                    className="absolute bottom-4 left-1/2 w-[90%] -translate-x-1/2 translate-y-10 bg-red-200 opacity-0 transition-all duration-300 group-hover:-translate-y-0 group-hover:opacity-100">
                    <Link
                        href={`/conferences/${data.id}`}
                        className="block w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 text-center font-semibold text-white shadow-lg transition-transform duration-300 ease-in-out hover:shadow-xl"
                    >
                        Batafsil
                    </Link>
                </div>
            </div>
        </div>
    );
};
