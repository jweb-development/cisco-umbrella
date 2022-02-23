import {
  IEnforcementEvent,
  ICiscoEnforcementDomain,
  IEnforcementDomain,
  ICiscoEnforcementMeta,
  IEnforcementDomainPromise,
} from './enforcement';

import {
  ICiscoListMeta,
  IDestinationListsStatus,
  IDestinationListsMeta,
  ICiscoListInfo,
  ICiscoListDestination,
  ICiscoList,
  ICiscoListCreate,
  ICiscoListPromise,
  IDestinationListName,
} from './destinationLists';

import { IDestination, IDestinationMeta, IDestinationStatus } from './destinations';

import { IUmbrellaConfig } from './umbrella';

import { ICiscoOrganization } from './organizations';

/* <========= Start of: Enforcement =========> */
interface IGetEnforcementDomains {
  (config: IUmbrellaConfig, page?: number, limit?: number): Promise<IEnforcementDomainPromise>;
}

interface ISubmitEnforcementDomains {
  (config: IUmbrellaConfig, domains: IEnforcementDomain[], providerName?: string, deviceVersion?: string): Promise<
    { id: number }[]
  >;
}

interface IDeleteEnforcementDomains {
  (config: IUmbrellaConfig, domainID: number | string): Promise<boolean>;
}
/* <========= End of: Enforcement =========> */

/* <========= Start of: Destination Lists =========> */
interface IGetDestinationLists {
  (
    config: IUmbrellaConfig,
    organizationID: string | number,
    page?: number,
    limit?: number
  ): Promise<ICiscoListPromise>;
}

interface ISubmitDestinationList {
  (
    config: IUmbrellaConfig,
    organizationID: string | number,
    destinationListInfo: ICiscoListCreate,
  ): Promise<ICiscoList>;
}

interface IPatchDestinationList {
  (
    config: IUmbrellaConfig,
    organizationID: string | number,
    destinationListID: string | number,
    destinationListInfo: { name: string },
  ): Promise<ICiscoList>;
}

interface IDeleteDestinationList {
  (config: IUmbrellaConfig, organizationID: string | number, destinationListID: string | number): Promise<boolean>;
}

interface IGetDestinationListDetails {
  (config: IUmbrellaConfig, organizationID: string | number, destinationListID: string | number): Promise<{
    data: ICiscoList;
    status: IDestinationListsStatus;
  }>;
}
/* <========= End of: Destination Lists =========> */

/* <========= Start of: Destinations =========> */
interface IGetDestinations {
  (
    config: IUmbrellaConfig,
    organizationID: string | number,
    destinationListID: string | number,
    page: number,
    limit: number,
  ): Promise<{
    status: IDestinationStatus;
    meta: IDestinationMeta;
    data: IDestination[];
  }>;
}

interface IAddDestinations {
  (
    config: IUmbrellaConfig,
    organizationID: string | number,
    destinationListID: string | number,
    destinations: ICiscoListDestination[],
  ): Promise<{
    status: IDestinationStatus;
    data: ICiscoList;
  }>;
}

interface IDeleteDestinations {
  (
    config: IUmbrellaConfig,
    organizationID: string | number,
    destinationListID: string | number,
    destinations: any[],
  ): Promise<{
    status: IDestinationStatus;
    data: ICiscoList;
  }>;
}
/* <========= End of: Destinations =========> */

/* <========= Start of: Organizations =========> */
interface IGetOrganizations {
  (config: IUmbrellaConfig): Promise<ICiscoOrganization[]>;
}
/* <========= End of: Organizations =========> */

export {
  // Enforcement
  IEnforcementEvent,
  ICiscoEnforcementDomain,
  IEnforcementDomain,
  ICiscoEnforcementMeta,
  IEnforcementDomainPromise,
  // Umbrella
  IUmbrellaConfig,
  // Destination Lists
  ICiscoListMeta,
  IDestinationListsStatus,
  IDestinationListsMeta,
  ICiscoListInfo,
  ICiscoListDestination,
  ICiscoList,
  ICiscoListCreate,
  ICiscoListPromise,
  IDestinationListName,
  // Destinations
  IDestination,
  IDestinationMeta,
  IDestinationStatus,
  // Organizations
  ICiscoOrganization,
  /* Start of: functions */
  // Enforcement
  IGetEnforcementDomains,
  ISubmitEnforcementDomains,
  IDeleteEnforcementDomains,
  // Destination Lists
  IGetDestinationLists,
  IGetDestinationListDetails,
  ISubmitDestinationList,
  IPatchDestinationList,
  IDeleteDestinationList,
  // Destinations
  IGetDestinations,
  IAddDestinations,
  IDeleteDestinations,
  // Organizations
  IGetOrganizations,
  /* End of: functions */
};
