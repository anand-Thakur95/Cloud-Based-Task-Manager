import { useSidebar } from "./ui/sidebar";
import { MdAddTask } from "react-icons/md";
import { Search } from "lucide-react";
import UserAvatar from "./UserAvatar";
import NotificationBar from "./Notifation";

function Navbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b">
  <div className="max-w-screen-xl mx-auto p-2 flex justify-between items-center">
    
    {/* LEFT - LOGO */}
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-md text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
      >
        ☰
      </button>

      <a
        href="#"
        className="hidden md:flex items-center gap-2 text-2xl"
      >
        <p className="bg-blue-600 p-1 rounded-full">
          <MdAddTask className="text-white text-2xl font-black" />
        </p>
        <span className="text-xl font-semibold">TaskMe</span>
      </a>
    </div>

    {/* CENTER - SEARCH */}
    <div className=" 2xl:w-[400px] lg:w-2xl md:w-76  min-[320px]:w-40 min-[425px]:w-60 flex items-center py-2 px-3 gap-2 rounded-full bg-gray-300">
      <Search />
      <input
        type="text"
        placeholder="search.."
        className="flex-1  outline-none bg-transparent placeholder:text-gray-500"
      />
    </div>

    {/* RIGHT - USER AVATAR */}
    <div className="flex flex-row-reverse gap-2 items-center">
      <UserAvatar />
      <NotificationBar />
    </div>

  </div>
</nav>

  );
}

export default Navbar;
