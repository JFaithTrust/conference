import Link from "next/link";
import {FaArrowLeftLong} from "react-icons/fa6";

import {Button} from "@/components/ui/button";
import {getUserById} from "@/lib/actions/user.action";
import {UserType} from "@/types";

const UserInfo = async ({params}: { params: { userId: string } }) => {
    const [userData] = await Promise.all([getUserById(params.userId)]) as UserType[];

    return (
        <div>
            <div className="flex flex-col gap-y-[18px]">
                <Link
                    href={"/dashboard/users"}
                    className="inline-flex w-fit items-center justify-center gap-2 rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-medium text-destructive-foreground shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                    <FaArrowLeftLong className="size-4 text-white"/>
                    Back
                </Link>
                <div
                    className="flex flex-col gap-y-[18px] rounded-xl border border-solid border-[#DCDBFA] bg-mainwhite p-[18px]">
                    <h2 className="text-3xl font-semibold">
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
                            <span className="text-sm font-normal">Status</span>
                            <Button
                                className={`px-12 py-3 text-white ${userData.userStatus === "INACTIVE"
                                    ? "bg-status-red hover:bg-status-red/85"
                                    : "bg-status-green hover:bg-status-green/85"
                                }`}
                            >
                                {userData.userStatus}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;



