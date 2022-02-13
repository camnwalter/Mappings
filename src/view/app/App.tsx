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

const MemoizedTable = React.memo(Table);
let appRenders = 0;
const App: React.FunctionComponent = () => {
  console.log(`App rendered ${appRenders++}`);
  const [classes, setClasses] = useState<string[]>([]);
  const [methods, setMethods] = useState<Method[]>([]);
  const [fields, setFields] = useState<Field[]>([]);

  const [currentTab, setCurrentTab] = useState(SearchType.CLASS);

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
    <div>
      <div className="top-bar">
        <div>Search</div>
        <input type="text" value={search} onChange={onSetSearch} />
        <div className="dropdown">
          <button className="dropbtn">Filter</button>
          <div className="dropdown-content">
            <div onClick={() => setCurrentTab(SearchType.CLASS)}>Classes</div>
            <div onClick={() => setCurrentTab(SearchType.METHOD)}>Methods</div>
            <div onClick={() => setCurrentTab(SearchType.FIELD)}>Fields</div>
          </div>
        </div>
      </div>
      <MemoizedTable tab={currentTab} results={[classes, methods, fields]} />
    </div>
  );
};

export default App;
