function InfoPanel({ data }) {

  if (!data) {

    return (

      <div className="card shadow">

        <div className="card-body">

          Klik salah satu pin lokasi untuk melihat detail.

        </div>

      </div>

    );

  }

  return (

    <div className="card shadow">

      <div className="card-header">

        <b>Detail Lokasi</b>

      </div>

      <div className="card-body">

        <p><b>Kelurahan :</b> {data.kelurahan}</p>

        <p><b>Kecamatan :</b> {data.kecamatan}</p>

        <p><b>Jumlah Korban :</b> {data.jumlah_jiwa_terdampak} Jiwa</p>

        <p><b>Tinggi Air :</b> {data.jumlah_rata_rata_ketinggian_air}</p>

      </div>

    </div>

  );

}

export default InfoPanel;