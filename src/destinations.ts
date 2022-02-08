import axios, { AxiosRequestConfig } from 'axios'
import { parseResponse } from '@jweb-development/response-parser'
import { CISCO_API } from './config'

interface IDestinationList {
  bundleTypeId: number;
  createdAt: number;
  id: number;
  modifiedAt: number;
  organizationId: number;
  thirdpartyCategoryId: number;
  access: string;
  name: string;
  isGlobal: boolean;
  isMspDefault: boolean;
  markedForDeletion: boolean;
  meta: IDestinationListMeta
}

interface IDestinationListMeta {
  destinationCount: number;
  domainCount: number;
  ipv4Count: number;
  urlCount: number;
}

const getDestinationLists = async (organizationID: string): Promise<any> => {
  try {
    const path = CISCO_API.MANAGEMENT + `/organizations/${organizationID}/destinationLists`
    const options: AxiosRequestConfig = {
      method: 'get',
      url: path,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    const response = await axios.request(options)
    const parsedResponse = parseResponse(response)

    if (parsedResponse && !parsedResponse.error) {
      const { meta: {} } = response.data
    }
  } catch (err) {
    throw err
  }
}