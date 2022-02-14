import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";
import Table from "./Table";
import {
  Field,
  filterClasses,
  filterFields,
  filterMethods,
  Method,
  SearchType,
} from "./utils";

const App: React.FunctionComponent = () => {
  const [classes, setClasses] = useState<string[]>([]);
  const [methods, setMethods] = useState<Method[]>([]);
  const [fields, setFields] = useState<Field[]>([]);

  const [currentTab, setCurrentTab] = useState(SearchType.CLASS);

  const [search, setSearch] = useState("");
  const onSetSearch = useCallback((e) => setSearch(e.target.value), []);

  useEffect(() => {
    filterClasses(search).then(setClasses);
    filterMethods(search).then(setMethods);
    filterFields(search).then(setFields);
  }, [search]);

  return (
    <>
      <div className="top-bar">
        <div>Search</div>
        <input type="text" value={search} onChange={onSetSearch} />
        <div className="tabs">
          {Object.values(SearchType).map((tab, i) => (
            <span
              key={i}
              style={{ background: tab === currentTab ? "#666" : "#333" }}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>
      <Table tab={currentTab} results={[classes, methods, fields]} />
    </>
  );
};

export default App;
