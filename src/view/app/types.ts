export type Method = {
  srg: string;
  mcp: string;
  desc: string;
};

export type Field = {
  srg: string;
  mcp: string;
};

export type JsonResult = {
  [key: string]: {
    methods: Method[];
    fields: Field[];
  };
};
