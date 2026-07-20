import { useEffect, useState } from "react";
import axios from "axios";

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

  const [banjir, setBanjir] = useState([]);


  // ===============================
  // Ambil data dari API Railway
  // ===============================
  useEffect(() => {

    axios.get(
      "https://webgisbanjir-production.up.railway.app/api/banjir"
    )
    .then((response)=>{

      console.log("DATA API :", response.data);

      setBanjir(response.data.data);

    })
    .catch((error)=>{

      console.error(
        "Gagal mengambil data banjir:",
        error
      );

    });

  },[]);



  // ===============================
  // Statistik Dashboard
  // ===============================

  const totalJiwa = banjir.reduce(
    (total,item)=>
      total + Number(item.jumlah_jiwa_terdampak || 0)
    ,0
  );


  const totalRW = banjir.reduce(
    (total,item)=>
      total + Number(item.jumlah_rw_terdampak || 0)
    ,0
  );


  const totalKecamatan = [
    ...new Set(
      banjir.map(
        item=>item.kecamatan
      )
    )
  ].length;



  return (

    <div className="main">


      <div className="title">

        <h1>
          Dashboard
        </h1>

        <p>
          Monitoring Daerah Rawan Banjir
        </p>

      </div>



      {/* ================= CARD ================= */}

      <div className="cards">


        <DashboardCard
          title="Total Kejadian"
          value={banjir.length}
          icon={<FaWater />}
          color="#2563EB"
        />


        <DashboardCard
          title="Total Jiwa"
          value={
            totalJiwa.toLocaleString()
          }
          icon={<FaUsers />}
          color="#16A34A"
        />


        <DashboardCard
          title="RW"
          value={totalRW}
          icon={<FaHome />}
          color="#F59E0B"
        />


        <DashboardCard
          title="Kecamatan"
          value={totalKecamatan}
          icon={<FaMapMarkerAlt />}
          color="#DC2626"
        />


      </div>





      {/* ================= CHART + MAP ================= */}


      <div className="chart-grid">


        <div className="chart-card">


          <Top10Chart
            data={banjir}
          />


        </div>



        <div className="chart-card">


          <MiniMap
            data={banjir}
          />


        </div>


      </div>





      {/* ================= PIE CHART ================= */}


      <div className="chart-card mt-4">


        <RiskDistributionChart
          data={banjir}
        />


      </div>


    </div>

  );

}


export default Dashboard;