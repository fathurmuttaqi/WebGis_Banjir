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
      .get("http://localhost:5000/api/banjir")
      .then((res) => {
        setData(res.data.data);
      });
  }, []);

  const filteredData = data.filter((item) => {

  const cocokKelurahan =
    item.kelurahan
      .toLowerCase()
      .includes(search.toLowerCase());

  const cocokKecamatan =
    kecamatan === "Semua" ||
    item.kecamatan === kecamatan;

  let status = "Rendah";

  const jumlahPengungsi = Number(item.jumlah_pengungsi || 0);


if (jumlahPengungsi > 500) {
  status = "Tinggi";
} else if (jumlahPengungsi >= 100) {
  status = "Sedang";
}

  const cocokRisiko =
    risiko === "Semua" ||
    status === risiko;

  return (
    cocokKelurahan &&
    cocokKecamatan &&
    cocokRisiko
  );

});

  return (
    <div className="main">

      <div className="title">
        <h1>Laporan Daerah Rawan Banjir</h1>
        <p>Monitoring dan Rekapitulasi Data</p>
      </div>

      <div className="filter-box">

  <input
    type="text"
    placeholder="Cari Kelurahan..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    value={kecamatan}
    onChange={(e) => setKecamatan(e.target.value)}
  >
    <option value="Semua">Semua Kecamatan</option>
    <option value="cengkareng">Cengkareng</option>
    <option value="kebon jeruk">Kebon Jeruk</option>
    <option value="kembangan">Kembangan</option>
    <option value="grogol petamburan">Grogol Petamburan</option>
  </select>

  <select
    value={risiko}
    onChange={(e) => setRisiko(e.target.value)}
  >
    <option value="Semua">Semua Risiko</option>
    <option value="Tinggi">Tinggi</option>
    <option value="Sedang">Sedang</option>
    <option value="Rendah">Rendah</option>
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

            {filteredData.map((item, index) => {

               const jumlahPengungsi = Number(item.jumlah_pengungsi || 0);

               let risiko = "Rendah";

               if (jumlahPengungsi > 500) {
                    risiko = "Tinggi";
                } else if (jumlahPengungsi >= 100) {
                    risiko = "Sedang";
                  }

              return (

                <tr key={item.id}>

                  <td>{index + 1}</td>

                  <td>{item.kelurahan}</td>

                  <td>{item.kecamatan}</td>

                  <td>{item.jumlah_pengungsi}</td>

                  <td>{item.jumlah_rata_rata_ketinggian_air}</td>

                  <td>{risiko}</td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Report;