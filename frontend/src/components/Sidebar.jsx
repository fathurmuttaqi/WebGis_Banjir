import {
  FiHome,
  FiMap,
  FiFileText,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    const konfirmasi = window.confirm(
        "Apakah Anda yakin ingin logout?"
    );

    if (!konfirmasi) return;

    localStorage.removeItem("user");

    navigate("/login");

};

  return (
    <div className="sidebar">

      <div>

        <div className="logo">
          <h1>🌊</h1>
          <h2>WebGIS</h2>
          <p>Pemetaan Daerah</p>
          <p>Rawan Banjir</p>
        </div>

        <div className="menu">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <FiHome />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/map"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <FiMap />
            <span>Peta</span>
          </NavLink>

          <NavLink
            to="/report"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <FiFileText />
            <span>Laporan</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <FiSettings />
            <span>Pengaturan</span>
          </NavLink>

        </div>

      </div>

      <div className="logout" onClick={handleLogout}>
        <FiLogOut />
        <span>Logout</span>
      </div>

    </div>
  );
}

export default Sidebar;