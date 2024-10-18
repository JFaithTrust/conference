import React from "react";
import { ConferenceType } from "@/types";
import CountDownConference from "../custom/CountDownConference";
export const Card = ({ data }: { data: ConferenceType }) => {
  return (
    <div className="group hover:translate-y-[-10px] cursor-pointer shadow-lg transition-all duration-300  hover:shadow-xl overflow-hidden relative bg-white min-h-[380px] w-full max-w-[400px] md:min-h-[438px] rounded-lg inline-block">
      <div className="overflow-hidden h-[230px] object-cover">
        <img
          className="group-hover:scale-[1.1] transition-all duration-300"
          src={data?.images}
          alt={data?.name}
        />
      </div>
      <div className="p-5 ">
        <div className="flex items-start gap-8 justify-end">
          {/* {formatDate(data?.deadlineForThesis, false)} */}
          {<CountDownConference targetDate={data?.deadlineForThesis} />}
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
          {/*<img src="/public/location.svg" alt="icon" />*/}
          <p className="text-sm font-normal text-primary">{data?.address}</p>
        </div>
      </div>
    </div>
  );
};
