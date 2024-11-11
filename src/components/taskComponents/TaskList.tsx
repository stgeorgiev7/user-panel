import { TaskInterface } from "../../types";
import { useAppSelector } from "../../hooks";
import { selectAllTasks } from "../../features/tasksSlice";
import { useEffect, useState } from "react";
import TaskTable from "./TaskTable";
import TablePagination from "./TablePagination";
import TaskTableFilter from "./TaskTableFilters";
import { selectAllUsers } from "../../features/allUsersSlice";

export default function TaskList() {
  const taskData = useAppSelector(selectAllTasks);
  const users = useAppSelector(selectAllUsers);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<{
    userId: number | null;
    completed: boolean | null;
    title: string | null;
  }>({
    userId: null,
    completed: null,
    title: null,
  });

  const filteredTasks = taskData.filter((task: TaskInterface) => {
    const matchedUser = filter.userId === null || task.userId === filter.userId;
    const matchesCompleted =
      filter.completed === null || task.completed === filter.completed;
    const matchesTitle =
      filter.title === null || task.title.includes(filter.title);

    return matchedUser && matchesCompleted && matchesTitle;
  });

  const handlePagination = () => {
    const start = (page - 1) * 10;
    return filteredTasks.slice(start, start + 10);
  };

  const handleUserFilter = (value: number | null) => {
    setFilter((prev) => ({ ...prev, userId: value }));
  };

  const handlCompletedFilter = (value: boolean | null) => {
    setFilter((prev) => ({ ...prev, completed: value }));
  };

  const handleTitleFilter = (value: string | null) => {
    setFilter((prev) => ({ ...prev, title: value }));
  };

  useEffect(() => {
    handlePagination();
  }, [taskData]);

  return (
    <div className="flex flex-col gap-5 justify-center items-center pb-8">
      <h1 className="text-5xl p-5 text-white text-center w-full font-bold">
        Tasks
      </h1>
      <TaskTableFilter
        userOptions={users}
        onUserSelect={handleUserFilter}
        onCompletedSelect={handlCompletedFilter}
        onTitle={handleTitleFilter}
      />
      <TaskTable tasks={handlePagination()} users={users} />
      <TablePagination
        onPageSelect={setPage}
        pageNumbers={Math.trunc(filteredTasks.length / 10)}
        currentPage={page}
      />
    </div>
  );
}
