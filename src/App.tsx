import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserList from "./components/userComponents/UserList";
import UserPostList from "./components/userComponents/UserPostList";
import TaskList from "./components/taskComponents/TaskList";
import { fetchUserData } from "./api/requests";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { updateAllUsers } from "./features/allUsersSlice";

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

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="container">
      <Router>
        <nav className="text-2xl text-white">
          <Link to="/">User List</Link>
          <Link to="/task">Task List</Link>
        </nav>

        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/posts/:userId" element={<UserPostList />} />
          <Route path="/task" element={<TaskList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
