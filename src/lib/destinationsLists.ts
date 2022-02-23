import axios, { AxiosRequestConfig } from 'axios';
import { parseResponse, responseTypes } from '@jweb-development/response-parser';
import { CISCO_API } from '../config';
import { getDestinationType } from '../utils';

import {
  IGetDestinationLists,
  IGetDestinationListDetails,
  ISubmitDestinationList,
  IPatchDestinationList,
  IDeleteDestinationList,
  ICiscoList,
  ICiscoListDestination,
  IDestinationListsStatus,
  IDestinationListsMeta,
} from '../typings';

const getDestinationLists: IGetDestinationLists = async (config, organizationID, page?, limit?) => {
  try {
    const { MANAGEMENT: { key: mgmtKey = '', secret: mgmtSecret = '' } = {} } = config;
    if (!mgmtKey || !mgmtSecret) {
      throw new Error('Config is missing management keys.');
    }

    if (!organizationID) {
      throw new Error('Organization ID not found.');
    }

    const path = CISCO_API.MANAGEMENT + `/organizations/${organizationID}/destinationlists`;
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
        page: page || 1,
        limit: limit || 100
      }
    };

    const response = await axios.request(options);
    const parsedResponse = parseResponse(response);

    if (parsedResponse && parsedResponse.type === responseTypes.SUCCESS) {
      const {
        status,
        meta,
        data = [],
      }: { status: IDestinationListsStatus; meta: IDestinationListsMeta; data: ICiscoList[] } = response.data;

      return { isVerified: true, status, meta, data };
    } else if (
      parsedResponse && (
        parsedResponse.type === responseTypes.UNAUTHORIZED || parsedResponse.type === responseTypes.FORBIDDEN ||
        parsedResponse.type === responseTypes.NOT_FOUND
      )
    ) {
      return { isVerified: false, type: parsedResponse.type }
    }

    throw new Error('Failed to acquire destination lists.');
  } catch (err) {
    throw err;
  }
};

const getDestinationListDetails: IGetDestinationListDetails = async (config, organizationID, destinationListID) => {
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

    const path = CISCO_API.MANAGEMENT + `/organizations/${organizationID}/destinationlists/${destinationListID}`;
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
      const { status, data }: { data: ICiscoList; status: IDestinationListsStatus } = response.data;
      return { status, data };
    }

    throw new Error('Failed to get destination list details.');
  } catch (err) {
    throw err;
  }
};

const addDestinationList: ISubmitDestinationList = async (config, organizationID, destinationListInfo) => {
  try {
    const { MANAGEMENT: { key: mgmtKey = '', secret: mgmtSecret = '' } = {} } = config;
    if (!mgmtKey || !mgmtSecret) {
      throw new Error('Config is missing management keys.');
    }

    if (!organizationID) {
      throw new Error('Organization ID not found.');
    }

    const { isDnsPolicy = false, access = 'block', name, isGlobal = false, destinations = [] } = destinationListInfo;

    const listDestinations = destinations.reduce((arr: ICiscoListDestination[], destinationInfo) => {
      if (destinationInfo && destinationInfo.destination) {
        const { comment = '' } = destinationInfo;
        const { destination, destinationType } = getDestinationType(destinationInfo.destination);

        arr.push({
          comment: comment.substring(0, 256),
          destination,
          type: destinationType,
        });
      }
      return arr;
    }, []);

    const payload = {
      bundleTypeId: isDnsPolicy ? 1 : 2,
      access,
      name,
      isGlobal,
      destinations: listDestinations,
    };

    const path = CISCO_API.MANAGEMENT + `/organizations/${organizationID}/destinationlists`;
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
      data: payload,
    };

    const response = await axios.request(options);
    const parsedResponse = parseResponse(response);

    if (parsedResponse && !parsedResponse.error) {
      const newDestinationList: ICiscoList = response.data;
      return newDestinationList;
    }

    throw new Error('Failed to submit destination list.');
  } catch (err) {
    throw err;
  }
};

const patchDestinationList: IPatchDestinationList = async (
  config,
  organizationID,
  destinationListID,
  destinationListInfo,
) => {
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

    const { name = '' } = destinationListInfo;
    if (!name) {
      throw new Error('Destination list must have a name.');
    }

    const path = CISCO_API.MANAGEMENT + `/organizations/${organizationID}/destinationlists/${destinationListID}`;
    const options: AxiosRequestConfig = {
      method: 'patch',
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
      data: { name },
    };

    const response = await axios.request(options);
    const parsedResponse = parseResponse(response);

    if (parsedResponse && !parsedResponse.error) {
      const newDestinationList: ICiscoList = response.data;
      return newDestinationList;
    }

    throw new Error('Failed to update destination list.');
  } catch (err) {
    throw err;
  }
};

const deleteDestinationList: IDeleteDestinationList = async (config, organizationID, destinationListID) => {
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

    const path = CISCO_API.MANAGEMENT + `/organizations/${organizationID}/destinationlists/${destinationListID}`;
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
    };

    const response = await axios.request(options);
    const parsedResponse = parseResponse(response);

    if (parsedResponse && !parsedResponse.error) {
      return Array.isArray(response.data);
    }

    throw new Error('Failed to delete destination list.');
  } catch (err) {
    throw err;
  }
};

export default {
  getDestinationLists,
  getDestinationListDetails,
  addDestinationList,
  patchDestinationList,
  deleteDestinationList,
};
