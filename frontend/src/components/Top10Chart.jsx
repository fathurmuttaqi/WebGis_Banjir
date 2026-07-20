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


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



function Top10Chart({ data = [] }) {


  // ============================
  // Ambil Top 10 Kelurahan
  // berdasarkan jumlah jiwa
  // ============================

  const hasil = {};


  data.forEach((item)=>{

    const kelurahan = item.kelurahan;

    const jiwa =
      Number(item.jumlah_jiwa_terdampak || 0);


    if(!hasil[kelurahan]){

      hasil[kelurahan] = 0;

    }


    hasil[kelurahan] += jiwa;


  });



  const top10 = Object.entries(hasil)

    .sort((a,b)=>b[1]-a[1])

    .slice(0,10);



  const dataChart = {


    labels: top10.map(
      item=>item[0]
    ),


    datasets:[

      {

        label:"Jumlah Jiwa Terdampak",


        data: top10.map(
          item=>item[1]
        ),


        backgroundColor:"#2563EB",


        borderRadius:8,


      }

    ]

  };





  const options = {


    responsive:true,


    maintainAspectRatio:false,


    plugins:{


      legend:{

        display:false

      },


      title:{

        display:true,

        text:"Top 10 Kelurahan Terdampak Banjir"

      }


    },


    scales:{


      y:{

        beginAtZero:true

      }


    }


  };





  return (

    <div style={{
      height:"320px"
    }}>


      <Bar

        data={dataChart}

        options={options}

      />


    </div>

  );

}



export default Top10Chart;