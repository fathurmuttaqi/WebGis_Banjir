import DashboardCard from "../components/DashboardCard";
import Top10Chart from "../components/Top10Chart";
import MiniMap from "../components/MiniMap";
import RiskDistributionChart from "../components/RiskDistributionChart";

import {
  FaMapMarkerAlt,
  FaUsers,
  FaHome,
  FaWater,
} from "react-icons/fa";

function Dashboard() {
  return (
    <div className="main">

      <div className="title">
        <h1>Dashboard</h1>
        <p>Monitoring Daerah Rawan Banjir</p>
      </div>

      {/* CARD */}
      <div className="cards">

        <DashboardCard
          title="Total Kejadian"
          value="340"
          icon={<FaWater />}
          color="#2563EB"
        />

        <DashboardCard
          title="Total Jiwa"
          value="31.695"
          icon={<FaUsers />}
          color="#16A34A"
        />

        <DashboardCard
          title="RW"
          value="264"
          icon={<FaHome />}
          color="#F59E0B"
        />

        <DashboardCard
          title="Kecamatan"
          value="44"
          icon={<FaMapMarkerAlt />}
          color="#DC2626"
        />

      </div>

      {/* CHART */}
      <div className="chart-grid">

        <div className="chart-card">
          <Top10Chart />
        </div>

        <div className="chart-card">
          <MiniMap />
        </div>

      </div>

      {/* PIE */}
      <div className="chart-card mt-4">
        <RiskDistributionChart />
      </div>

    </div>
  );
}

export default Dashboard;
