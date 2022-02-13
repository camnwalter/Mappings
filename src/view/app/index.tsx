import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

declare global {
  interface Window {
    acquireVsCodeApi(): any;
  }
}

// const vscode = window.acquireVsCodeApi();

ReactDOM.render(<App />, document.getElementById("root"));
