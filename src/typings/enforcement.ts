interface IEnforcementEvent {
  alertTime: string | Date;
  deviceId: string;
  deviceVersion: string;
  dstDomain: string;
  dstUrl: string;
  eventTime: string | Date;
  protocolVersion: string;
  providerName: string;
}

interface ICiscoEnforcementDomain {
  id: number;
  name: string;
  lastSeenAt: number;
}

interface IEnforcementDomain {
  websiteURL: string;
  eventTime: string | Date;
  deviceID: string;
  deviceVersion: string;
}

interface ICiscoEnforcementMeta {
  page: number;
  limit: number;
  prev: boolean;
  next: boolean;
}

interface IEnforcementDomainPromise {
  ciscoData: ICiscoEnforcementDomain[];
  meta: ICiscoEnforcementMeta;
}

export {
  IEnforcementEvent,
  ICiscoEnforcementDomain,
  IEnforcementDomain,
  ICiscoEnforcementMeta,
  IEnforcementDomainPromise,
};
