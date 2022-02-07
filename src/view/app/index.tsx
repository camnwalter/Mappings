import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Search from "./Search";

declare global {
  interface Window {
    acquireVsCodeApi(): any;
  }
}

// const vscode = window.acquireVsCodeApi();

ReactDOM.render(
  <div className="App">
    <Search />
  </div>,
  document.getElementById("root")
);
