import axios, { AxiosRequestConfig } from 'axios';
import { parseResponse } from '@jweb-development/response-parser';
import { CISCO_API } from '../config';
import { IGetDestinations } from '../typings';

const getDestinations: IGetDestinations = async (config, organizationID, destinationListID) => {
  try {
    const { MANAGEMENT: { key: mgmtKey = '', secret: mgmtSecret = '' } = {} } = config;
    if (!mgmtKey || !mgmtSecret) {
      throw new Error('Config is missing management keys.');
    }

    if (!organizationID) {
      throw new Error('Organization ID not found.');
    }
    if (!destinationListID) {
      throw new Error('Destination List ID not found.');
    }

    const path =
      CISCO_API.MANAGEMENT + `/organizations/${organizationID}/destinationlists/${destinationListID}/destinations`;
    const options: AxiosRequestConfig = {
      method: 'get',
      url: path,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      auth: {
        username: mgmtKey,
        password: mgmtSecret,
      },
    };

    const response = await axios.request(options);
    const parsedResponse = parseResponse(response);

    if (parsedResponse && !parsedResponse.error) {
      console.log(response.data)
      return response.data;
    }

    throw new Error('Failed to acquire destinations.');
  } catch (err) {
    throw err;
  }
};

export default { getDestinations };
