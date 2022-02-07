import React, { useState } from "react";
import json from "../assets/srg-mcp.json";

export default function Search() {
  const [currentSearch, setCurrentSearch] = useState("");
  const [classes, setClasses] = useState([]);

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
        }}
      >
        Click to submit
      </button>
      {classes.map((c, index) => (
        <div key={index}>{c}</div>
      ))}
    </>
  );
}
