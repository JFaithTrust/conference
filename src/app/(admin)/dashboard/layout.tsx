import {ReactNode} from "react";

import Sidebar from "@/components/layout/side-bar";
import {getUser} from "@/lib/actions/user.action";
import {UserType} from "@/types";

export default async function AuthLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    const userData = await getUser() as Usertype

    return (
        <main>
            <div className="flex h-screen bg-indigo-50">
                <Sidebar userData={userData} />
                <main className={"container grow pt-3"}>{children}</main>
            </div>
        </main>
    );
}
