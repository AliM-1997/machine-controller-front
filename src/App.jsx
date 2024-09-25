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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./data/constext/authContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Provider store={store}>
          <DarkModeProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="userlogin" element={<UserLogin />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />

                <Route path="/" element={<Layout />}>
                  <Route element={<ProtectedRoute requiredRole="admin" />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route
                      path="allmachines/addmachine"
                      element={<AddMachine />}
                    />
                    <Route path="allmachines" element={<AllMachines />} />
                    <Route
                      path="allmachines/selectedmachine/:id"
                      element={<SelectedMachine />}
                    />
                    <Route path="tasks" element={<AllTasks />} />
                    <Route path="predictions" element={<Predictions />} />
                    <Route path="allUsers" element={<AllUsers />} />
                    <Route
                      path="allusers/userProfile"
                      element={<UserProfile />}
                    />
                    <Route path="tasks/addTask" element={<AddTask />} />
                    <Route path="tasks/addTask/:id" element={<AddTask />} />
                    <Route path="allsparepart" element={<AllSpareParts />} />
                    <Route
                      path="allsparepart/addsparepart"
                      element={<AddSparePart />}
                    />
                    <Route
                      path="allsparepart/addsparepart/:id"
                      element={<AddSparePart />}
                    />
                  </Route>
                  <Route element={<ProtectedRoute requiredRole="user" />}>
                    <Route path="taskpreview" element={<TaskPreview />} />
                    <Route path="taskpreview/:id" element={<TaskPreview />} />
                    <Route path="alerts" element={<Alerts />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </DarkModeProvider>
        </Provider>
      </AuthProvider>
    </div>
  );
}

export default App;
