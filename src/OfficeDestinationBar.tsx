import React, {useState} from "react";
import {Form} from "./Form";
import {CardList} from "./CardList";
import {OfficeResponse} from "./types/OfficeResponse";
import {geoInfoNetwork} from "./repository/GeoInfoRepository";


export function OfficeDestinationBar(props: { onDataDisplayed: (offices: OfficeResponse[]) => void }) {
    const [offices, setOffices] = useState<OfficeResponse[]>([])
    const getOffices = (distance: number) => {
        geoInfoNetwork.getAllWithCircle(51.5144636, -0.142571, distance)
          .then(response => {
              console.log("response", response);
              setOffices(response);
              props.onDataDisplayed(response)
          });
    }
    return (
      <div className={"App-OfficeDestinationBar"}>
          <div className="header">Destination</div>
          <Form onSubmit={getOffices}/>
          <CardList offices={offices}/>
      </div>
    );
}
