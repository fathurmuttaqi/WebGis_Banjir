import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Map from "./pages/Map";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";

function App() {

  const isLogin = !!localStorage.getItem("user");

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            isLogin
              ? <MainLayout />
              : <Navigate to="/login" replace />
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/map" element={<Map />} />
          <Route path="/report" element={<Report />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;