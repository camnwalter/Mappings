import React, { useState } from "react";
import { Field, Method, SearchType } from "./utils";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

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
}> = ({ array }) => {
  const [clickedElem, setClickedElem] = useState<Method | Field | null>(null);

  return (
    <>
      <ReactModal
        key="modal"
        isOpen={clickedElem !== null}
        style={{
          overlay: {
            background: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            background: "#1e1e1e",
            outline: "none",
            color: "black",
            margin: "100px",
          },
        }}
      >
        <span className="close" onClick={() => setClickedElem(null)}>
          x
        </span>
      </ReactModal>
      <tbody className="table-body">
        {array.slice(0, 100).map((fieldOrMethod, i) => (
          <tr key={i} onClick={() => setClickedElem(fieldOrMethod)}>
            <td>
              <div>{fieldOrMethod.mcp}</div>
            </td>
            <td>
              <div>{fieldOrMethod.srg}</div>
            </td>
            <td>
              <div>{fieldOrMethod.owner}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

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
