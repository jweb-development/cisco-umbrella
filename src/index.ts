import { Enforcement, DestinationLists, Organizations, Destinations } from './lib';
import { ICiscoListCreate, IDestinationListName, IEnforcementDomain, IUmbrellaConfig } from './typings';

class UmbrellaClient {
  config: IUmbrellaConfig;

  constructor(umbrellaConfig: IUmbrellaConfig) {
    this.config = {
      MANAGEMENT: { key: '', secret: '' },
      NETWORKING: { key: '', secret: '' },
      ENFORCEMENT: { key: '' },
    };

    if (umbrellaConfig) {
      this.initiateUmbrella(umbrellaConfig);
    }
  }

  initiateUmbrella = (config: IUmbrellaConfig) => {
    const {
      MANAGEMENT: { key: mgmtKey = '', secret: mgmtSecret = '' } = {},
      NETWORKING: { key: networkingKey = '', secret: networkingSecret = '' } = {},
      ENFORCEMENT: { key: enforcementKey = '' } = {},
    } = config;

    this.config = {
      MANAGEMENT: { key: mgmtKey, secret: mgmtSecret },
      NETWORKING: { key: networkingKey, secret: networkingSecret },
      ENFORCEMENT: { key: enforcementKey },
    };
  };

  /* <========= Start of: Enforcement =========> */
  getEnforcementDomains = () => Enforcement.getEnforcementDomains(this.config);

  submitEnforcementDomains = (domains: IEnforcementDomain[], providerName?: string, deviceVersion?: string) =>
    Enforcement.submitEnforcementDomains(this.config, domains, providerName, deviceVersion);

  deleteEnforcementDomain = (domainID: string | number) => Enforcement.deleteEnforcementDomain(this.config, domainID);
  /* <========= End of: Enforcement =========> */

  /* <========= Start of: Destination Lists =========> */
  getDestinationLists = (organizationID: string | number) =>
    DestinationLists.getDestinationLists(this.config, organizationID);

  getDestinationListDetails = (organizationID: string | number, destinationListID: string | number) =>
    DestinationLists.getDestinationListDetails(this.config, organizationID, destinationListID);

  submitDestinationList = (organizationID: string | number, destinationListInfo: ICiscoListCreate) =>
    DestinationLists.submitDestinationList(this.config, organizationID, destinationListInfo);

  patchDestinationList = (
    organizationID: string | number,
    destinationListID: string | number,
    destinationListInfo: IDestinationListName,
  ) => DestinationLists.patchDestinationList(this.config, organizationID, destinationListID, destinationListInfo);

  deleteDestinationList = (organizationID: string | number, destinationListID: string | number) =>
    DestinationLists.deleteDestinationList(this.config, organizationID, destinationListID);
  /* <========= End of: Destination Lists =========> */

  /* <========= Start of: Destinations =========> */
  getDestinations = (organizationID: string | number, destinationListID: string | number) =>
    Destinations.getDestinations(this.config, organizationID, destinationListID);
  /* <========= End of: Destinations =========> */

  getOrganizations = () => Organizations.getOrganizations(this.config);
}

export { UmbrellaClient };
