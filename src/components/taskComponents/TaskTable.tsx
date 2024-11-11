import Button from "../shared/Button";
import UserAvatar from "../userComponents/UserAvatar";
import { TaskInterface, UserInterface } from "../../types";
import { useAppDispatch } from "../../hooks";
import { updateTaskCompletion } from "../../features/tasksSlice";

interface TaskTableInterface {
  tasks: TaskInterface[];
  users: UserInterface[];
}

export default function TaskTable(props: TaskTableInterface) {
  const dispatch = useAppDispatch();

  const getTaskUser = (id: number) => {
    const user = props.users.find((user: UserInterface) => user.id === id);
    return user?.username;
  };

  return (
    <div className="border-1 w-full rounded-md overflow-hidden">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
          <tr>
            <th className="py-2 px-6">ID</th>
            <th className="py-2 px-6 w-1/5">Username</th>
            <th className="py-2 px-4 w-1/3">Title</th>
            <th className="py-2 px-4 w-1/4">Status</th>
            <th className="py-2 px-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {props?.tasks?.length > 0 &&
            props?.tasks?.map((task: TaskInterface) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-lg"
                key={task.id}
              >
                <td className="py-2 px-6 ">{task.id}</td>
                <td className="py-2 px-6 w-full flex gap-5 items-center">
                  <UserAvatar username={getTaskUser(task.userId) ?? "user"} />
                  {getTaskUser(task.userId)}
                </td>
                <td className="py-2 px-4 w-1/3">{task.title}</td>
                <td className="py-2 px-4 w-1/4">
                  {task.completed ? "Completed" : "Not Completed"}
                </td>
                <td className="py-2 px-2 ">
                  <Button
                    onClick={() =>
                      dispatch(
                        updateTaskCompletion({
                          id: task.id,
                          completed: !task.completed,
                        })
                      )
                    }
                    text={task.completed ? "uncomplete" : "complete task"}
                    color={task.completed ? "purple" : "blue"}
                    size="small"
                    type="button"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
