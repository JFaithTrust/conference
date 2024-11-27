import Image from "next/image";
import Link from "next/link";
import {LuMenu} from "react-icons/lu";

import NavItems from "@/components/layout/nav-items";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";

interface MobileNavProps {
    headerLinks: { label: string; route: string }[]
}

const MobileNav = ({headerLinks}: MobileNavProps) => {
    return (
        <nav className="lg:hidden">
            <Sheet>
                <SheetTrigger className="align-middle">
                    <LuMenu size={32}/>
                </SheetTrigger>
                <SheetContent className="flex flex-col gap-6 bg-white lg:hidden">
                    <Link
                        href="/"
                        className="flex items-center gap-[2px] text-lg font-bold md:text-2xl md:font-bold"
                    >
                        <Image src="/logo.svg" alt="logo" width={38} height={38}/>
                        Konferensiya
                    </Link>
                    {/* <Separator className="border border-gray-50" /> */}
                    <NavItems headerLinks={headerLinks}/>
                </SheetContent>
            </Sheet>
        </nav>
    );
};

export default MobileNav;
