import "./styles/colors.css";
import "./styles/utilities.css";
import "./styles/index.css";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Predictions from "./pages/Predictions";
import Alerts from "./pages/Alerts";
import AllUsers from "./pages/AllUsers";
import UserProfile from "./pages/UserProfile";
import { Provider } from "react-redux";
import store from "./data/redux/store";
import AddTask from "./pages/AddTask/indefx";
import AllTasks from "./pages/AllTasks";
import AddMachine from "./pages/AddMachine";
import AllMachines from "./pages/AllMachines";
import SelectedMachine from "./pages/SelectedMachine";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="addmachine" element={<AddMachine />} />
              <Route path="allmachines" element={<AllMachines />} />
              <Route path="selectedmachine/:id" element={<SelectedMachine />} />
              <Route path="tasks" element={<AllTasks />} />
              <Route path="Predictions" element={<Predictions />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="allUsers" element={<AllUsers />} />
              <Route path="userProfile" element={<UserProfile />} />
              <Route path="addTask" element={<AddTask />} />
              <Route path="addTask/:id" element={<AddTask />} />
              <Route path="alerts" element={<Alerts />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
