export interface Method {
  owner: string;
  mcp: string;
  srg: string;
  desc: string;
}

export interface Field {
  owner: string;
  mcp: string;
  srg: string;
}

export interface Clazz {
  methods: Method[];
  fields: Field[];
}
