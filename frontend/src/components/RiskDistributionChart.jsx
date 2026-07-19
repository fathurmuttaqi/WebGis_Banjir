import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend
} from "chart.js";

import {Pie} from "react-chartjs-2";

import axios from "axios";

import {useEffect,useState} from "react";

ChartJS.register(
ArcElement,
Tooltip,
Legend
);

function RiskDistributionChart(){

const [chart,setChart]=useState();

useEffect(()=>{

loadData();

},[]);

const loadData=async()=>{

const res=await axios.get(
"http://localhost:5000/api/banjir"
);

let rendah=0;
let sedang=0;
let tinggi=0;

res.data.data.forEach(item=>{

const jiwa=
Number(item.jumlah_jiwa_terdampak);

if(jiwa>500){

tinggi++;

}

else if(jiwa>=100){

sedang++;

}

else{

rendah++;

}

});

setChart({

labels:[

"Risiko Rendah",

"Risiko Sedang",

"Risiko Tinggi"

],

datasets:[{

data:[

rendah,
sedang,
tinggi

],

backgroundColor:[

"#22c55e",

"#facc15",

"#ef4444"

]

}]

});

}

if (!chart) return null;

return (
  <div
    style={{
      width: "420px",
      height: "420px",
      margin: "20px auto",
    }}
  >
    <Pie
      data={chart}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      }}
    />
  </div>
);

}

export default RiskDistributionChart;