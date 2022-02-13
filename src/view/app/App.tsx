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
  const onSetTab = useCallback((tab: SearchType) => setCurrentTab(tab), []);

  const [search, setSearch] = useState("");
  const onSetSearch = useCallback((e) => setSearch(e.target.value), []);

  useEffect(() => {
    switch (currentTab) {
      case SearchType.CLASS:
        filterClasses(search).then((data) => {
          setClasses(data);
        });
        break;
      case SearchType.METHOD:
        filterMethods(search).then((data) => {
          setMethods(data);
        });
        break;
      case SearchType.FIELD:
        filterFields(search).then((data) => {
          setFields(data);
        });
        break;
    }
  }, [search, currentTab]);

  return (
    <>
      <div className="top-bar">
        <div>Search</div>
        <input type="text" value={search} onChange={onSetSearch} />
        <div className="tabs">
          <button autoFocus onClick={() => onSetTab(SearchType.CLASS)}>
            Classes
          </button>
          <button onClick={() => onSetTab(SearchType.METHOD)}>Methods</button>
          <button onClick={() => onSetTab(SearchType.FIELD)}>Fields</button>
        </div>
      </div>
      <Table tab={currentTab} results={[classes, methods, fields]} />
    </>
  );
};

export default App;
