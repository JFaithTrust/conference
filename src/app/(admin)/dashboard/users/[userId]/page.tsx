"use client";

import { getUserById } from "@/lib/actions/user.action";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/loading";

const UserInfo = ({ params }: { params: { userId: number } }) => {
  const [userData, setUserData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const data = await getUserById(params.userId);
      setUserData(data);
      setLoading(false);
    };
    getUserData();
  }, [params.userId]);

  return (
    <div>
      {userData && (
        <div className="flex flex-col gap-y-[18px] px-[30px]">
          <Button
            className="w-fit px-[18px] py-[12px] flex gap-y-2 mt-4"
            variant="primary"
            onClick={() => router.back()}
          >
            <FaArrowLeftLong className="text-white w-6 h-4" />
            Back
          </Button>
          <div className="flex p-[18px] flex-col gap-y-[18px] bg-mainwhite rounded-xl border-[1px] border-solid border-[#DCDBFA]">
            {loading ? (
              <Loading />
            ) : (
              <>
                <h2 className="font-semibold font-source-serif-pro text-3xl">
                  Foydalanuvchi ma&apos;lumotlari
                </h2>
                <div className="flex flex-col gap-y-2">
                  <span className="text-sm">FISH : </span>
                  <span>{userData.fullName}</span>
                </div>
                <div className="flex flex-col gap-y-2">
                  <span className="text-sm">Telefon Nomeri :</span>
                  <span>{userData.phoneNumber}</span>
                </div>

                <div className="flex flex-row justify-between">
                  <div className="flex flex-col gap-y-2">
                    <span className="font-normal text-sm">Status</span>
                    <Button
                      className={`py-3 px-12 hover:text-white ${userData.userStatus === "INACTIVE"
                          ? "bg-status-red hover:bg-status-red/85"
                          : "bg-status-green hover:bg-status-green/85"
                        }`}
                    >
                      {userData.userStatus}
                    </Button>
                  </div>

                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;



