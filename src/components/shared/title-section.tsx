"use client"

import {ArrowRight} from "lucide-react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React from "react";
import {AiFillDashboard} from "react-icons/ai";

import InfoSection from "@/components/layout/info-section";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {removeCookie} from "@/lib/actions/auth.action";
import {UserType} from "@/types";

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
                                className="flex w-full flex-row gap-x-2 rounded bg-indigo-500 p-2.5 text-sm text-mainwhite transition-all duration-200 ease-in-out hover:bg-indigo-500/80"
                            >
                                Dashboard
                                <AiFillDashboard className="h-4 w-5"/>
                            </Button>
                        </Link>
                    ) : null}
                    <Button
                        onClick={handleLogout}
                        className="flex w-full flex-row justify-between rounded bg-red-500 p-2.5 text-sm text-mainwhite transition-all duration-200 ease-in-out hover:bg-red-500/80"
                    >
                        Chiqish
                        <ArrowRight className="h-4 w-5"/>
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
