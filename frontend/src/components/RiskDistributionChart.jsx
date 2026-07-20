import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";

import { Pie } from "react-chartjs-2";


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);



function RiskDistributionChart({ data = [] }) {



  if (!data || data.length === 0) {

    return (

      <div
        style={{
          height:"350px",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}
      >

        Data banjir belum tersedia

      </div>

    );

  }





  let rendah = 0;
  let sedang = 0;
  let tinggi = 0;





  // Risiko berdasarkan jumlah pengungsi

  data.forEach((item)=>{


    const pengungsi =
      Number(
        item.jumlah_pengungsi || 0
      );



    if(pengungsi > 500){


      tinggi++;


    }

    else if(pengungsi >= 100){


      sedang++;


    }

    else{


      rendah++;


    }


  });






  const total =
    rendah + sedang + tinggi;






  const chartData = {


    labels:[

      "Risiko Rendah",

      "Risiko Sedang",

      "Risiko Tinggi"

    ],



    datasets:[


      {

        label:"Jumlah Wilayah",


        data:[

          rendah,

          sedang,

          tinggi

        ],



        backgroundColor:[

          "#22c55e",

          "#facc15",

          "#ef4444"

        ],



        borderWidth:2


      }


    ]

  };








  const options = {


    responsive:true,


    maintainAspectRatio:false,



    plugins:{


      legend:{


        position:"bottom"


      },



      title:{


        display:true,


        text:
        "Distribusi Risiko Banjir Berdasarkan Pengungsi"


      },



      tooltip:{


        callbacks:{


          label:(context)=>{


            const value =
              context.raw;



            const persen =
              total > 0

              ?

              ((value / total) * 100)
              .toFixed(1)

              :

              0;




            return (

              context.label
              +
              ": "
              +
              value
              +
              " wilayah ("
              +
              persen
              +
              "%)"

            );


          }


        }


      }


    }


  };







  return (

    <div

      style={{

        width:"100%",

        height:"350px"

      }}

    >


      <Pie

        data={chartData}

        options={options}

      />


    </div>


  );


}



export default RiskDistributionChart;