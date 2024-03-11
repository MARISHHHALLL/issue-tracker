"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
const NavBar = () => {
  const links = [
    {
      label: "Dashboard",
      link: "/",
    },
    {
      label: "Issues",
      link: "/issues",
    },
  ];

  const currentUrl = usePathname();

  return (
    <nav className="flex space-x-6 border-b mb-5 h-14 px-6 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((item) => (
          <Link
            key={item.link}
            className={classNames({
              "text-zinc-800": currentUrl === item.link,
              "text-zinc-500": currentUrl !== item.link,
              "hover:text-zinc-800 transition-colors text-[16px]": true,
            })}
            href={item.link}
          >
            {item.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};
export default NavBar;
