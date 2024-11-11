import { TaskInterface } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectAllTasks } from "../../features/tasksSlice";
import { useEffect, useState } from "react";
import TaskTable from "./TaskTable";
import TablePagination from "./TablePagination";
import TaskTableFilter from "./TaskTableFilters";
import { selectAllUsers } from "../../features/allUsersSlice";

export default function TaskList() {
  const taskData = useAppSelector(selectAllTasks);
  const users = useAppSelector(selectAllUsers);
  const dispatch = useAppDispatch();
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
    const matchesTitle = filter.title === null || task.title === filter.title;

    return matchedUser && matchesCompleted && matchesTitle;
  });

  const handlePagination = () => {
    const start = (page - 1) * 10;
    return filteredTasks.slice(start, start + 10);
  };

  const handleUserFilter = (value: number | null) => {
    setFilter((prev) => ({ ...prev, userId: value }));
  };

  const handlCompletedilter = (value: boolean | null) => {
    setFilter((prev) => ({ ...prev, completed: value }));
  };
  useEffect(() => {
    handlePagination();
  }, [taskData]);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <h2 className="text-4xl text-white py-8">Task List</h2>
      <TaskTableFilter
        userOptions={users}
        onUserSelect={handleUserFilter}
        onCompletedSelect={handlCompletedilter}
      />
      <TaskTable tasks={handlePagination()} users={users} />
      <TablePagination
        onPageSelect={setPage}
        pageNumbers={filteredTasks.length / 10}
        currentPage={page}
      />
    </div>
  );
}
