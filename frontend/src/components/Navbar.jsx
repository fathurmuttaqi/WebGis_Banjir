import { useLocation } from "react-router-dom";
import { FiUser } from "react-icons/fi";

function Navbar() {

    const location = useLocation();

    const user = JSON.parse(localStorage.getItem("user"));

    const pageTitle = {
        "/": "Dashboard",
        "/map": "Peta Banjir",
        "/report": "Laporan",
        "/settings": "Pengaturan"
    };

    return (

        <div className="navbar">

            <h2>{pageTitle[location.pathname] || "WebGIS"}</h2>

            <div className="profile">
                <FiUser />
                <span>{user?.nama || "Admin"}</span>
            </div>

        </div>

    );

}

export default Navbar;