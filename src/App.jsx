import "./styles/colors.css";
import "./styles/utilities.css";
import "./styles/index.css";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import { DarkModeProvider } from "./data/constext/DarkModeContext";
import AllSpareParts from "./pages/AllSparePart";
import AddSparePart from "./pages/AddSparePart";
import UserLogin from "./pages/UserLogin";
import TaskPreview from "./pages/TaskPreview";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <DarkModeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="userlogin" element={<UserLogin />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="/" element={<Layout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="addmachine" element={<AddMachine />} />
                <Route path="allmachines" element={<AllMachines />} />
                <Route
                  path="selectedmachine/:id"
                  element={<SelectedMachine />}
                />
                <Route path="tasks" element={<AllTasks />} />
                <Route path="predictions" element={<Predictions />} />
                <Route path="alerts" element={<Alerts />} />
                <Route path="allUsers" element={<AllUsers />} />
                <Route path="userProfile" element={<UserProfile />} />
                <Route path="addTask" element={<AddTask />} />
                <Route path="addTask/:id" element={<AddTask />} />
                <Route path="allsparepart" element={<AllSpareParts />} />
                <Route path="addsparepart" element={<AddSparePart />} />
                <Route path="addsparepart/:id" element={<AddSparePart />} />
                <Route path="taskpreview" element={<TaskPreview />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </DarkModeProvider>
      </Provider>
    </div>
  );
}

export default App;
