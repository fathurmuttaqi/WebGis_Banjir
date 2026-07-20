import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap
} from "react-leaflet";

import {
  useEffect
} from "react";

import "leaflet/dist/leaflet.css";




// Refresh ukuran leaflet

function ResizeMap(){

  const map = useMap();


  useEffect(()=>{


    setTimeout(()=>{

      map.invalidateSize();

    },500);


  },[map]);


  return null;

}





// Fokus ke data banjir

function FitBounds({data}){


  const map = useMap();



  useEffect(()=>{


    if(data.length > 0){


      const validData = data.filter(item=>

        item.Latitude &&
        item.Longitude

      );



      if(validData.length > 0){


        map.setView(

          [
            Number(validData[0].Latitude),
            Number(validData[0].Longitude)

          ],

          11

        );


      }


    }



  },[data,map]);



  return null;

}







function FullMap({
  data = [],
  setSelectedLocation
}) {



console.log(
  "FULLMAP DATA:",
  data
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



key={data.length}



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



<ResizeMap />



<FitBounds data={data}/>






<TileLayer


attribution="&copy; OpenStreetMap"


url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"


/>









{

data.map((item,index)=>{


const lat =
Number(item.Latitude);



const lng =
Number(item.Longitude);





if(

isNaN(lat) ||

isNaN(lng)

){

return null;

}






const pengungsi =
Number(
item.jumlah_pengungsi || 0
);






let warna="green";

let radius=7;

let status="Risiko Rendah";





if(pengungsi > 500){


warna="red";

radius=14;

status="Risiko Tinggi";


}

else if(pengungsi >=100){


warna="orange";

radius=10;

status="Risiko Sedang";


}







return(



<CircleMarker



key={item.id || index}



center={[

lat,

lng

]}



radius={radius}



pathOptions={{


color:warna,


fillColor:warna,


fillOpacity:0.8


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


<h4>

{item.kelurahan}

</h4>



<p>

📍 Kecamatan :

{ " " }

{item.kecamatan}

</p>




<p>

👥 Jumlah Pengungsi :

<br/>

<b>

{pengungsi.toLocaleString()}

</b>

</p>





<p>

🌊 Tinggi Air :

<br/>

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