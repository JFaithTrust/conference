"use client"

import {motion} from "framer-motion";
import {usePathname, useRouter} from "next/navigation";
import React, {Fragment, useState} from "react";
import {IconType} from "react-icons";
import {CgFileDocument} from "react-icons/cg";
import {FcConferenceCall} from "react-icons/fc";
import {FiHome, FiMonitor, FiTag, FiUsers} from "react-icons/fi";
import {MdReviews} from "react-icons/md";

import {Option} from "@/components/shared/option";
import {TitleSection} from "@/components/shared/title-section";
import {ToggleClose} from "@/components/shared/toggle-close";
import {UserType} from "@/types";

interface SidebarProps {
    userData?: UserType,
    status?: boolean
}

const Sidebar = ({userData}: SidebarProps) => {
    const [open, setOpen] = useState(true);
    const [isArticlesOpen, setIsArticlesOpen] = useState(false);
    const [isConferencesOpen, setIsConferencesOpen] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    interface SubLinkProps {
        Icon: IconType;
        title: string;
        pathName: string;
        notifs?: number;
    }

    interface LinkProps {
        Icon: IconType;
        title: string;
        pathName: string;
        subLinks?: SubLinkProps[];
    }

    const LinkData: LinkProps[] = [
        {
            Icon: FiHome,
            title: "Dashboard",
            pathName: "/dashboard",
        },
        {
            Icon: FcConferenceCall,
            title: "Conferences",
            pathName: "/dashboard/conferences/all",
            subLinks: [
                {
                    title: "All Conferences",
                    pathName: "/dashboard/conferences/all",
                    Icon: FcConferenceCall,
                },
                {
                    title: "Fields",
                    pathName: "/dashboard/conferences/fields",
                    Icon: FiTag,
                },
            ],
        },
        {
            Icon: CgFileDocument,
            title: "Articles",
            pathName: "/dashboard/articles/new",
            subLinks: [
                {
                    title: "New Articles",
                    pathName: "/dashboard/articles/new",
                    Icon: FiMonitor,
                    notifs: 3,
                },
                {
                    title: "Merged Articles",
                    pathName: "/dashboard/articles/merged",
                    Icon: FiMonitor,
                    notifs: 1,
                },
                {
                    title: "Approved Articles",
                    pathName: "/dashboard/articles/approved",
                    Icon: FiMonitor,
                    notifs: 2,
                },
            ],
        },
        {
            Icon: MdReviews,
            title: "Reviewers",
            pathName: "/dashboard/reviewers",
        },
        {
            Icon: FiUsers,
            title: "Users",
            pathName: "/dashboard/users",
        },
    ];

    return (
        <motion.nav
            layout
            className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
            style={{
                width: open ? "280px" : "fit-content",
            }}
        >
            <TitleSection open={open} userData={userData} isDashboard={true}/>

            <div className="space-y-1">
                {LinkData.map((link) => (
                    <Fragment key={link.title}>
                        <Option
                            Icon={link.Icon}
                            title={link.title}
                            pathName={link.pathName}
                            open={open}
                            isArticlesOpen={isArticlesOpen}
                            isConferencesOpen={isConferencesOpen}
                            setIsArticlesOpen={setIsArticlesOpen}
                            setIsConferencesOpen={setIsConferencesOpen}
                        />
                        {isConferencesOpen &&
                            open &&
                            link.pathName.startsWith('/dashboard/conferences') && (
                                <div className="ml-5 mt-1 space-y-0.5">
                                    {link?.subLinks?.map((item) => (
                                        <motion.button
                                            onClick={() => router.push(item.pathName)}
                                            key={item.title}
                                            layout
                                            className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
                                                pathname === item.pathName
                                                    ? "bg-indigo-100 text-indigo-800"
                                                    : "text-slate-500 hover:bg-slate-100"
                                            }`}
                                        >
                                            <motion.div
                                                layout
                                                className="grid h-full w-10 place-content-center text-lg"
                                            >
                                                <item.Icon/>
                                            </motion.div>
                                            {open && (
                                                <motion.span
                                                    layout
                                                    initial={{opacity: 0, y: 12}}
                                                    animate={{opacity: 1, y: 0}}
                                                    transition={{delay: 0.125}}
                                                    className="text-xs font-medium"
                                                >
                                                    {item.title}
                                                </motion.span>
                                            )}

                                            {item.notifs && open && (
                                                <motion.span
                                                    initial={{scale: 0, opacity: 0}}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    style={{y: "-50%"}}
                                                    transition={{delay: 0.5}}
                                                    className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
                                                >
                                                    {item.notifs}
                                                </motion.span>
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            )}
                        {isArticlesOpen &&
                            open &&
                            link.pathName.startsWith('/dashboard/articles') && (
                                <div className="ml-5 mt-1 space-y-1">
                                    {link?.subLinks?.map((item) => (
                                        <motion.button
                                            key={item.title}
                                            onClick={() => router.push(item.pathName)}
                                            layout
                                            className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
                                                pathname === item.pathName
                                                    ? "bg-indigo-100 text-indigo-800"
                                                    : "text-slate-500 hover:bg-slate-100"
                                            }`}
                                        >
                                            <motion.div
                                                layout
                                                className="grid h-full w-10 place-content-center text-lg"
                                            >
                                                <item.Icon/>
                                            </motion.div>
                                            {open && (
                                                <motion.span
                                                    layout
                                                    initial={{opacity: 0, y: 12}}
                                                    animate={{opacity: 1, y: 0}}
                                                    transition={{delay: 0.125}}
                                                    className="text-xs font-medium"
                                                >
                                                    {item.title}
                                                </motion.span>
                                            )}

                                            {item.notifs && open && (
                                                <motion.span
                                                    initial={{scale: 0, opacity: 0}}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    style={{y: "-50%"}}
                                                    transition={{delay: 0.5}}
                                                    className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
                                                >
                                                    {item.notifs}
                                                </motion.span>
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            )}
                    </Fragment>
                ))}
            </div>

            <ToggleClose open={open} setOpen={setOpen}/>
        </motion.nav>
    );
};

export default Sidebar;
