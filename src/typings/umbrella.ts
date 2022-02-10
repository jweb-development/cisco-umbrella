interface IUmbrellaConfig {
  MANAGEMENT?: { key?: string; secret?: string };
  NETWORKING?: { key?: string; secret?: string };
  ENFORCEMENT?: { key?: string };
}

export { IUmbrellaConfig };
