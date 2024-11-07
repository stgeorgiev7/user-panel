import { fetchUserData } from "../../api/requests";
import { useEffect, useState } from "react";
import { userInterface } from "../../types";
import UserCard from "./UserCard";
import Skeleton from "../shared/Skeleton";

export default function UserList() {
  const [data, setData] = useState<userInterface[] | null>(null);

  const getUserData = async () => {
    const items = await fetchUserData();
    if (items.status === 200) {
      setData(items.data);
    } else {
      console.error("ERROR"); // to be changed
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl p-5 text-white text-center w-full font-bold">
        User List
      </h1>

      <div className="flex flex-col pt-5 pb-10 gap-5 justify-center content-center w-1/2">
        {data?.length ? (
          data.map((item: userInterface) => (
            <UserCard key={item.id} {...item} />
          ))
        ) : (
          <Skeleton number={10} />
        )}
      </div>
    </div>
  );
}
