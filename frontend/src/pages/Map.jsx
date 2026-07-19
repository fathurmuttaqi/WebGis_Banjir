import FullMap from "../components/FullMap";
import MapLegend from "../components/MapLegend";
import MapStatistic from "../components/MapStatistic";
import InfoPanel from "../components/InfoPanel";
import { useState } from "react";
import "../styles/map.css";

function Map() {

  const [selectedLocation, setSelectedLocation] = useState(null);

  return (

    <div className="main">

      <div className="title">
        <h1>Peta Daerah Rawan Banjir</h1>
        <p>Monitoring Daerah Rawan Banjir Jakarta</p>
      </div>

      <div className="map-layout">

        <div className="map-container">

          <FullMap
            setSelectedLocation={setSelectedLocation}
          />

        </div>

        <div className="map-sidebar">

          <InfoPanel
            data={selectedLocation}
          />

          <MapLegend />

          <MapStatistic />

        </div>

      </div>

    </div>

  );

}

export default Map;