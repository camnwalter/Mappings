import { distance } from "fastest-levenshtein";
import data from "../assets/srg-mcp.json";

export interface Field {
  owner: string;
  srg: string;
  mcp: string;
}

export interface Method {
  owner: string;
  srg: string;
  mcp: string;
  desc: string;
}

export interface Clazz {
  fields: Field[];
  methods: Method[];
}

const filterBySearch =
  (search: string) => (object: Field | Method | string) => {
    if (typeof object === "string") {
      return object.toLowerCase().includes(search.toLowerCase());
    }
    return (
      object.srg.toLowerCase().includes(search.toLowerCase()) ||
      object.mcp.toLowerCase().includes(search.toLowerCase())
    );
  };

export const sortClosest =
  (search: string) =>
  (a: Field | Method | string, b: Field | Method | string) => {
    if (typeof a === "string" || typeof b === "string") {
      return distance(a as string, search) - distance(b as string, search);
    }
    return distance(a.mcp, search) - distance(b.mcp, search);
  };

export const filterClasses = async (search: string): Promise<string[]> => {
  return Object.keys(data).filter(filterBySearch(search));
};

export const filterMethods = async (search: string): Promise<Method[]> => {
  return Object.values(data)
    .flatMap(({ methods }) => methods)
    .filter(filterBySearch(search));
};

export const filterFields = async (search: string): Promise<Field[]> => {
  return Object.values(data)
    .flatMap(({ fields }) => fields)
    .filter(filterBySearch(search));
};

export enum SearchType {
  CLASS = "Classes",
  METHOD = "Methods",
  FIELD = "Fields",
}
