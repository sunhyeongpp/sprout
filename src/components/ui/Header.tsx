import { Link, NavLink } from "react-router";
import images from "../../constants/images";
import SearchBar from "../search/SearchBar";
import ThemeToggle from "../common/ThemeToggle";
import { useEffect, useState } from "react";
import { ChannelItem, getChannels } from "../../api/channel";
import { useTriggerStore } from "../../stores/triggerStore";
import { twMerge } from "tailwind-merge";

export default function Header() {
  const targetLink = useTriggerStore((state) => state.targetLink);
  const [menus, setMenus] = useState<ChannelItem[]>([]);
  useEffect(() => {
    const handleGetMenus = async () => {
      const data = await getChannels();
      const cutoffTime = new Date("2024-12-11T03:10:58.171Z");

      const filter = data.filter(
        (menu) => new Date(menu.updatedAt) > cutoffTime
      );
      setMenus(filter);
    };
    handleGetMenus();
  }, []);

  return (
    <header className="w-[257px] max-h-screen h-screen sticky top-0 left-0 border-r border-whiteDark dark:border-gray py-[21px] px-[32px] flex flex-col items-start">
      <h1 className="mb-[50px]">
        <Link to={"/"}>
          <img className="w-[188px]" src={images.Logo} alt="main logo" />
        </Link>
      </h1>
      <SearchBar />
      <h2 className="font-bold mb-[20px]">게시판 목록</h2>
      <nav className="flex-1 flex-grow max-h-[calc(100vh-296px)] scroll overflow-y-auto">
        <ul className="flex flex-col gap-5">
          {menus.map((menu) => (
            <li key={menu._id}>
              <NavLink
                to={`/board/${menu.name}?id=${menu._id}`}
                className={({ isActive }) =>
                  twMerge(
                    isActive
                      ? "font-bold text-main"
                      : "text-black dark:text-white hover:text-main dark:hover:text-main transition-all",
                    targetLink === menu.name && "font-bold text-main"
                  )
                }
              >
                {menu.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <ThemeToggle />
    </header>
  );
}