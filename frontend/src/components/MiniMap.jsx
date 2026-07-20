import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";


function MiniMap({ data = [] }) {


  return (

    <MapContainer

      center={[-6.2088,106.8456]}

      zoom={10}

      style={{
        height:"300px",
        width:"100%",
        borderRadius:"10px"
      }}

    >


      <TileLayer

        attribution="&copy; OpenStreetMap"

        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

      />



      {

        data.map((item,index)=>{


          const lat = Number(item.Latitude);

          const lng = Number(item.Longitude);


          // validasi koordinat

          if(
            isNaN(lat) ||
            isNaN(lng)
          ){

            return null;

          }



          const jiwa =
            Number(item.jumlah_jiwa_terdampak || 0);



          let warna = "green";

          let status = "Risiko Rendah";



          if(jiwa > 500){

            warna="red";

            status="Risiko Tinggi";

          }


          else if(jiwa >=100){

            warna="orange";

            status="Risiko Sedang";

          }



          return (

            <CircleMarker

              key={index}

              center={[
                lat,
                lng
              ]}


              radius={7}


              pathOptions={{

                color:warna,

                fillColor:warna,

                fillOpacity:0.8

              }}

            >


              <Popup>


                <b>
                  {item.kelurahan}
                </b>


                <br/>


                Kecamatan:
                {" "}
                {item.kecamatan}


                <br/>


                Jiwa terdampak:
                {" "}
                {jiwa}


                <br/>


                Status:

                {" "}

                <b>
                  {status}
                </b>


              </Popup>


            </CircleMarker>

          );


        })

      }



    </MapContainer>


  );


}


export default MiniMap;