import axios, { AxiosRequestConfig } from 'axios';
import { parseResponse } from '@jweb-development/response-parser';
import { CISCO_API } from '../config';
import { IGetDestinations, ICiscoListDestination, IAddDestinations, IDestinationStatus, ICiscoList, IDeleteDestinations } from '../typings';
import { getDestinationType } from '../utils';

const getDestinations: IGetDestinations = async (config, organizationID, destinationListID, page, limit) => {
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
      params: {
        page,
        limit,
      },
    };

    const response = await axios.request(options);
    const parsedResponse = parseResponse(response);

    if (parsedResponse && !parsedResponse.error) {
      const { status = {}, meta = {}, data = [] } = response.data;
      return { status, meta, data };
    }

    throw new Error('Failed to acquire destinations.');
  } catch (err) {
    throw err;
  }
};

const addDestinations: IAddDestinations = async (config, organizationID, destinationListID, destinations) => {
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

    const newDestinations = destinations.reduce((arr: ICiscoListDestination[], destinationInfo) => {
      if (destinationInfo && destinationInfo.destination) {
        const { comment } = destinationInfo;
        const { destination } = getDestinationType(destinationInfo.destination);

        arr.push({ comment, destination });
      }
      return arr;
    }, []);

    if (newDestinations && Boolean(newDestinations.length)) {
      const path =
        CISCO_API.MANAGEMENT + `/organizations/${organizationID}/destinationlists/${destinationListID}/destinations`;
      const options: AxiosRequestConfig = {
        method: 'post',
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
        data: newDestinations,
      };

      const response = await axios.request(options);
      const parsedResponse = parseResponse(response);

      if (parsedResponse && !parsedResponse.error) {
        const { status, data }: { status: IDestinationStatus, data: ICiscoList } = response.data
        return { status, data }
      }
    }

    throw new Error('Failed to add destinations.');
  } catch (err) {
    throw err;
  }
};

export const deleteDestinations: IDeleteDestinations = async (config, organizationID, destinationListID, destinations) => {
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

    const newDestinations: number[] = destinations.map((destinationID) => typeof destinationID === 'string' ? parseInt(destinationID, 10) : destinationID)

    const path =
      CISCO_API.MANAGEMENT + `/organizations/${organizationID}/destinationlists/${destinationListID}/destinations/remove`;
    const options: AxiosRequestConfig = {
      method: 'delete',
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
      data: newDestinations,
    };

    const response = await axios.request(options);
    const parsedResponse = parseResponse(response);

    if (parsedResponse && !parsedResponse.error) {
      const { status, data } : { status: IDestinationStatus, data: ICiscoList } = response.data
      return { status, data }
    } 

    throw new Error('Failed to delete destinations.')
  } catch (err) {
    throw err
  }
}

export default { getDestinations, addDestinations, deleteDestinations };
