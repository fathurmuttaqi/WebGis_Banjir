import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/Dashboardcard";
import Top10Chart from "../components/Top10Chart";
import MiniMap from "../components/MiniMap";
import RiskDistributionChart from "../components/RiskDistributionChart";

import {
  FaWater,
  FaUsers,
  FaHome,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Home() {
  return (
    <MainLayout>
      <div> </div> className="main"

        <div className="title">
          <h1>Dashboard</h1>
          <p>Sistem Informasi Geografis Pemetaan Daerah Rawan Banjir</p>
        </div>

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
            title="RW Terdampak"
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

        <div className="section">

        <div className="chart">

        <h2>
        Top 10 Kelurahan
        </h2>

        <Top10Chart/>

        </div>

        <div className="minimap">

        <h2>
        Mini Map
        </h2>

        <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "10px",
    fontSize: "13px"
  }}
>

  <span>🟢 Rendah</span>

  <span>🟠 Sedang</span>

  <span>🔴 Tinggi</span>

</div>

<MiniMap />


      </div>

      </div>

      <div
      style={{
      display:"grid",
      gridTemplateColumns:"1fr",
      marginTop:"20px"
      }}
      >

      <div className="chart">

      <h2>
      Distribusi Risiko
      </h2>

      <RiskDistributionChart/>

      </div>


      </div>
    </MainLayout>
  );
}

export default Home;