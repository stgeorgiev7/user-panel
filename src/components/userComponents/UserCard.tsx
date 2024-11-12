import { UserInterface } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  updateSelectedUser,
  selectSelectedUser,
} from "../../features/selectedUserSlice";
import { updateEditUserModalVisible } from "../../features/componentsSlice";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import UserAvatar from "./UserAvatar";
import Button from "../shared/Button";
import { useLocation, Link } from "react-router-dom";

export default function UserCard(props: UserInterface) {
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector(selectSelectedUser);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();

  const expandableVariants = {
    hidden: {
      opacity: 0.1,
      y: "-10px",
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        type: "ease-in-out",
        damping: 50,
        stiffness: 300,
      },
    },
  };

  const handleClick = () => {
    dispatch(updateSelectedUser(props));
  };

  const handleEditButtonClick = () => {
    dispatch(updateEditUserModalVisible(true));
  };

  useEffect(() => {
    if (props.id === selectedUser?.id) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [selectedUser, props.id]);

  return (
    <div
      onClick={handleClick}
      className="rounded-lg hover:shadow-[0_0_10px_1px_rgba(30,64,175,0.6)] transition-shadow duration-100 ease-in-out"
    >
      <h2 id="accordion-color-heading-2">
        <button
          type="button"
          className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border  border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-gray-800 gap-3 rounded-md ${
            isOpen
              ? "border-b-0 bg-blue-800 rounded-b-none dark:hover:bg-blue-800 cursor-default"
              : "border-b-1"
          }`}
        >
          <div className="avatar placeholder flex gap-5 justify-center items-center">
            <UserAvatar username={props.username} />
            <span className="text-lg text-white">{props.username}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 transform transition-transform duration-500 ease-in-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </h2>
      <AnimatePresence mode="wait">
        <motion.div
          id="accordion-color-body-2"
          className={`${isOpen ? "visible" : "hidden"} bg-gray-900 `}
          aria-labelledby="accordion-color-heading-2"
          variants={expandableVariants}
          animate={isOpen ? "visible" : "hidden"}
        >
          <div className="p-5 border border-gray-200 dark:border-gray-700 border-t-0 rounded-b-md">
            <div className="flex flex-col pb-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Name
              </dt>
              <dd className="text-lg text-white font-semibold">{props.name}</dd>
            </div>
            <div className="flex flex-col pb-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Email address
              </dt>
              <dd className="text-lg text-white font-semibold">
                {props.email}
              </dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Home address
              </dt>
              <dd className="text-lg text-white font-semibold">
                {`${props.address.city} ${props.address.street} ${props.address.suite}`}
              </dd>
            </div>
            <div className="flex gap-5 justify-between">
              <Button
                text="edit"
                type="button"
                color="purple"
                onClick={handleEditButtonClick}
                size="big"
              />
              {!location.pathname.split("/").includes("posts") && (
                <Link to={`/posts/${selectedUser?.id}`}>
                  <Button
                    text="see posts"
                    type="button"
                    color="blue"
                    size="big"
                  />
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
