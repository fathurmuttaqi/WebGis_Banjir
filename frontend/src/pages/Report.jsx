import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/report.css";


function Report() {


  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");

  const [kecamatan, setKecamatan] = useState("Semua");

  const [risiko, setRisiko] = useState("Semua");



  useEffect(() => {


    axios
      .get(
        "https://webgisbanjir-production.up.railway.app/api/banjir"
      )

      .then((res)=>{

        console.log("DATA REPORT:", res.data);

        setData(res.data.data);

      })

      .catch((err)=>{

        console.log(err);

      });


  },[]);





  const getRisiko = (item)=>{


    const jiwa =
      Number(item.jumlah_jiwa_terdampak || 0);



    if(jiwa > 500){

      return "Tinggi";

    }


    else if(jiwa >= 100){

      return "Sedang";

    }


    return "Rendah";


  };






  const filteredData = data.filter((item)=>{


    const cocokKelurahan =

      item.kelurahan
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      );



    const cocokKecamatan =

      kecamatan === "Semua" ||

      item.kecamatan === kecamatan;



    const cocokRisiko =

      risiko === "Semua" ||

      getRisiko(item) === risiko;



    return (

      cocokKelurahan &&

      cocokKecamatan &&

      cocokRisiko

    );


  });





  return (

    <div className="main">


      <div className="title">

        <h1>
          Laporan Daerah Rawan Banjir
        </h1>


        <p>
          Monitoring dan Rekapitulasi Data
        </p>

      </div>





      <div className="filter-box">


        <input

          type="text"

          placeholder="Cari Kelurahan..."

          value={search}

          onChange={(e)=>
            setSearch(e.target.value)
          }

        />



        <select

          value={kecamatan}

          onChange={(e)=>
            setKecamatan(e.target.value)
          }

        >

          <option value="Semua">
            Semua Kecamatan
          </option>


          {
            [
              ...new Set(
                data.map(
                  item=>item.kecamatan
                )
              )
            ].map((item)=>(

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            ))
          }


        </select>





        <select

          value={risiko}

          onChange={(e)=>
            setRisiko(e.target.value)
          }

        >

          <option value="Semua">
            Semua Risiko
          </option>

          <option value="Tinggi">
            Tinggi
          </option>

          <option value="Sedang">
            Sedang
          </option>

          <option value="Rendah">
            Rendah
          </option>


        </select>



      </div>







      <div className="table-card">


        <table>


          <thead>

            <tr>

              <th>No</th>

              <th>Kelurahan</th>

              <th>Kecamatan</th>

              <th>Jumlah Jiwa</th>

              <th>Tinggi Air</th>

              <th>Risiko</th>


            </tr>


          </thead>





          <tbody>


          {

            filteredData.map((item,index)=>(


              <tr key={item.id}>


                <td>
                  {index+1}
                </td>



                <td>
                  {item.kelurahan}
                </td>



                <td>
                  {item.kecamatan}
                </td>



                <td>
                  {item.jumlah_jiwa_terdampak}
                </td>



                <td>
                  {item.jumlah_rata_rata_ketinggian_air}
                </td>



                <td>

                  {getRisiko(item)}

                </td>



              </tr>


            ))

          }


          </tbody>



        </table>


      </div>



    </div>

  );


}


export default Report;