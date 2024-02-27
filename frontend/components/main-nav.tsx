import Link from "next/link";
import { getYear, getMonth, getDay } from "date-fns";

import { cn } from "@/lib/utils";
import { menuConfig } from "@/config/menu";

const MainNav = () => {
  const currentDate = new Date();

  const year = getYear(currentDate).toString();
  const month = getMonth(currentDate).toString().padStart(2, "0");
  const day = getDay(currentDate).toString().padStart(2, "0");

  return (
    <div className="sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/">Home</Link>
          {menuConfig.mainNav.map((item) => {
            let href = item.href;

            if (item.key === "write") {
              href = `${href}/${year}/${month}/${day}`;
            } else if (item.key === "view") {
              href = `${href}/${year}`;
            }
            return (
              <Link
                href={href}
                key={item.key}
                className={cn("flex items-center")}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainNav;
