import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";


function FullMap({ data = [], setSelectedLocation }) {


  return (

    <div className="card shadow">


      <div className="card-header">

        <b>
          Peta Daerah Rawan Banjir
        </b>

      </div>



      <div className="card-body p-0">


        <MapContainer

          center={[
            -6.2088,
            106.8456
          ]}

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





          {

            data.map((item,index)=>{


              const lat = Number(item.Latitude);

              const lng = Number(item.Longitude);



              if(
                isNaN(lat) ||
                isNaN(lng)
              ){

                return null;

              }



              const jiwa =
                Number(item.jumlah_jiwa_terdampak || 0);



              let warna = "green";

              let radius = 6;

              let status = "Risiko Rendah";




              if(jiwa > 500){

                warna="red";

                radius=14;

                status="Risiko Tinggi";

              }


              else if(jiwa >=100){


                warna="orange";

                radius=10;

                status="Risiko Sedang";


              }





              return (

                <CircleMarker


                  key={index}


                  center={[

                    lat,

                    lng

                  ]}


                  radius={radius}


                  pathOptions={{


                    color:warna,


                    fillColor:warna,


                    fillOpacity:0.9


                  }}



                  eventHandlers={{


                    click:()=>{


                      if(setSelectedLocation){

                        setSelectedLocation(item);

                      }


                    }


                  }}


                >



                  <Popup>


                    <h6>

                      {item.kelurahan}

                    </h6>


                    <hr />



                    <p>

                      👥

                      {" "}

                      <b>

                        {jiwa}

                      </b>

                      {" "}

                      Jiwa

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

                    </p>




                    <p>

                      Status :

                      {" "}


                      <b

                        style={{
                          color:warna
                        }}

                      >

                        {status}

                      </b>


                    </p>



                  </Popup>



                </CircleMarker>


              );


            })

          }




        </MapContainer>



      </div>



    </div>


  );

}



export default FullMap;