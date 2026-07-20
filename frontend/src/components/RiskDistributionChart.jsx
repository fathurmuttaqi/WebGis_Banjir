import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);



function RiskDistributionChart({ data = [] }) {


  let rendah = 0;
  let sedang = 0;
  let tinggi = 0;



  data.forEach((item)=>{


    const jiwa = Number(
      item.jumlah_jiwa_terdampak || 0
    );


    if(jiwa > 500){

      tinggi++;

    }

    else if(jiwa >= 100){

      sedang++;

    }

    else{

      rendah++;

    }


  });



  const chart = {


    labels:[

      "Risiko Rendah",

      "Risiko Sedang",

      "Risiko Tinggi"

    ],



    datasets:[

      {

        label:"Distribusi Risiko Banjir",


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


        borderWidth:1

      }

    ]

  };





  return (

    <div

      style={{

        width:"350px",

        height:"350px",

        margin:"20px auto"

      }}

    >


      <Pie

        data={chart}


        options={{

          responsive:true,


          maintainAspectRatio:false,


          plugins:{


            legend:{

              position:"top"

            },


            title:{

              display:true,

              text:"Distribusi Risiko Banjir"

            }

          }

        }}

      />


    </div>

  );


}


export default RiskDistributionChart;