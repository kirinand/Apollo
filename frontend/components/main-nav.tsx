import Link from "next/link";
import { menuConfig } from "@/config/menu";
import { getYear, getMonth, getDay } from "date-fns";


const MainNav = () => {
  const currentDate = new Date()

  const year = getYear(currentDate).toString()
  const month = getMonth(currentDate).toString().padStart(2, '0')
  const day = getDay(currentDate).toString().padStart(2, '0')

  return (
    <div>
      <Link href="/">Home</Link>
      {menuConfig.mainNav.map((item) => {
        let href = item.href

        if (item.key === 'write') {
          href = `${href}/${year}/${month}/${day}`
        } else if (item.key === 'view') {
          href = `${href}/${year}`
        }
        return (
          <Link href={href} key={item.key}>
            {item.title}
          </Link>
        )
      })}
    </div>
  );
};

export default MainNav;
