import {ReactNode} from "react";

export default function AuthLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <main>
            <div className="flex h-screen">
                <main className={"flex-grow"}>{children}</main>
            </div>
        </main>
    );
}
