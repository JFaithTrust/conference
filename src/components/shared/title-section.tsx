"use client"

import {UserType} from "@/types";
import React from "react";
import {removeCookie} from "@/lib/actions/auth.action";
import {useRouter} from "next/navigation";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {AiFillDashboard} from "react-icons/ai";
import {ArrowRight} from "lucide-react";
import InfoSection from "@/components/layout/info-section";

interface TitleSectionProps {
    open?: boolean;
    userData?: UserType | undefined;
    isDashboard: boolean;
}


export const TitleSection = ({open, userData, isDashboard}: TitleSectionProps) => {
    const router = useRouter();

    const handleLogout = async () => {
        await removeCookie();
        router.push("/");
    };

    return (
        !isDashboard ? (
            <Popover>
                <PopoverTrigger>
                    <InfoSection
                        dashboard={isDashboard}
                        fullName={userData?.fullName}
                        phoneNumber={userData?.phoneNumber}
                        open={open}
                        onClick={handleLogout}/>
                </PopoverTrigger>
                <PopoverContent
                    className={`flex flex-col gap-y-2`}
                >
                    {(userData?.role === "SUPER_ADMIN" || userData?.role === "REVIEWER") ? (
                        <Link href="/dashboard">
                            <Button
                                className="p-2.5 rounded text-sm flex flex-row gap-x-2 bg-indigo-500 text-mainwhite hover:bg-indigo-500/80 transition-all duration-200 ease-in-out w-full"
                            >
                                Dashboard
                                <AiFillDashboard className="w-5 h-4"/>
                            </Button>
                        </Link>
                    ) : null}
                    <Button
                        onClick={handleLogout}
                        className="p-2.5 rounded text-sm flex flex-row justify-between bg-red-500 w-full text-mainwhite hover:bg-red-500/80 transition-all duration-200 ease-in-out"
                    >
                        Chiqish
                        <ArrowRight className="w-5 h-4"/>
                    </Button>
                </PopoverContent>
            </Popover>) : (
            <InfoSection
                dashboard={isDashboard}
                fullName={userData?.fullName}
                phoneNumber={userData?.phoneNumber}
                open={open}
                onClick={handleLogout}/>
        )

    );
};
