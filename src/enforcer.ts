import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'
import { parseResponse } from 'jweb-response-parser'

const domainsUrl: string = 'https://s-platform.api.opendns.com/1.0/domains'
const eventsUrl: string = 'https://s-platform.api.opendns.com/1.0/events'

interface ICiscoEvent {
  alertTime: string | Date;
  deviceId: string;
  deviceVersion: string;
  dstDomain: string;
  dstUrl: string;
  eventTime: string | Date;
  protocolVersion: string;
  providerName: string;
}

interface ICiscoDomain {
  id: Number;
  name: String;
  lastSeenAt: Number;
}

interface IDomain {
  websiteURL: string;
  eventTime: string | Date;
  deviceID: string;
  deviceVersion: string;
}

interface ICiscoMeta {
  page: Number;
  limit: Number;
  prev: Boolean;
  next: Boolean;
}

interface IDomainPromise {
  ciscoData: Array<ICiscoDomain>
  meta: ICiscoMeta
}

const getDomains = async (enforcementKey: string): Promise<IDomainPromise> => {
  try {
    const options: AxiosRequestConfig = {
      method: 'get',
      url: domainsUrl,
      responseType: 'json',
      params: {
        customerKey: enforcementKey
      }
    }

    const response = await axios.request(options)
    const parsedResponse = parseResponse(response)

    if (parsedResponse && !parsedResponse.error) {
      const { data: ciscoData = [], meta = {} } = response.data
      return { ciscoData, meta }
    }

    throw new Error('Failed to acquire domains.')
  } catch (err) {
    throw err
  }
}

const submitDomains = async (enforcementKey: string, domains: Array<IDomain>, providerName?: string, deviceVersion?: string) => {
  try {
    const { ciscoData } = await getDomains(enforcementKey)

    const newDomains = domains.reduce((arr: Array<ICiscoEvent>, domainInfo: IDomain) => {
      if (domainInfo && domainInfo.websiteURL) {
        const { websiteURL, eventTime, deviceID, deviceVersion: domainDeviceVersion } = domainInfo
        const { hostname = '' } = (new URL(domainInfo.websiteURL))

        const dstDomain = hostname.replace('www.', '')
        const domainEventTime = typeof eventTime === 'object' ? eventTime.toISOString() : eventTime
        const domainExists = ciscoData.findIndex((ciscoDomain: ICiscoDomain) => ciscoDomain.name === dstDomain) !== -1

        if (dstDomain && !domainExists) {
          arr.push({
            alertTime: (new Date()).toISOString(),
            deviceId: deviceID,
            deviceVersion: deviceVersion || domainDeviceVersion,
            dstDomain: dstDomain,
            dstUrl: websiteURL,
            eventTime: domainEventTime,
            protocolVersion: '1.0a',
            providerName: providerName || 'AMP'
          })
        }

      }

      return arr
    }, [])

    const options: AxiosRequestConfig = {
      method: 'post',
      url: eventsUrl,
      params: {
        customerKey: enforcementKey
      },
      responseType: 'json',
      data: newDomains
    }

    const response = await axios.request(options)
    const parsedResponse = parseResponse(response)

    if (parsedResponse && !parsedResponse.error) {
      return response.data
    }

    throw new Error('Failed to insert new domains.')
  } catch (err) {
    throw err
  }
}

const deleteDomain = async (enforcementKey: string, domainID: number | string) => {
  try {
    const path = domainsUrl + `/${domainID}`
    const options: AxiosRequestConfig = {
      method: 'delete',
      url: path,
      params: {
        customerKey: enforcementKey
      },
      responseType: 'json',
    }

    const response = await axios.request(options)
    const parsedResponse = parseResponse(response)

    if (parsedResponse && !parsedResponse.error) {
      return true
    }

    throw new Error(`Failed to delete domain: ${domainID}.`)
  } catch (err) {
    throw err
  }
}

export {
  getDomains,
  submitDomains,
  deleteDomain
}
