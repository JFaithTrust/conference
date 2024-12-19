import Image from "next/image";
import Link from "next/link";
import React from "react";

import AuthButtons from "@/components/shared/auth-buttons";
import {TitleSection} from "@/components/shared/title-section";
import {headerLinks} from "@/constants";
import {getCookieToken} from "@/lib/actions/auth.action";
import {getUser} from "@/lib/actions/user.action";

import MobileNav from "./mobile-nav";
import NavItems from "./nav-items";

const Header = async () => {
    const token = await getCookieToken();
    let userData = null;
    if (token) {
        userData = await getUser();
    }

    const isAuth = !!token;

    const newHeaderLinks = isAuth
        ? [...headerLinks, {
            label: "Mening maqolalarim",
            route: "/articles"
        }, {
            label: 'Konferensiya yaratish',
            route: '/create-conference',
        }
        ]
        : headerLinks;

    return (
        <header className="w-full border-b">
            <div className="container flex items-center justify-between py-3">
                <Link
                    href="/"
                    className="flex items-center gap-0.5 text-lg font-bold md:text-2xl md:font-bold"
                >
                    <Image src="/logo.svg" alt="logo" width={38} height={38}/>
                    Konferensiya
                </Link>
                <nav className="hidden w-full max-w-xs lg:flex">
                    {/* md:flex-between */}
                    <NavItems headerLinks={newHeaderLinks}/>
                </nav>
                <div className="flex items-center gap-4">
                    {
                        token && userData != null ? (
                                // <UserCard user={userData}/>
                                <TitleSection userData={userData} isDashboard={false}/>
                            )
                            : (
                                <AuthButtons/>
                            )
                    }
                    <MobileNav headerLinks={newHeaderLinks}/>
                </div>
            </div>
        </header>
    );
};

export default Header;