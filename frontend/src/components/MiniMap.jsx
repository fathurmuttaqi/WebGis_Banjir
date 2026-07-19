import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";

function MiniMap() {

  const [banjir, setBanjir] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/banjir"
      );

      setBanjir(res.data.data);

    } catch (err) {

      console.log(err);

    }
  };

  return (

    <MapContainer
      center={[-6.2088, 106.8456]}
      zoom={10}
      style={{
        height: "300px",
        width: "100%",
        borderRadius: "10px",
      }}
    >

      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {

        banjir.map((item, index) => {

          if (!item.Latitude || !item.Longitude) return null;

          const jiwa = Number(item.jumlah_jiwa_terdampak);

          let warna = "green";
          let status = "Risiko Rendah";

          if (jiwa > 500) {

            warna = "red";
            status = "Risiko Tinggi";

          }

          else if (jiwa >= 100) {

            warna = "orange";
            status = "Risiko Sedang";

          }

          return (

            <CircleMarker
              key={index}
              center={[
                Number(item.Latitude),
                Number(item.Longitude),
              ]}
              radius={7}
              pathOptions={{
                color: warna,
                fillColor: warna,
                fillOpacity: 0.9,
              }}
            >

              <Popup>

                <b>{item.kelurahan}</b>

                <br />

                Jiwa Terdampak :
                {" "}
                {jiwa}

                <br />

                Status :
                {" "}
                <b>{status}</b>

              </Popup>

            </CircleMarker>

          );

        })

      }

    </MapContainer>

  );

}

export default MiniMap;