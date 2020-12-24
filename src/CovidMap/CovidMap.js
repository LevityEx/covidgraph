import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import './CovidMap.css'

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function CovidMap(props) {
  return (
    <ComposableMap data-tip="" 
    style={{
            width: "100%",
            height: "100%",
          }}>
      <ZoomableGroup
        zoom={1.5}
        center={[25,0]}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                className={props.colour}
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  const { ISO_A2, NAME } = geo.properties;
                  props.onHover(ISO_A2, NAME);
                }}
                onMouseLeave={() => {props.onLeave()}}
              />
            ))
          }
        </Geographies>
      </ZoomableGroup>  
    </ComposableMap>
  );
};

export default CovidMap;
