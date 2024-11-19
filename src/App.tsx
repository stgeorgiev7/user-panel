import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/userComponents/UserList";
import UserPostList from "./components/userComponents/UserPostList";
import TaskList from "./components/taskComponents/TaskList";
import Navigation from "./components/shared/Navigation";
import ErrorModal from "./components/shared/ErrorModal";

function App() {
  return (
    <div className="container pt-24">
      <Router>
        <Navigation />

        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/posts/:userId" element={<UserPostList />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </Router>
      <ErrorModal />
    </div>
  );
}

export default App;
