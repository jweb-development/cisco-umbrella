interface IDestinationStatus {
  code: number;
  text: string;
}

interface IDestinationMeta {
  page: number;
  limit: number;
  total: number;
}

interface IDestination {
  id: number | string;
  destination: string;
  type: string;
  comment: string;
  createdAt: string | number;
}

export {
  IDestinationStatus,
  IDestinationMeta,
  IDestination
}
