import React from "react";
import {OfficeResponse} from "./types/OfficeResponse";

type Props = {
    company: OfficeResponse;
    onPressedLocation?: () => void;
};
type State = {
    count: number;
};

export class Card extends React.Component<Props, State> {
    render() {
        const company = this.props.company;

        return (
          <div className="company-info">
              <h1>{company.organization}</h1>
              <h2>{company.address}</h2>
          </div>
        );
    }
}
