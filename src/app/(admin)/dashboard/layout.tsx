import {ReactNode} from "react";
import Sidebar from "@/components/layout/side-bar";
import {getUser} from "@/lib/actions/user.action";

export default async function AuthLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    const userData = await getUser()

    return (
        <main>
            <div className="flex h-screen bg-indigo-50">
                <Sidebar userData={userData} />
                <main className={"flex-grow pt-3 container"}>{children}</main>
            </div>
        </main>
    );
}
