import {ReactNode} from "react";

import { Footer, Header } from "@/components/layout";
import {ForgotPasswordModal, LoginModal, RegisterModal} from "@/components/modals";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <main className="flex h-screen flex-col">
            <ForgotPasswordModal />
            <RegisterModal />
            <LoginModal />
            <Header/>
            <section className={"grow"}>{children}</section>
            <Footer/>
        </main>
    );
}
