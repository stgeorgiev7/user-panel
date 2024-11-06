import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserList from "./components/userComponents/UserList";
import TaskList from "./components/taskComponents/TaskList";

function App() {
  return (
    <div className="container">
      <Router>
        <nav className="text-2xl text-white">
          <Link to="/">User List</Link>
          <Link to="/task">Task List</Link>
        </nav>

        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/task" element={<TaskList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
