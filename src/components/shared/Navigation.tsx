import { useLocation, Link } from "react-router-dom";
import UserAvatar from "../userComponents/UserAvatar";

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-transparent fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 backdrop-blur-md">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto px-8 py-4">
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse text-white items-center justify-center gap-5">
          <UserAvatar username="Admin" />
          Admin
        </div>
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:border-gray-700 text-2xl text-white ">
          <Link
            to="/"
            className={`${
              location.pathname === "/" && "border-b-2 border-purple-700"
            }`}
          >
            User List
          </Link>
          <Link
            to="/tasks"
            className={`${
              location.pathname === "/tasks" && "border-b-2 border-purple-700"
            }`}
          >
            Tasks
          </Link>
        </ul>
      </div>
    </nav>
  );
}
