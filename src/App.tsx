import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserList from "./components/userComponents/UserList";
import UserPostList from "./components/userComponents/UserPostList";
import TaskList from "./components/taskComponents/TaskList";
import { fetchUserData, fetchTaskData } from "./api/requests";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { updateAllUsers } from "./features/allUsersSlice";
import { updateAllTasks } from "./features/tasksSlice";

function App() {
  const dispatch = useAppDispatch();

  const getUserData = async () => {
    const items = await fetchUserData();
    if (items.status === 200) {
      dispatch(updateAllUsers(items.data));
    } else {
      console.error("ERROR"); // to be changed
    }
  };

  const getTaskData = async () => {
    const items = await fetchTaskData();
    if (items.status === 200) {
      dispatch(updateAllTasks(items.data));
    } else {
      console.error("ERROR"); //err modal
    }
  };

  useEffect(() => {
    getUserData();
    getTaskData();
  }, []);

  return (
    <div className="container">
      <Router>
        <nav className="text-2xl text-white">
          <Link to="/">User List</Link>
          <Link to="/tasks">Task List</Link>
        </nav>

        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/posts/:userId" element={<UserPostList />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
