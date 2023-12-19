#!/usr/bin/env node

import { program } from "commander";
import pkg from "./package.json";
import Treee from "./Treee.js";

const cwd = process.cwd();
program
  .option(
    "-d, --directory <directory>",
    "specify a directory to create tree",
    cwd
  )
  .option("-i, --ignore <glob...>", "ignore directories when you create tree")
  .option("-ni, --noIcons", "create tree without icons");

// 查看版本命令，配置-v选项而不是默认的-V
program.version(pkg.version, "-v, --version");

// 解析用户执行的命令
program.parse(process.argv);

const options = program.opts();
const treee = new Treee(options);
treee.create();
