import React from "react";
import { Field, Method, SearchType } from "./utils";

const Table: React.FunctionComponent<{
  tab: SearchType;
  results: [string[], Method[], Field[]];
}> = React.memo(({ tab, results: [classes, methods, fields] }) => {
  return (
    <>
      {tab === SearchType.CLASS ? (
        <div>
          <div>
            <table>
              <thead>
                <tr key="classHead">
                  <th>Class Name</th>
                </tr>
              </thead>
              <tbody>
                {classes.slice(0, 100).map((clazz, i) => (
                  <tr key={i}>
                    <td>{clazz}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : tab === SearchType.METHOD ? (
        <div>
          <div>
            <table>
              <thead>
                <tr key="methodHead">
                  <th>MCP Name</th>
                  <th>SRG Name</th>
                  <th>Desc</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {methods.slice(0, 100).map(({ owner, mcp, srg, desc }, i) => (
                  <tr key={i}>
                    <td>{mcp}</td>
                    <td>{srg}</td>
                    <td>{desc}</td>
                    <td>{owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <table>
              <thead>
                <tr key="fieldHead">
                  <th>MCP Name</th>
                  <th>SRG Name</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {fields.slice(0, 100).map(({ owner, mcp, srg }, i) => (
                  <tr key={i}>
                    <td>{mcp}</td>
                    <td>{srg}</td>
                    <td>{owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
});

export default Table;
