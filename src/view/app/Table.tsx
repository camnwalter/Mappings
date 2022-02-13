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
                <tr>
                  <th>Class Name</th>
                </tr>
              </thead>
              <tbody>
                {classes.slice(0, 100).map((clazz) => (
                  <tr>
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
                <tr>
                  <th>MCP Name</th>
                  <th>SRG Name</th>
                  <th>Desc</th>
                </tr>
              </thead>
              <tbody>
                {methods.slice(0, 100).map(({ mcp, srg, desc }) => (
                  <tr>
                    <td>{mcp}</td>
                    <td>{srg}</td>
                    <td>{desc}</td>
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
                <tr>
                  <th>MCP Name</th>
                  <th>SRG Name</th>
                </tr>
              </thead>
              <tbody>
                {fields.slice(0, 100).map(({ mcp, srg }) => (
                  <tr>
                    <td>{mcp}</td>
                    <td>{srg}</td>
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
