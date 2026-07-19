import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";
import axios from "axios";

function FullMap({ setSelectedLocation }) {

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

    <div className="card shadow">

      <div className="card-header">

        <b>Peta Daerah Rawan Banjir</b>

      </div>

      <div className="card-body p-0">

        <MapContainer
          center={[-6.2088, 106.8456]}
          zoom={11}
          style={{
          height:"calc(100vh - 150px)",
          width:"100%"
          }}
        >

          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {banjir.map((item, index) => {

            if (!item.Latitude || !item.Longitude) return null;

            const jiwa = Number(item.jumlah_jiwa_terdampak);

            let warna = "green";
            let radius = 6;
            let status = "Risiko Rendah";

            if (jiwa > 500) {

              warna = "red";
              radius = 14;
              status = "Risiko Tinggi";

            }

            else if (jiwa >= 100) {

              warna = "orange";
              radius = 10;
              status = "Risiko Sedang";

            }

            return (

              <CircleMarker

                key={index}

                center={[
                  Number(item.Latitude),
                  Number(item.Longitude),
                ]}

                radius={radius}

                pathOptions={{
                  color: warna,
                  fillColor: warna,
                  fillOpacity: 0.9,
                }}

                eventHandlers={{

                  click: () => {

                    setSelectedLocation(item);

                  }

                }}

              >

                <Popup>

                  <h6>{item.kelurahan}</h6>

                  <hr />

                  <p>
                    👥 <b>{jiwa}</b> Jiwa
                  </p>

                  <p>
                    📍 Kecamatan :
                    {" "}
                    {item.kecamatan}
                  </p>

                  <p>
                    🌊 Tinggi Air :
                    {" "}
                    {item.jumlah_rata_rata_ketinggian_air}
                    {" "}
                  </p>

                  <p>

                    Status :
                    {" "}

                    <b
                      style={{
                        color: warna
                      }}
                    >

                      {status}

                    </b>

                  </p>

                </Popup>

              </CircleMarker>

            );

          })}

        </MapContainer>

      </div>

    </div>

  );

}

export default FullMap;