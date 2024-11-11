import { UserInterface } from "../../types";
import UserCard from "./UserCard";
import EditUserModal from "./EditUserModal";
import Skeleton from "../shared/Skeleton";
import { useAppSelector } from "../../hooks";
import { selectAllUsers } from "../../features/allUsersSlice";

export default function UserList() {
  const allUsers = useAppSelector(selectAllUsers);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl p-5 text-white text-center w-full font-bold">
        User List
      </h1>

      <div className="flex flex-col pt-5 pb-10 gap-5 justify-center content-center w-1/2 ">
        {allUsers?.length ? (
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
