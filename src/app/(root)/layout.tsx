import {Header} from "@/components/layout/header";
import {Footer} from "@/components/layout/footer";
import {ReactNode} from "react";
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
            <section className={"flex-grow"}>{children}</section>
            <Footer/>
        </main>
    );
}
