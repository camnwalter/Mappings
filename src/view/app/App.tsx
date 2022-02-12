import { distance } from "fastest-levenshtein";
import React, { useRef, useState } from "react";
import json from "../assets/srg-mcp.json";
import ShiftDiv from "./ShiftDiv";
import type { Clazz, Field, Method } from "./types";
import { includesIgnoreCase } from "./utils";

export default function Search() {
  const [currentSearch, setCurrentSearch] = useState("");
  const [classes, setClasses] = useState<string[]>([]);
  const [methods, setMethods] = useState<Method[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const shouldReset = useRef<HTMLInputElement>(null);

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

    setShouldUpdate(true);
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

    setShouldUpdate(true);
  };

  return (
    <>
      <input
        placeholder="Search..."
        onChange={(e) => {
          setShouldUpdate(false);
          setCurrentSearch(e.target.value);
        }}
        width="200px"
        ref={shouldReset}
        onKeyPress={(e) => {
          setShouldUpdate(false);
          if (e.key === "Enter" && e.currentTarget.value !== "") {
            resetStates();
            search();
          }
        }}
      ></input>
      <button
        onClick={(e) => {
          if (e.currentTarget.value !== "") {
            search();
          }
        }}
      >
        Click to submit
      </button>
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
          {classes
            .sort((a, b) =>
              shouldUpdate
                ? distance(a, currentSearch) - distance(b, currentSearch)
                : 0
            )
            .map((c, index) => (
              <div key={index} onClick={() => filterToClass(c)}>
                {c}
              </div>
            ))}
        </div>
        <div className="column">
          <h2>Methods:</h2>
          {methods
            .sort((a, b) =>
              shouldUpdate
                ? distance(a.mcp, currentSearch) -
                  distance(b.mcp, currentSearch)
                : 0
            )
            .map(({ owner, mcp, srg, desc }, index) => (
              <ShiftDiv
                key={index}
                onClick={() => filterToClass(owner)}
                mcp={mcp}
                srg={srg}
                desc={desc}
              />
            ))}
        </div>
        <div className="column">
          <h2>Fields:</h2>
          {fields
            .sort((a, b) =>
              shouldUpdate
                ? distance(a.mcp, currentSearch) -
                  distance(b.mcp, currentSearch)
                : 0
            )
            .map(({ owner, mcp, srg }, index) => (
              <ShiftDiv
                key={index}
                onClick={() => filterToClass(owner)}
                mcp={mcp}
                srg={srg}
              />
            ))}
        </div>
      </div>
    </>
  );
}
