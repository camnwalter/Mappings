import fs from "fs";
import path from "path";
import type { Clazz } from "../view/app/utils";

const classes: { [key: string]: Clazz } = {};

const parseClass = (line: string) => {
  const clazz = line.split(" ")[1];
  classes[clazz] = { fields: [], methods: [] };
};

const parseMethod = (line: string) => {
  const [obf, desc, deObf] = line.split(" ").slice(1);
  let parts = obf.split("/");
  const srg = parts.pop() as string;
  const clazz = parts.pop() as string;
  const fullClass = `${parts.join("/")}/${clazz}`;

  parts = deObf.split("/");
  const mcp = parts[parts.length - 1].slice(0, -1);

  classes[fullClass].methods.push({
    owner: clazz,
    srg,
    mcp,
    desc,
  });
};

const parseField = (line: string) => {
  const [obf, deObf] = line.split(" ").slice(1);
  let parts = obf.split("/");
  const srg = parts.pop() as string;
  const clazz = parts.pop() as string;
  const fullClass = `${parts.join("/")}/${clazz}`;

  parts = deObf.split("/");
  const mcp = parts[parts.length - 1].slice(0, -1);

  classes[fullClass].fields.push({
    owner: clazz,
    srg,
    mcp,
  });
};

const file = fs.readFileSync(
  path.resolve(__dirname, "../view/assets/srg-mcp.srg"),
  "utf-8"
);

const lines = file.split("\n");

lines.forEach((line) => {
  if (line.startsWith("CL:")) {
    parseClass(line);
  } else if (line.startsWith("MD:")) {
    parseMethod(line);
  } else if (line.startsWith("FD:")) {
    parseField(line);
  }
});

fs.writeFileSync(
  path.resolve(__dirname, "../view/assets/srg-mcp.json"),
  JSON.stringify(classes)
);
