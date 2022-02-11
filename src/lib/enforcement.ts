import axios, { AxiosRequestConfig } from 'axios';
import { parseResponse } from '@jweb-development/response-parser';
import { CISCO_API } from '../config';
import {
  IGetEnforcementDomains,
  ICiscoEnforcementDomain,
  IEnforcementEvent,
  IEnforcementDomain,
  ISubmitEnforcementDomains,
  IDeleteEnforcementDomains,
} from '../typings';

const getEnforcementDomains: IGetEnforcementDomains = async (config = {}) => {
  try {
    const { ENFORCEMENT: { key: enforcementKey = '' } = {} } = config;
    if (!enforcementKey) {
      throw new Error('Config is missing enforcement key.');
    }

    const options: AxiosRequestConfig = {
      method: 'get',
      url: CISCO_API.DOMAINS,
      responseType: 'json',
      params: {
        customerKey: enforcementKey,
      },
    };

    const response = await axios.request(options);
    const parsedResponse = parseResponse(response);

    if (parsedResponse && !parsedResponse.error) {
      const { data = [], meta = {} } = response.data;
      return { data, meta };
    }

    throw new Error('Failed to acquire domains.');
  } catch (err) {
    throw err;
  }
};

/**
 * Submits new domains to Cisco Enforcement
 * @param config - Cisco Umbrella Config
 * @param domains - Domains to be added to enforcement api
 * @param domains[].websiteURL - URL corresponding to the event that was detected
 * @param domains[].eventTime - Time that event was detected
 * @param domains[].deviceID - ID of the device where the event was detected
 * @param domains[].deviceVersion - Version of the device where the event was detected
 * @param providerName - [OPTIONAL] Name of Cisco Enforcement provider. Defaults to AMP.
 * @param deviceVersion - [OPTIONAL] Overwrites version for all domains.
 * @returns
 */
const submitEnforcementDomains: ISubmitEnforcementDomains = async (
  config,
  domains,
  providerName = '',
  deviceVersion = '',
) => {
  try {
    const { ENFORCEMENT: { key: enforcementKey = '' } = {} } = config;
    if (!enforcementKey) {
      throw new Error('Config is missing enforcement key.');
    }

    const newDomains = domains.reduce((arr: IEnforcementEvent[], domainInfo: IEnforcementDomain) => {
      if (domainInfo && domainInfo.websiteURL) {
        const { websiteURL, eventTime, deviceID, deviceVersion: domainDeviceVersion } = domainInfo;
        const { hostname = '' } = new URL(domainInfo.websiteURL);

        const dstDomain = hostname.replace('www.', '');
        const domainEventTime = typeof eventTime === 'object' ? eventTime.toISOString() : eventTime;

        if (dstDomain) {
          arr.push({
            alertTime: new Date().toISOString(),
            deviceId: deviceID,
            deviceVersion: deviceVersion || domainDeviceVersion,
            dstDomain,
            dstUrl: websiteURL,
            eventTime: domainEventTime,
            protocolVersion: '1.0a',
            providerName: providerName || 'AMP',
          });
        }
      }

      return arr;
    }, []);

    const options: AxiosRequestConfig = {
      method: 'post',
      url: CISCO_API.EVENTS,
      params: {
        customerKey: enforcementKey,
      },
      responseType: 'json',
      data: newDomains,
    };

    const response = await axios.request(options);
    const parsedResponse = parseResponse(response);

    if (parsedResponse && !parsedResponse.error) {
      return response.data;
    }

    throw new Error('Failed to insert new domains.');
  } catch (err) {
    throw err;
  }
};

const deleteEnforcementDomain: IDeleteEnforcementDomains = async (config, domainID) => {
  try {
    const { ENFORCEMENT: { key: enforcementKey = '' } = {} } = config;
    if (!enforcementKey) {
      throw new Error('Config is missing enforcement key.');
    }

    if (!domainID) {
      throw new Error('No domain ID found.');
    }

    const path = CISCO_API.DOMAINS + `/${domainID}`;
    const options: AxiosRequestConfig = {
      method: 'delete',
      url: path,
      params: {
        customerKey: enforcementKey,
      },
      responseType: 'json',
    };

    const response = await axios.request(options);
    const parsedResponse = parseResponse(response);

    if (parsedResponse && !parsedResponse.error) {
      return true;
    }

    throw new Error(`Failed to delete domain: ${domainID}.`);
  } catch (err) {
    throw err;
  }
};

export default {
  getEnforcementDomains,
  submitEnforcementDomains,
  deleteEnforcementDomain,
};
