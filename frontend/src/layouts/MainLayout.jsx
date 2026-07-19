import "../styles/dashboard.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="content">
        <Navbar />

        <Outlet />

      </div>

    </div>
  );
}

export default MainLayout;