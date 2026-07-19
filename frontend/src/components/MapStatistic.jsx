import axios from "axios";
import { useEffect, useState } from "react";

function MapStatistic() {

    const [stat, setStat] = useState({

        tinggi:0,
        sedang:0,
        rendah:0

    });

    useEffect(() => {

        axios.get("http://localhost:5000/api/banjir")
        .then(res=>{

            const data=res.data.data;

            let tinggi=0;
            let sedang=0;
            let rendah=0;

            data.forEach(item=>{

                const jiwa=Number(item.jumlah_jiwa_terdampak);

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

            setStat({

                tinggi,
                sedang,
                rendah

            });

        });

    },[]);

    return(

        <div className="card shadow">

            <div className="card-header">

                <b>Statistik Wilayah</b>

            </div>

            <div className="card-body">

                <h5>🔴 {stat.tinggi} Wilayah</h5>

                <h5>🟠 {stat.sedang} Wilayah</h5>

                <h5>🟢 {stat.rendah} Wilayah</h5>

            </div>

        </div>

    );

}

export default MapStatistic;