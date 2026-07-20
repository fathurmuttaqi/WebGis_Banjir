import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { useEffect } from "react";



function AutoZoom({data}) {

  const map = useMap();


  useEffect(()=>{


    if(data.length > 0){


      const points = data
      .filter(item =>
        item.Latitude &&
        item.Longitude
      )
      .map(item=>[

        Number(item.Latitude),

        Number(item.Longitude)

      ]);



      if(points.length > 0){

        map.fitBounds(points,{
          padding:[20,20]
        });

      }


    }


  },[data,map]);



  return null;

}





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


        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"


      />



      <AutoZoom data={data}/>





      {
        data.map((item,index)=>{


          const lat =
          parseFloat(item.Latitude);


          const lng =
          parseFloat(item.Longitude);



          if(
            isNaN(lat) ||
            isNaN(lng)
          ){

            return null;

          }




          const jiwa =
          Number(
            item.jumlah_jiwa_terdampak || 0
          );



          let warna="green";

          let status="Risiko Rendah";



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


              key={item.id || index}


              center={[

                lat,

                lng

              ]}


              radius={10}



              pathOptions={{


                color:warna,


                fillColor:warna,


                fillOpacity:0.8,


                weight:2


              }}


            >



              <Popup>


                <div>


                  <h4>

                    {item.kelurahan}

                  </h4>



                  <hr/>




                  <p>

                    Kecamatan :

                    <b>

                    {" "}
                    {item.kecamatan}

                    </b>

                  </p>




                  <p>

                    👥 Jiwa terdampak :

                    <b>

                    {" "}
                    {jiwa.toLocaleString()}

                    </b>

                  </p>




                  <p>

                    🌊 Tinggi air :

                    <b>

                    {" "}
                    {item.jumlah_rata_rata_ketinggian_air}

                    </b>

                  </p>





                  <p>

                    Status :

                    <b
                      style={{
                        color:warna
                      }}
                    >

                    {" "}
                    {status}

                    </b>

                  </p>


                </div>


              </Popup>



            </CircleMarker>


          );


        })
      }



    </MapContainer>


  );


}



export default MiniMap;