import { UserInterface } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import {
  selectSelectedUser,
  updateSelectedUser,
} from "../../features/selectedUserSlice";
import {
  updateEditUserModalVisible,
  selectEditUserModalVisible,
} from "../../features/editUserModalSlice";
import { updateSingleUser } from "../../features/allUsersSlice";
import Button from "../shared/Button";

export default function EditUserModal() {
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector(selectSelectedUser);
  const isOpen = useAppSelector(selectEditUserModalVisible);
  const [newUserData, setNewUserData] = useState<UserInterface>(selectedUser);
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  const handleCancel = () => {
    dispatch(updateEditUserModalVisible(false));
    setNewUserData(selectedUser);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setNewUserData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setNewUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    dispatch(updateSingleUser(newUserData));
    dispatch(updateSelectedUser(newUserData));
    dispatch(updateEditUserModalVisible(false));
  };

  useEffect(() => {
    setNewUserData(selectedUser);
  }, [selectedUser]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(e.target as Node)
      ) {
        handleCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className={`${
        isOpen ? "visible" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-2 flex justify-center items-center w-full md:inset-0 h-100% max-h-full bg-indigo-50/5 backdrop-blur-sm`}
    >
      <div
        className="relative p-4 w-full max-w-[500px] max-h-full z-3"
        ref={modalContentRef}
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border-1">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit user <span>{selectedUser.username}</span>
            </h3>
          </div>

          <div className="p-4 md:p-5">
            <form className="space-y-4" action="#">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Username
                </label>
                <input
                  type="email"
                  name="username"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                  placeholder={selectedUser.username}
                  value={newUserData.username}
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder={selectedUser.name}
                  value={newUserData.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                  required
                  onChange={handleChange}
                />
              </div>
              <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                Adress Info
              </label>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  City
                </label>
                <input
                  type="text"
                  name="address.city"
                  placeholder={selectedUser.address.city}
                  value={newUserData.address.city}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Street
                </label>
                <input
                  type="text"
                  name="address.street"
                  placeholder={selectedUser.address.street}
                  value={newUserData.address.street}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Suite
                </label>
                <input
                  type="text"
                  name="address.suite"
                  placeholder={selectedUser.address.suite}
                  value={newUserData.address.suite}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-5">
                <Button
                  text="Cancel"
                  type="button"
                  color="purple"
                  outlined
                  onClick={handleCancel}
                  size="medium"
                />

                <Button
                  text="Submit"
                  type="button"
                  color="blue"
                  size="medium"
                  disabled={newUserData === selectedUser ? true : false}
                  onClick={handleSubmit}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
