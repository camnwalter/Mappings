import fs from "fs";
import path from "path";
import type { Clazz } from "../view/app/utils";

const classes: Clazz[] = [];

const parseClass = (line: string) => {
  const clazz = line.split(" ")[1];
  classes.push({ clazz, fields: [], methods: [] });
};

const parseMethod = (line: string) => {
  const [obf, desc, deObf] = line.split(" ").slice(1);
  let splitter = obf.lastIndexOf("/");
  const clazz = obf.slice(0, splitter);
  const srg = obf.slice(splitter + 1);

  splitter = deObf.lastIndexOf("/");
  const mcp = deObf.slice(splitter + 1);

  classes
    ?.find(({ clazz: c }) => c === clazz)
    ?.methods.push({
      srg,
      mcp,
      desc,
    });
};

const parseField = (line: string) => {
  const [obf, deObf] = line.split(" ").slice(1);
  let splitter = obf.lastIndexOf("/");
  const clazz = obf.slice(0, splitter);
  const srg = obf.slice(splitter + 1);

  splitter = deObf.lastIndexOf("/");
  const mcp = deObf.slice(splitter + 1, -1);

  classes
    ?.find(({ clazz: c }) => c === clazz)
    ?.fields.push({
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
  JSON.stringify(classes.sort((a, b) => a.clazz.localeCompare(b.clazz)))
);
