import React from "react";
import { Field, Method, SearchType } from "./utils";

const FMHeader: React.FunctionComponent = () => (
  <thead>
    <tr>
      <th>MCP Name</th>
      <th>SRG Name</th>
      <th>Owner</th>
    </tr>
  </thead>
);

const FMBody: React.FunctionComponent<{
  array: Method[] | Field[];
}> = ({ array }) => (
  <tbody>
    {array.slice(0, 100).map(({ owner, mcp, srg }, i) => (
      <tr key={i}>
        <td>
          <div>{mcp}</div>
        </td>
        <td>
          <div>{srg}</div>
        </td>
        <td>
          <div>{owner}</div>
        </td>
      </tr>
    ))}
  </tbody>
);

const Table: React.FunctionComponent<{
  tab: SearchType;
  results: [string[], Method[], Field[]];
}> = React.memo(({ tab, results: [classes, methods, fields] }) => (
  <table>
    {tab === SearchType.CLASS ? (
      <>
        <thead>
          <tr key="classHead">
            <th>Class Name</th>
          </tr>
        </thead>
        <tbody>
          {classes.slice(0, 100).map((clazz, i) => (
            <tr key={i}>
              <td>
                <div>{clazz}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </>
    ) : (
      <>
        <FMHeader />
        <FMBody array={tab === SearchType.METHOD ? methods : fields} />
      </>
    )}
  </table>
));

export default Table;
