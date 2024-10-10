"use client"

import {ReactNode} from "react";
import Sidebar from "@/components/layout/side-bar";

export default function AuthLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {

    return (
        <main>
            <div className="flex h-screen bg-indigo-50">
                <Sidebar />
                <main className={"flex-grow"}>{children}</main>
            </div>
        </main>
    );
}
