import {getUserById} from "@/lib/actions/user.action";
import {Button} from "@/components/ui/button";
import {FaArrowLeftLong} from "react-icons/fa6";
import {UserType} from "@/types";
import Link from "next/link";

const UserInfo = async ({params}: { params: { userId: number } }) => {
    const userData: UserType = await getUserById(params.userId);

    return (
        <div>
            {userData && (
                <div className="flex flex-col gap-y-[18px]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ">
                    <Link
                        href={"/dashboard/users"}
                        className="bg-indigo-500 text-destructive-foreground shadow-sm hover:bg-indigo-500 w-fit inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 px-3 py-1.5 gap-2"
                    >
                        <FaArrowLeftLong className="text-white w-4 h-4"/>
                        Back
                    </Link>
                    <div
                        className="flex p-[18px] flex-col gap-y-[18px] bg-mainwhite rounded-xl border-[1px] border-solid border-[#DCDBFA]">
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
                                    className={`py-3 px-12 text-white ${userData.userStatus === "INACTIVE"
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
            )}
        </div>
    );
};

export default UserInfo;



