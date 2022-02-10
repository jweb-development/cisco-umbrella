import axios, { AxiosRequestConfig } from 'axios';
import { parseResponse } from '@jweb-development/response-parser';
import { CISCO_API } from '../config';
import { IGetOrganizations, ICiscoOrganization } from '../typings';

const getOrganizations: IGetOrganizations = async (config) => {
  try {
    const { NETWORKING: { key: networkingKey, secret: networkingSecret = '' } = {} } = config;
    if (!networkingKey || !networkingSecret) {
      throw new Error('Config is missing networking keys.');
    }

    const path = CISCO_API.MANAGEMENT + '/organizations';
    const options: AxiosRequestConfig = {
      method: 'get',
      url: path,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      auth: {
        username: networkingKey,
        password: networkingSecret,
      },
    };

    const response = await axios.request(options);
    const parsedResponse = parseResponse(response);

    if (parsedResponse && !parsedResponse.error) {
      const organizations: ICiscoOrganization[] = response.data;
      return organizations;
    }

    throw new Error('Failed to acquire organizations.');
  } catch (err) {
    throw err;
  }
};

export default { getOrganizations };
