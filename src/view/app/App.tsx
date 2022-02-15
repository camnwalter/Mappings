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
  sortClosest,
} from "./utils";

const App: React.FunctionComponent = () => {
  const [classes, setClasses] = useState<string[]>([]);
  const [methods, setMethods] = useState<Method[]>([]);
  const [fields, setFields] = useState<Field[]>([]);

  const [currentTab, setCurrentTab] = useState(SearchType.CLASS);

  const [search, setSearch] = useState("");
  const onSetSearch = useCallback((e) => setSearch(e.target.value), []);

  const getArray = useCallback(
    (tab: SearchType) => {
      switch (tab) {
        case SearchType.CLASS:
          return classes;
        case SearchType.METHOD:
          return methods;
        case SearchType.FIELD:
          return fields;
      }
    },
    [classes, methods, fields]
  );

  useEffect(() => {
    filterClasses(search).then((classes) => {
      setClasses(classes.sort(sortClosest(search)));
    });
    filterMethods(search).then((methods) => {
      setMethods(methods.sort(sortClosest(search)));
    });
    filterFields(search).then((fields) => {
      setFields(fields.sort(sortClosest(search)));
    });
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
              {`${tab} ${getArray(tab).length}`}
            </span>
          ))}
        </div>
      </div>
      <Table tab={currentTab} results={[classes, methods, fields]} />
    </>
  );
};

export default App;
