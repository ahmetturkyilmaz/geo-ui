import React from "react";
import {Card} from "./Card";
import {OfficeResponse} from "./types/OfficeResponse";

export function CardList(props: { offices: OfficeResponse[]; }) {

    return (
      <div>
          {props.offices.map(company => <Card company={company}/>)}
      </div>
    );

}
