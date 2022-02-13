import { distance } from "fastest-levenshtein";
import data from "../assets/srg-mcp.json";

export interface Field {
  srg: string;
  mcp: string;
}

export interface Method {
  srg: string;
  mcp: string;
  desc: string;
}

export interface Clazz {
  clazz: string;
  fields: Field[];
  methods: Method[];
}

export const filterClasses = async (search: string): Promise<string[]> => {
  return data
    .flatMap(({ clazz }) => clazz)
    .filter((clazz) => clazz.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => distance(a, search) - distance(b, search));
};

export const filterMethods = async (search: string): Promise<Method[]> => {
  return data
    .flatMap(({ methods }) => methods)
    .filter(({ mcp }) => mcp.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => distance(a.mcp, search) - distance(b.mcp, search));
};

export const filterFields = async (search: string): Promise<Field[]> => {
  return data
    .flatMap(({ fields }) => fields)
    .filter(({ mcp }) => mcp.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => distance(a.mcp, search) - distance(b.mcp, search));
};

export const enum SearchType {
  CLASS = "class",
  FIELD = "field",
  METHOD = "method",
}
