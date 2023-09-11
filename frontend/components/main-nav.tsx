import Link from "next/link";
import { NavItemType } from "@/types";
import { menuConfig } from "@/config/menu";

const MainNav = () => {
  return (
    <div>
      <Link href="/">Home</Link>
      {menuConfig.mainNav.map((item, index) => (
        <Link href={item.href} key={index}>
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default MainNav;
