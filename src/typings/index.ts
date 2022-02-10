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

import { IUmbrellaConfig } from './umbrella';

import { ICiscoOrganization } from './organizations';

/* <========= Start of: Enforcement =========> */
interface IGetEnforcementDomains {
  (config: IUmbrellaConfig): Promise<IEnforcementDomainPromise>;
}

interface ISubmitEnforcementDomains {
  (config: IUmbrellaConfig, domains: IEnforcementDomain[], providerName?: string, deviceVersion?: string): Promise<{
    id: number;
  }>;
}

interface IDeleteEnforcementDomains {
  (config: IUmbrellaConfig, domainID: number | string): Promise<boolean>;
}
/* <========= End of: Enforcement =========> */

/* <========= Start of: Destination Lists =========> */
interface IGetDestinationLists {
  (config: IUmbrellaConfig, organizationID: string | number): Promise<ICiscoListPromise>;
}

interface IPatchDestinationList {
  (
    config: IUmbrellaConfig,
    organizationID: string | number,
    destinationListID: string | number,
    destinationListInfo: { name: string },
  ): Promise<ICiscoList>;
}

interface ISubmitDestinationList {
  (
    config: IUmbrellaConfig,
    organizationID: string | number,
    destinationListInfo: ICiscoListCreate,
  ): Promise<ICiscoList>;
}
/* <========= End of: Destination Lists =========> */

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
  // Organizations
  ICiscoOrganization,
  /* Start of: functions */
  // Enforcement
  IGetEnforcementDomains,
  ISubmitEnforcementDomains,
  IDeleteEnforcementDomains,
  // Destination Lists
  IGetDestinationLists,
  IPatchDestinationList,
  ISubmitDestinationList,
  // Organizations
  IGetOrganizations,
  /* End of: functions */
};
