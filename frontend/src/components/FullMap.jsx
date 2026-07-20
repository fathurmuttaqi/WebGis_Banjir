import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap
} from "react-leaflet";

import { useEffect } from "react";
import "leaflet/dist/leaflet.css";


// Refresh ukuran map
function ResizeMap(){

  const map = useMap();

  useEffect(()=>{

    setTimeout(()=>{

      map.invalidateSize();

    },500);


  },[map]);


  return null;

}



// Zoom otomatis berdasarkan data
function FitBounds({data}){

  const map = useMap();


  useEffect(()=>{

    if(data.length > 0){

      const valid = data.filter(item=>

        item.Latitude &&
        item.Longitude

      );


      if(valid.length > 0){


        const lat =
          Number(valid[0].Latitude);


        const lng =
          Number(valid[0].Longitude);



        map.setView(
          [
            lat,
            lng
          ],
          12
        );


      }

    }


  },[data,map]);


  return null;

}




function FullMap({
  data=[],
  setSelectedLocation
}){


  console.log(
    "FULLMAP DATA:",
    data.length
  );



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



        <ResizeMap/>


        <FitBounds data={data}/>




        <TileLayer

          attribution="&copy; OpenStreetMap"

          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

        />





        {
          data.map((item)=>{


            const lat =
            parseFloat(item.Latitude);



            const lng =
            parseFloat(item.Longitude);




            if(
              Number.isNaN(lat) ||
              Number.isNaN(lng)
            ){

              return null;

            }




            const pengungsi =
            Number(
              item.jumlah_pengungsi || 0
            );




            let warna="green";

            let status="Risiko Rendah";

            let radius=8;




            if(pengungsi > 500){

              warna="red";

              status="Risiko Tinggi";

              radius=14;


            }
            else if(pengungsi >=100){

              warna="orange";

              status="Risiko Sedang";

              radius=11;

            }





            return (


            <CircleMarker


              key={item.id}


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


                <b>
                  {item.kelurahan}
                </b>


                <br/>


                Kecamatan :
                {" "}
                {item.kecamatan}


                <br/>


                Pengungsi :
                {" "}
                {pengungsi.toLocaleString()}


                <br/>


                Tinggi Air :
                {" "}
                {item.jumlah_rata_rata_ketinggian_air}



                <br/>


                Status :
                {" "}
                <b style={{
                  color:warna
                }}>

                {status}

                </b>



              </Popup>



            </CircleMarker>


            )


          })

        }



      </MapContainer>


      </div>


    </div>

  );

}


export default FullMap;