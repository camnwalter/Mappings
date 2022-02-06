import * as React from "react";
import * as ReactDOM from "react-dom";

import "./index.css";
import Search from "./Search";

declare global {
  interface Window {
    acquireVsCodeApi(): any;
  }
}

// const vscode = window.acquireVsCodeApi();

ReactDOM.render(
  // <Config vscode={vscode} initialData={window.initialData} />,
  // <EssayForm name="wowzers" />,
  <Search />,
  document.getElementById("root")
);
