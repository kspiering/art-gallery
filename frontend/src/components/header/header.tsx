import Link from "next/link";
import { HeaderAvatar } from "./header-avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fffbf1] border-b border-purple-400 w-full h-20 px-6 md:px-16 flex items-center justify-between font-bold">
      <Link href={"/"}>The Art Gallery</Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          href={"/ausstellungen"}
          className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-400 after:transition-all hover:after:w-full"
        >
          Ausstellungen
        </Link>
        <HeaderAvatar />
      </div>

      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Menu className="h-6 w-6 text-[#000000]" />
        </SheetTrigger>
        <SheetContent className="bg-[#fffbf1] border-black">
          <SheetHeader>
            <SheetTitle className="text-left text-black">
              The Art Gallery
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 mt-8">
            <SheetClose asChild>
              <Link
                href={"/ausstellungen"}
                className="text-black relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-400 after:transition-all hover:after:w-full"
              >
                Ausstellungen
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <HeaderAvatar />
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};
