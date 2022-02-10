interface ICiscoListMeta {
  destinationCount: number;
  domainCount?: number;
  ipv4Count?: number;
  urlCount?: number;
}

interface IDestinationListsStatus {
  code: number;
  text: string;
}

interface IDestinationListsMeta {
  page: number;
  limit: number;
  total: number;
}

interface ICiscoListInfo {
  bundleTypeId?: number;
  access: string;
  name: string;
  isGlobal: boolean;
}

interface ICiscoListDestination {
  comment: string;
  destination: string;
  type?: string;
}

interface ICiscoList extends ICiscoListInfo {
  createdAt: number | string;
  id: number;
  modifiedAt: number | string;
  organizationId: number | string;
  thirdpartyCategoryId: number;
  isMspDefault: boolean;
  markedForDeletion: boolean;
  meta?: ICiscoListMeta;
}

interface ICiscoListCreate extends ICiscoListInfo {
  isDnsPolicy: boolean;
  destinations: ICiscoListDestination[];
}

interface ICiscoListPromise {
  status: IDestinationListsStatus;
  meta: IDestinationListsMeta;
  data: ICiscoList[];
}

interface IDestinationListName {
  name: string;
}

export {
  ICiscoListMeta,
  IDestinationListsStatus,
  IDestinationListsMeta,
  ICiscoListInfo,
  ICiscoListDestination,
  ICiscoList,
  ICiscoListCreate,
  ICiscoListPromise,
  IDestinationListName,
};
