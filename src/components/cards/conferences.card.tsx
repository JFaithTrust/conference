import React from "react";

import { ConferenceType } from "@/types";

import CountDownConference from "../custom/CountDownConference";
export const Card = ({ data }: { data: ConferenceType }) => {
  return (
    <div className="group relative inline-block min-h-[380px] w-full max-w-[400px]  cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl md:min-h-[438px]">
      <div className="h-[230px] overflow-hidden object-cover">
        <img
          className="transition-all duration-300 group-hover:scale-110"
          src={data?.images}
          alt={data?.name}
        />
      </div>
      <div className="p-5 ">
        <div className="flex items-start justify-end gap-8">
          {/* {formatDate(data?.deadlineForThesis, false)} */}
          <CountDownConference targetDate={data?.deadlineForThesis} />
        </div>
        <h3 className="text-lg font-medium">
          {data?.name.slice(0, 55)}
          {data?.name.slice(0, 55).length > 0 && "..."}
        </h3>
        <p className="text-base font-normal">
          {data?.description?.slice(0, 145)}
          {data?.description?.slice(0, 145)?.length &&
            data?.description?.slice(0, 145)?.length > 0 &&
            "..."}
        </p>
        <div className="flex items-center gap-3">
          {/* <img src="/public/location.svg" alt="icon" /> */}
          <p className="text-sm font-normal text-primary">{data?.address}</p>
        </div>
      </div>
    </div>
  );
};
