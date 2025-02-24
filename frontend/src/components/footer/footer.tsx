import Link from "next/link";

export const Footer = () => {
  return (
    <div className="border-t border-purple-400 w-full m-auto flex flex-col mt-10">
      {/* Oberer Bereich mit den ersten 3 Spalten */}
      <div className="py-6 sm:h-20">
        <div className="grid grid-cols-1 sm:grid-cols-12 w-full h-full gap-4 sm:gap-0">
          <div className="text-sm sm:col-span-4 flex items-center justify-center font-bold text-[#272626]">
            <Link href={"/"}>The Art Gallery</Link>
          </div>
          <div className="text-sm sm:col-span-4 flex items-center justify-center font-bold text-[#272626]">
            <Link href={"/datenschutz"}>Datenschutz</Link>
          </div>
          <div className="text-sm sm:col-span-4 flex items-center justify-center font-bold text-[#272626]">
            <Link href={"/impressum"}>Impressum</Link>
          </div>
        </div>
      </div>

      {/* Unterster Bereich in Lila */}
      <div className="h-16 sm:h-20 flex justify-center items-center text-[10px] sm:text-xs text-purple-400">
        © Kim Spiering 2025
      </div>
    </div>
  );
};
