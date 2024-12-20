import Button from "../shared/Button";
import UserAvatar from "../userComponents/UserAvatar";
import { TaskInterface, UserInterface } from "../../types";
import { useAppDispatch } from "../../hooks";
import { updateTaskCompletion } from "../../features/tasksSlice";

interface TaskTableInterface {
  tasks: TaskInterface[];
  users: UserInterface[];
  ready: boolean;
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
          {!props.ready && (
            <tr>
              <td colSpan={5}>
                <div className="w-full flex justify-center py-5">
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-16 h-16 me-3 text-blue animate-spin"
                    viewBox="0 0 100 101"
                    fill=""
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="white"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="rgb(37 99 235)"
                    />
                  </svg>
                </div>
              </td>
            </tr>
          )}
          {props?.tasks?.length === 0 ? (
            <tr>
              <td colSpan={5}>
                <div className="w-full flex justify-center py-5 bg-gray-800 text-lg">
                  No tasks
                </div>
              </td>
            </tr>
          ) : (
            props.ready &&
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
