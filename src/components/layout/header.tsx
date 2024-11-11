import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavItems from "./nav-items";
import MobileNav from "./mobile-nav";
import AuthButtons from "@/components/shared/auth-buttons";
import {getUser} from "@/lib/actions/user.action";
import {getCookieToken} from "@/lib/actions/auth.action";
import {TitleSection} from "@/components/shared/title-section";

const Header = async () => {
    const token = await getCookieToken();
    let userData = null;
    if (token) {
        userData = await getUser();
    }

    return (
        <header className="w-full border-b">
            <div className="container flex items-center justify-between py-3">
                <Link
                    href="/"
                    className="flex items-center gap-0.5 md:text-2xl text-lg font-bold md:font-bold"
                >
                    <Image src="/logo.svg" alt="logo" width={38} height={38}/>
                    Konferensiya
                </Link>
                <nav className="md:flex-between lg:flex hidden w-full max-w-xs">
                    <NavItems/>
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
                    <MobileNav/>
                </div>
            </div>
        </header>
    );
};

export default Header;