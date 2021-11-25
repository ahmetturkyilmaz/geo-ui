import Axios, {AxiosRequestConfig} from 'axios';

const get = async (endpoint: string, params?: AxiosRequestConfig) => {
    return Axios.get(`${endpoint}`, {
        params,
    })
      .then((response) => {
          return response.data;
      })
};
export {get};
