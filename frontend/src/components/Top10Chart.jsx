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



  if (!data || data.length === 0) {

    return (

      <div
        style={{
          height:"320px",
          display:"flex",
          alignItems:"center",
          justifyContent:"center"
        }}
      >

        Data banjir belum tersedia

      </div>

    );

  }





  // =============================
  // TOTAL PENGUNGSI PER KELURAHAN
  // =============================


  const jumlahKelurahan = {};



  data.forEach((item)=>{


    const kelurahan =

      item.kelurahan || "Tidak diketahui";



    const pengungsi =

      Number(
        item.jumlah_pengungsi || 0
      );



    if(!jumlahKelurahan[kelurahan]){

      jumlahKelurahan[kelurahan] = 0;

    }



    jumlahKelurahan[kelurahan] += pengungsi;



  });







  const top10 = Object.entries(jumlahKelurahan)

    .sort((a,b)=>b[1]-a[1])

    .slice(0,10);







  const chartData = {


    labels:

      top10.map(
        ([nama])=>nama
      ),



    datasets:[

      {

        label:
        "Jumlah Pengungsi",



        data:

          top10.map(
            ([,jumlah])=>jumlah
          ),



        backgroundColor:"#2563EB",


        borderRadius:6


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


        text:
        "Top 10 Kelurahan Berdasarkan Pengungsi"



      },



      tooltip:{


        callbacks:{


          label:(context)=>{


            return (

              context.raw.toLocaleString()

              +

              " Pengungsi"

            );


          }


        }


      }


    },





    scales:{


      x:{


        ticks:{


          maxRotation:45,

          minRotation:45


        }


      },



      y:{


        beginAtZero:true,


        title:{


          display:true,


          text:"Jumlah Pengungsi"


        }


      }


    }



  };








  return (

    <div

      style={{

        height:"320px"

      }}

    >


      <Bar

        data={chartData}

        options={options}

      />


    </div>

  );


}



export default Top10Chart;