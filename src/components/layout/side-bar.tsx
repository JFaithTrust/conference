"use client";

import {motion} from "framer-motion";
import {usePathname, useRouter} from "next/navigation";
import React, {Fragment, useState} from "react";
import {IconType} from "react-icons";
import {CgFileDocument} from "react-icons/cg";
import {FcConferenceCall} from "react-icons/fc";
import {FiEdit, FiHome, FiMonitor, FiTag, FiUsers} from "react-icons/fi";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {MdReviews} from "react-icons/md";

import {TitleSection} from "@/components/shared/title-section";
import {ToggleClose} from "@/components/shared/toggle-close";
import {UserType} from "@/types";

interface SidebarProps {
    userData?: UserType;
    status?: boolean;
}

const Sidebar = ({userData}: SidebarProps) => {
    const [open, setOpen] = useState(true);
    const [isArticlesOpen, setIsArticlesOpen] = useState(false);

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
        hidden?: boolean;
        subLinks?: SubLinkProps[];
    }

    const LinkData: LinkProps[] = ([
        {
            Icon: FiHome,
            title: "Dashboard",
            pathName: "/dashboard",
        },
        {
            Icon: FcConferenceCall,
            title: "Conferences",
            pathName: "/dashboard/conferences",
        },
        {
            Icon: FiTag,
            title: "Fields",
            pathName: "/dashboard/fields",
            hidden: userData?.role === "REVIEWER",
        },
        {
            Icon: CgFileDocument,
            title: "Articles",
            pathName: "/dashboard/articles",
            subLinks: userData?.role !== "REVIEWER" ? [
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
            ] : undefined,

        },
        (userData?.role === "SUPER_ADMIN") && {
            Icon: FiEdit,
            title: "Editors",
            pathName: "/dashboard/editors",
        },
        (userData?.role !== "REVIEWER") && {
            Icon: MdReviews,
            title: "Reviewers",
            pathName: "/dashboard/reviewers",
        },
        (userData?.role === "SUPER_ADMIN") && {
            Icon: FiUsers,
            title: "Users",
            pathName: "/dashboard/users",
        },
    ] as (LinkProps | false)[]).filter((link): link is LinkProps => (link !== false) && (link !== undefined) && (!link.hidden))


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
                        <motion.button
                            layout
                            key={link.title}
                            onClick={() => userData?.role === "REVIEWER" ? router.push(link.pathName) :
                                link.title === "Articles" ?
                                    setIsArticlesOpen(!isArticlesOpen) : null}
                            className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
                                pathname === link.pathName
                                    ? "bg-indigo-100 text-indigo-800"
                                    : "text-slate-500 hover:bg-slate-100"
                            }`}
                        >
                            <motion.div
                                layout
                                className="grid h-full w-10 place-content-center text-lg"
                            >
                                <link.Icon/>
                            </motion.div>

                            {open && (
                                <motion.span className="text-xs font-medium">{link.title}</motion.span>
                            )}
                            {link.title === "Articles" && open && userData?.role !== "REVIEWER" && (
                                <motion.span
                                    initial={{scale: 0, opacity: 0}}
                                    animate={{opacity: 1, scale: 1}}
                                    style={{y: "-50%"}}
                                    transition={{delay: 0.5}}
                                    className="absolute right-2 top-1/2 flex size-4 items-center justify-center rounded bg-indigo-500 text-xs text-white"
                                >
                                    {isArticlesOpen ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                                </motion.span>
                            )}
                        </motion.button>

                        {link.subLinks && open && (
                            <div
                                className={`ml-5 mt-1 space-y-1 ${
                                    link.title === "Articles" && !isArticlesOpen ? "hidden" : ""
                                }`}
                            >
                                {link.subLinks.map((item) => (
                                    <motion.button
                                        key={item.title}
                                        onClick={() => router.push(item.pathName)}
                                        className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
                                            pathname === item.pathName
                                                ? "bg-indigo-100 text-indigo-800"
                                                : "text-slate-500 hover:bg-slate-100"
                                        }`}
                                    >
                                        <motion.div className="grid h-full w-10 place-content-center text-lg">
                                            <item.Icon/>
                                        </motion.div>

                                        <motion.span className="text-xs font-medium">{item.title}</motion.span>

                                        {item.notifs && (
                                            <span
                                                className="absolute right-2 top-1/2 flex size-4 items-center justify-center rounded bg-indigo-500 text-xs text-white">
                                                {item.notifs}
                                            </span>
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

export default Sidebar