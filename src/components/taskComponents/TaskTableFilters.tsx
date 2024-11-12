import { UserInterface } from "../../types";
import { useState, ChangeEvent } from "react";
import { TaskFilterInterface } from "../../types";

interface TaskTableFiltersInterface {
  onUserSelect: (value: number | null) => void;
  userOptions: UserInterface[];
  onCompletedSelect: (value: boolean | null) => void;
  onTitle: (value: string | null) => void;
  currentFilters: TaskFilterInterface;
}

export default function TaskTableFilter(props: TaskTableFiltersInterface) {
  const [useFilterOpened, setUserFilterOpened] = useState<boolean>(false);
  const [completedFilterOpened, setCompletedFilterOpened] =
    useState<boolean>(false);

  return (
    <div className="flex gap-5 w-full justify-end relative">
      <div className="text-blue-200">
        <input
          type="email"
          name="username"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5 px-4  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
          placeholder="Filter by title"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            e.target.value.length > 0
              ? props.onTitle(e.target.value)
              : props.onTitle(null)
          }
        />
      </div>

      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">
        <div className="relative">
          <button
            id="dropdownActionButton"
            data-dropdown-toggle="dropdownAction"
            className="inline-flex gap-3 items-center justify-end text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
            type="button"
            onClick={() => setCompletedFilterOpened(!completedFilterOpened)}
          >
            <span>Filter by Completion</span>
            <svg
              className={`w-3 h-3 transform transition-transform duration-500 ease-in-out ${
                completedFilterOpened ? "rotate-180" : "rotate-0"
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
              completedFilterOpened ? "visible" : "hidden"
            } absolute right-0 mt-2 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li
                className={`${
                  props.currentFilters.completed && "bg-blue-600"
                } block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer `}
                onClick={() => {
                  setCompletedFilterOpened(false);
                  props.onCompletedSelect(true);
                }}
              >
                Completed
              </li>

              <li
                className={`${
                  props.currentFilters.completed === false && "bg-blue-600"
                } block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer `}
                onClick={() => {
                  setCompletedFilterOpened(false);
                  props.onCompletedSelect(false);
                }}
              >
                Uncompleted
              </li>
              <li
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer border-t-2"
                onClick={() => {
                  setCompletedFilterOpened(false);
                  props.onCompletedSelect(null);
                }}
              >
                Clear Filter
              </li>
            </ul>
          </div>
        </div>
      </div>
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
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {props.userOptions.map((user) => (
                <li
                  className={`${
                    props.currentFilters.userId === user.id && "bg-blue-600"
                  } block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer `}
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
