import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { LuMenu } from "react-icons/lu";
import Link from "next/link";
import NavItems from "@/components/layout/nav-items";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <LuMenu size={32} />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <Link
            href="/"
            className="flex items-center gap-[2px] md:text-2xl text-lg font-bold md:font-bold"
          >
            <Image src="/logo.svg" alt="logo" width={38} height={38} />
            Konferensiya
          </Link>
          {/* <Separator className="border border-gray-50" /> */}
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
