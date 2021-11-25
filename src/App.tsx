import React, {useState} from 'react';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Map} from "./Map";
import {OfficeResponse} from "./types/OfficeResponse";
import {OfficeDestinationBar} from "./OfficeDestinationBar";

function App() {
    const [info, setInfo] = useState<OfficeResponse[]>([]);
    const onDataDisplayed = (offices: OfficeResponse[]) => {
        setInfo(offices);
    }
    return (
      <div className={"App"} style={{flexDirection: 'column'}}>
          <OfficeDestinationBar onDataDisplayed={onDataDisplayed}/>
          <Map offices={info}/>
      </div>
    );
}

export default App;
