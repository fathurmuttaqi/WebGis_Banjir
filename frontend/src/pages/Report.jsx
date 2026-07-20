import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/report.css";


function Report() {


  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [kecamatan, setKecamatan] = useState("Semua");

  const [risiko, setRisiko] = useState("Semua");




  useEffect(() => {

    getData();

  }, []);





  const getData = async () => {

    try {


      const res = await api.get("/banjir");


      console.log(
        "DATA REPORT:",
        res.data
      );


      setData(
        res.data.data || []
      );


    } catch (error) {


      console.error(
        "REPORT ERROR:",
        error
      );


    } finally {


      setLoading(false);


    }

  };







  // Risiko berdasarkan jumlah pengungsi

  const getRisiko = (item) => {


    const pengungsi = Number(
      item.jumlah_pengungsi || 0
    );



    if (pengungsi > 500) {

      return "Tinggi";

    }


    else if (pengungsi >= 100) {

      return "Sedang";

    }


    else {

      return "Rendah";

    }


  };







  const daftarKecamatan = [

    ...new Set(
      data.map(
        item => item.kecamatan
      )
    )

  ];







  const filteredData = data.filter((item) => {


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








  if (loading) {


    return (

      <div className="main">

        <h2>
          Loading data banjir...
        </h2>

      </div>

    );

  }







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

            daftarKecamatan.map((item)=>(

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

              <th>Jumlah Pengungsi</th>

              <th>Tinggi Air</th>

              <th>Risiko</th>


            </tr>


          </thead>






          <tbody>


          {


            filteredData.length === 0 ? (


              <tr>

                <td
                  colSpan="6"
                  style={{
                    textAlign:"center"
                  }}
                >

                  Data tidak ditemukan

                </td>

              </tr>


            )

            :


            filteredData.map((item,index)=>(


              <tr key={item.id}>


                <td>
                  {index + 1}
                </td>



                <td>
                  {item.kelurahan}
                </td>



                <td>
                  {item.kecamatan}
                </td>



                <td>

                  {Number(
                    item.jumlah_pengungsi || 0
                  ).toLocaleString()}

                </td>



                <td>

                  {item.jumlah_rata_rata_ketinggian_air}

                </td>




                <td>

                  <b>

                    {getRisiko(item)}

                  </b>

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