
import {ReactNode} from "react";
import {ForgotPasswordModal, LoginModal, RegisterModal} from "@/components/modals";
import { Footer, Header } from "@/components/layout";


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
            <section className={"flex-grow"}>{children}</section>
            <Footer/>
        </main>
    );
}
