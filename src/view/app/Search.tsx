import React, { useState } from "react";
import json from "../assets/srg-mcp.json";

interface Method {
  mcp: string;
  srg: string;
  desc: string;
}

interface Field {
  mcp: string;
  srg: string;
}

interface Clazz {
  methods: Method[];
  fields: Field[];
}

export default function Search() {
  const [currentSearch, setCurrentSearch] = useState("");
  const [classes, setClasses] = useState<string[]>([]);
  const [methods, setMethods] = useState<Method[]>([]);
  const [fields, setFields] = useState<Field[]>([]);

  return (
    <>
      <input
        placeholder="Search Classes, Fields, or Methods"
        onChange={(e) => setCurrentSearch(e.target.value)}
      ></input>
      <button
        onClick={() => {
          setClasses(
            Object.keys(json).filter((c) =>
              c.toLowerCase().includes(currentSearch.toLowerCase())
            )
          );

          setMethods(
            Object.values(json)
              .map(({ methods: m }: Clazz) => m)
              .flat()
              .filter(({ mcp, srg }) => {
                return (
                  mcp.toLowerCase().includes(currentSearch.toLowerCase()) ||
                  srg.toLowerCase().includes(currentSearch.toLowerCase())
                );
              })
          );

          setFields(
            Object.values(json)
              .map(({ fields: f }: Clazz) => f)
              .flat()
              .filter(({ mcp, srg }) => {
                return (
                  mcp.toLowerCase().includes(currentSearch.toLowerCase()) ||
                  srg.toLowerCase().includes(currentSearch.toLowerCase())
                );
              })
          );
        }}
      >
        Click to submit
      </button>
      <div className="title">Classes:</div>
      {classes.map((c, index) => (
        <div key={index}>{c}</div>
      ))}
      <div className="title">Methods:</div>
      {methods.map(({ mcp, srg, desc }, index) => (
        <div key={index}>
          {mcp} {srg} {desc}
        </div>
      ))}
      <div className="title">Fields:</div>
      {fields.map(({ mcp, srg }, index) => (
        <div key={index}>
          {mcp} {srg}
        </div>
      ))}
    </>
  );
}
