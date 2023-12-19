import fs from "fs";
import { globSync } from "glob";

const emojiMap = {
  directory: "📁",
  file: "📄",
};

const charMap = {
  border: "│",
  contain: "├",
  line: "─",
  last: "└─",
};

const generateTreeData = Symbol("generateTreeData");
const sort = Symbol("sort");
const draw = Symbol("draw");

class Treee {
  constructor(options) {
    const { directory, ignore, noIcons } = options;
    this.directory = directory;
    this.ignore = ignore;
    this.noIcons = noIcons;
    this.treeString = "";
  }

  // 创建树形结构数据
  [generateTreeData](directory) {
    const stat = fs.statSync(directory);
    const filename = directory.replace(/.*\/(?!$)/g, "");
    if (stat.isFile()) {
      return filename;
    }
    const result = {};
    let directories = globSync(`${directory}/*`, {
      dot: true,
      ignore: this.ignore,
    });
    directories = directories.map((dir) => {
      return this[generateTreeData](dir);
    });
    result[filename] = this[sort](directories);
    return result;
  }

  // 排序
  [sort](treeData) {
    treeData.sort((a, b) => {
      if (typeof a === "object") {
        return -1;
      } else if (typeof b === "object") {
        return 1;
      } else {
        return a > b ? 1 : -1;
      }
    });
    return treeData;
  }

  // 绘制树形结构
  [draw](treeData, connectSymbol = "") {
    const { border, contain, line, last } = charMap;
    for (const key in treeData) {
      const value = treeData[key];
      if (typeof value === "string") {
        // 文件
        this.treeString += `\n${connectSymbol}${emojiMap.file}${value}`;
      } else if (Array.isArray(value)) {
        // 目录
        this.treeString += `\n${connectSymbol}${emojiMap.directory}${key}`;
        connectSymbol = connectSymbol.replaceAll(contain, border);
        connectSymbol = connectSymbol.replaceAll(
          new RegExp(`${last}|${line}`, "g"),
          ""
        );
        connectSymbol = `${connectSymbol}${Array(
          Math.ceil(key.length / 2)
        ).join(" ")}${contain}${line}`;
        connectSymbol = connectSymbol.replace(/^ +/g, "");

        value.forEach((v, i) => {
          if (i === value.length - 1) {
            connectSymbol = connectSymbol.replace(`${contain}${line}`, last);
          }

          if (typeof v === "string") {
            this.treeString += `\n${connectSymbol}${emojiMap.file}${v}`;
          } else {
            this[draw](v, connectSymbol);
          }
        });
      }
    }
  }

  create() {
    const treeData = this[generateTreeData](this.directory);
    this[draw](treeData);
    this.treeString = this.treeString.replace(/^\n/, "");
    console.log(this.treeString);
    // return result;
  }
}

export default Treee;
