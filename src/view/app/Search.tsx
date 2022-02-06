import * as React from "react";
import json from "../assets/srg-mcp.json";
import type { JsonResult } from "./types";

type State = {
  value: string;
  results: JsonResult;
};

export default class Search extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      value: "",
      results: json,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event: React.ChangeEvent<any>) {
    this.setState({
      value: event.target.value,
      results: Object.keys(json)
        .filter((key: string) => {
          return key.toLowerCase().includes(event.target.value.toLowerCase());
        })
        .reduce((obj, key: string) => {
          obj[key] = json[key];
          return obj;
        }, {}) as unknown as JsonResult,
    });
  }

  render() {
    return (
      <div>
        <input
          value={this.state.value}
          onChange={this.onChange}
          placeholder="Type in here"
        />
        {Object.keys(this.state.results)[0]}
        <table>
          <tr>
            <th>Classes</th>
            <th>Methods</th>
            <th>Fields</th>
          </tr>
          {Object.entries(this.state.results)
            // .slice(0, 10)
            .map(([key, { methods, fields }]) => {
              return (
                <tr>
                  <td>{key}</td>
                  <td>
                    {methods.map(({ mcp, srg, desc }) => {
                      return (
                        <tr>
                          <td>{mcp}</td>
                          <td>{desc}</td>
                          <td className="srg">{srg}</td>
                        </tr>
                      );
                    })}
                  </td>
                  <td>
                    {fields.map(({ mcp, srg }) => {
                      return (
                        <tr>
                          <td>{mcp}</td>
                          <td className="srg">{srg}</td>
                        </tr>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    );
  }
}
