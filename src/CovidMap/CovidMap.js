import React from 'react';
import './CovidMap.css';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function CovidMap(props) {
  return (
    <div>
      <ComposableMap data-tip="" width="1000">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
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
      </ComposableMap>
    </div>
  );
};

export default CovidMap;
