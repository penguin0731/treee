import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import clear from "rollup-plugin-clear";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  input: "index.js",
  output: {
    dir: "dist/",
    manualChunks: {
      commander: ["commander"],
      glob: ["glob"],
    },
  },
  plugins: [
    resolve(),
    commonjs(),
    json(),
    clear({
      targets: ["dist"],
    }),
    terser(),
  ],
});
