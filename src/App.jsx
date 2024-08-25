import "./styles/colors.css";
import "./styles/utilities.css";
import "./styles/index.css";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Machines from "./pages/Machines";
import Tasks from "./pages/Tasks";
import Predictions from "./pages/Predictions";
import Alerts from "./pages/Alerts";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="machines" element={<Machines />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="Predictions" element={<Predictions />} />
            <Route path="alerts" element={<Alerts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
