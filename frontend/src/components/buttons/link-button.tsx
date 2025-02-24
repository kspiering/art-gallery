import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  backgroundColor?: string;
  className?: string;
}

export const LinkButton = ({ href, children, className }: LinkButtonProps) => {
  return (
    <div className="flex justify-center items-center">
      <Link
        href={href}
        className={clsx(
          "inline-flex items-center justify-center w-28 h-10 md:w-32 md:h-10 px-4 py-1.5 bg-[#8EAD84] hover:bg-[#5C8251] text-white rounded-full text-sm transition-colors",
          className
        )}
      >
        {children}
      </Link>
    </div>
  );
};
