import FullMap from "../components/FullMap";
import MapLegend from "../components/MapLegend";
import MapStatistic from "../components/MapStatistic";
import InfoPanel from "../components/InfoPanel";

import { useEffect, useState } from "react";
import api from "../services/api";

import "../styles/map.css";


function Map() {


  const [banjir,setBanjir] = useState([]);

  const [selectedLocation,setSelectedLocation] = useState(null);

  const [loading,setLoading] = useState(true);



  useEffect(()=>{

    fetchBanjir();

  },[]);




  const fetchBanjir = async()=>{


    try{


      const response = await api.get("/banjir");



      console.log(
        "DATA MAP:",
        response.data
      );



      const data =
        response.data?.data || [];



      console.log(
        "TOTAL DATA MAP:",
        data.length
      );



      setBanjir(data);



    }catch(error){


      console.error(
        "MAP ERROR:",
        error
      );


    }finally{


      setLoading(false);


    }


  };






  if(loading){


    return (

      <div className="main">

        <h2>
          Loading peta banjir...
        </h2>

      </div>

    );


  }







  return (

    <div className="main">


      <div className="title">


        <h1>
          Peta Daerah Rawan Banjir
        </h1>


        <p>
          Monitoring Daerah Rawan Banjir Jakarta
        </p>


      </div>





      <div className="map-layout">



        <div className="map-container">


          <FullMap


            data={banjir}


            setSelectedLocation={
              setSelectedLocation
            }


          />


        </div>






        <div className="map-sidebar">



          <InfoPanel

            data={selectedLocation}

          />



          <MapLegend />



          <MapStatistic

            data={banjir}

          />



        </div>



      </div>



    </div>

  );

}


export default Map;