import {get} from './network';
import {OfficeResponse} from "../types/OfficeResponse";

const baseUrl = process.env.REACT_APP_GEO_API_URL;
const url = {
    officeInfo: baseUrl + '/office-info',
};
const geoInfoNetwork = {
    getAllWithCircle: async (lat: number, lng: number, distance: number): Promise<OfficeResponse[]> => {
        return get(`${url.officeInfo}/${lat}/${lng}/${distance}`);
    },
};

export {geoInfoNetwork};
