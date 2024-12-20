import { TaskInterface, TaskFilterInterface } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectAllTasks,
  selectTasksStatus,
  fetchTasks,
} from "../../features/tasksSlice";
import { useEffect, useState } from "react";
import TaskTable from "./TaskTable";
import TablePagination from "./TablePagination";
import TaskTableFilter from "./TaskTableFilters";
import { selectAllUsers } from "../../features/usersSlice";

export default function TaskList() {
  const taskData = useAppSelector(selectAllTasks);
  const tasksStatus = useAppSelector(selectTasksStatus);
  const users = useAppSelector(selectAllUsers);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);
  const [filters, setFilter] = useState<TaskFilterInterface>({
    userId: null,
    completed: null,
    title: null,
  });
  const [taskTableReady, setTaskTableReady] = useState<boolean>(false);

  const filteredTasks = taskData.tasks.filter((task: TaskInterface) => {
    const matchedUser =
      filters.userId === null || task.userId === filters.userId;
    const matchesCompleted =
      filters.completed === null || task.completed === filters.completed;
    const matchesTitle =
      filters.title === null || task.title.includes(filters.title);

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
    setTaskTableReady(tasksStatus === "succeeded");
  }, [tasksStatus, dispatch]);

  useEffect(() => {
    handlePagination();
  }, [taskData]);

  useEffect(() => {
    if (tasksStatus === "idle") {
      dispatch(fetchTasks());
    }
  }, []);

  return (
    <div className="flex flex-col gap-5 justify-center items-center pb-8">
      <h1 className="text-5xl p-5 text-white text-center w-full font-bold">
        Tasks
      </h1>
      {taskTableReady && (
        <TaskTableFilter
          userOptions={users}
          onUserSelect={handleUserFilter}
          onCompletedSelect={handlCompletedFilter}
          onTitle={handleTitleFilter}
          currentFilters={filters}
        />
      )}
      <TaskTable
        tasks={handlePagination()}
        users={users}
        ready={taskTableReady}
      />
      {taskTableReady && (
        <TablePagination
          onPageSelect={setPage}
          pageNumbers={Math.trunc(filteredTasks.length / 10)}
          currentPage={page}
        />
      )}
    </div>
  );
}
