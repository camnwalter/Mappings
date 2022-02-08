import React, { useRef, useState } from "react";
import json from "../assets/srg-mcp.json";

interface Method {
  owner: string;
  mcp: string;
  srg: string;
  desc: string;
}

interface Field {
  owner: string;
  mcp: string;
  srg: string;
}

interface Clazz {
  methods: Method[];
  fields: Field[];
}

interface HtmlInputFix extends HTMLInputElement {
  value: string;
}

const includesIgnoreCase = (
  searchValue: string,
  ...stringsToSearch: string[]
) => {
  return stringsToSearch.some((string) => {
    return string.toLowerCase().includes(searchValue.toLowerCase());
  });
};

export default function Search() {
  const [currentSearch, setCurrentSearch] = useState("");
  const [classes, setClasses] = useState<string[]>([]);
  const [methods, setMethods] = useState<Method[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const shouldReset = useRef<any>(null);

  const resetStates = () => {
    setClasses([]);
    setMethods([]);
    setFields([]);
  };

  const resetSearch = () => {
    setCurrentSearch("");
    shouldReset.current!.value = "";
  };

  const search = () => {
    setClasses(
      Object.keys(json).filter((c) => includesIgnoreCase(currentSearch, c))
    );

    setMethods(
      Object.values(json)
        .map(({ methods: m }: Clazz) => m)
        .flat()
        .filter(({ mcp, srg }) => includesIgnoreCase(currentSearch, mcp, srg))
    );

    setFields(
      Object.values(json)
        .map(({ fields: f }: Clazz) => f)
        .flat()
        .filter(({ mcp, srg }) => includesIgnoreCase(currentSearch, mcp, srg))
    );
  };

  const filterToClass = (clazz: string) => {
    resetStates();

    setClasses(Object.keys(json).filter((c) => c === clazz));

    setMethods(
      Object.entries(json)
        .filter(([key]: [string, Clazz]) => key === clazz)
        .map(([, { methods: m }]) => m)
        .flat()
    );

    setFields(
      Object.entries(json)
        .filter(([key]: [string, Clazz]) => key === clazz)
        .map(([, { fields: f }]) => f)
        .flat()
    );
  };

  return (
    <>
      <input
        placeholder="Search..."
        onChange={(e) => setCurrentSearch((e.target as HtmlInputFix).value)}
        width="200px"
        ref={shouldReset}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            resetStates();
            search();
          }
        }}
      ></input>
      <button onClick={search}>Click to submit</button>
      <button
        onClick={() => {
          resetStates();
          resetSearch();
        }}
      >
        Reset
      </button>
      <div className="row">
        <div className="column">
          <h2>Classes:</h2>
          {classes.map((c, index) => (
            <div key={index} onClick={() => filterToClass(c)}>
              {c}
            </div>
          ))}
        </div>
        <div className="column">
          <h2>Methods:</h2>
          {methods.map(({ owner, mcp }, index) => (
            <div key={index} onClick={() => filterToClass(owner)}>
              {mcp}
            </div>
          ))}
        </div>
        <div className="column">
          <h2>Fields:</h2>
          {fields.map(({ owner, mcp }, index) => (
            <div key={index} onClick={() => filterToClass(owner)}>
              {mcp}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
