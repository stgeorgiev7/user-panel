import { UserInterface } from "../../types";
import { useEffect } from "react";
import UserCard from "./UserCard";
import EditUserModal from "./EditUserModal";
import Skeleton from "../shared/Skeleton";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  fetchUsers,
  selectUsersStatus,
  updateSelectedUser,
  selectAllUsers,
} from "../../features/usersSlice";

export default function UserList() {
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector(selectAllUsers);
  const usersStatus = useAppSelector(selectUsersStatus);

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }

    dispatch(updateSelectedUser(null));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl p-5 text-white text-center w-full font-bold">
        User List
      </h1>

      <div className="flex flex-col pt-5 pb-10 gap-5 justify-center content-center w-1/2 ">
        {allUsers?.length && usersStatus === "succeeded" ? (
          allUsers.map((item: UserInterface) => (
            <UserCard key={item.id} {...item} />
          ))
        ) : (
          <Skeleton number={10} />
        )}
      </div>

      <EditUserModal />
    </div>
  );
}
