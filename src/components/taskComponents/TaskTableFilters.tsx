import { UserInterface } from "../../types";
import { useState } from "react";

interface TaskTableFiltersInterface {
  onUserSelect: (value: number | null) => void;
  userOptions: UserInterface[];
  onCompletedSelect: (value: boolean | null) => void;
  onTitle: (value: string | null) => void;
}

export default function TaskTableFilter(props: TaskTableFiltersInterface) {
  const [useFilterOpened, setUserFilterOpened] = useState<boolean>(false);

  return (
    <div className="flex gap-5 w-full justify-end relative">
      <div className="text-blue-200">Input</div>
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">
        <div className="relative">
          <button
            id="dropdownActionButton"
            data-dropdown-toggle="dropdownAction"
            className="inline-flex gap-3 items-center justify-end text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
            type="button"
            onClick={() => setUserFilterOpened(!useFilterOpened)}
          >
            <span>Filter by user</span>
            <svg
              className={`w-3 h-3 transform transition-transform duration-500 ease-in-out ${
                useFilterOpened ? "rotate-180" : "rotate-0"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdownAction"
            className={`${
              useFilterOpened ? "visible" : "hidden"
            } absolute right-0 mt-2 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
          >
            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
              {props.userOptions.map((user) => (
                <li
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  key={user.id}
                  onClick={() => {
                    setUserFilterOpened(false);
                    props.onUserSelect(user.id);
                  }}
                >
                  {user.username}
                </li>
              ))}
              <li
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer border-t-2"
                onClick={() => {
                  setUserFilterOpened(false);
                  props.onUserSelect(null);
                }}
              >
                Clear Filter
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
