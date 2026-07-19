import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Top10Chart() {
  const [dataChart, setDataChart] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getTop10();
  }, []);

  const getTop10 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/banjir/top10"
      );

      const data = response.data.data;
      console.log(data);

      setDataChart({
        labels: data.map((item) => item.kelurahan),
        datasets: [
          {
            label: "Jumlah Jiwa Terdampak",
            data: data.map((item) => Number(item.total_jiwa)),
            backgroundColor: "#2563EB",
            borderRadius: 8,
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ height: "320px" }}>
      <Bar data={dataChart} options={options} />
    </div>
  );
}

export default Top10Chart;