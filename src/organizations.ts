import axios, { AxiosRequestConfig } from 'axios'
import { parseResponse } from '@jweb-development/response-parser'
import { CISCO_API } from './config'

const getOrganizations = async (mgmtKey: string, mgmtSecret: string) => {
  try {
    const path = CISCO_API.MANAGEMENT + '/organizations'
    const options: AxiosRequestConfig = {
      method: 'get',
      url: path,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      auth: {
        username: mgmtKey,
        password: mgmtSecret
      }
    }

    const response = await axios.request(options)
    const parsedResponse = parseResponse(response)

    if (parsedResponse && !parsedResponse.error) {
      console.log(response.data)
    }

    throw new Error('Failed to acquire organizations.')
  } catch (err) {
    throw err
  }
}

export { getOrganizations }
