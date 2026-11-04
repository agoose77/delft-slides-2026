import { opendir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import postcss from "postcss";
import tailwindcss from "tailwindcss";
import baseConfig from "./tailwind.config.mjs";
import { selectAll } from "unist-util-select";

import { program } from "commander";

function parseFile(name, tree, classes) {
  if (!classes.has(name)) {
    classes.set(name, new Set());
  }
  const thisClasses = classes.get(name);
  const nodes = selectAll("[class]", tree);
  nodes.forEach((node) => {
    node.class.split(/\s+/).forEach((cls) => thisClasses.add(cls));
  });
}

async function parseBuiltContent(dest, classes) {
  let dir;
  try {
    dir = await opendir(dest, {
      recursive: true,
    });
  } catch (err) {
    throw err;
  }
  for await (const p of dir) {
    if (!p.isFile()) {
      continue;
    }
    // Test if suffix .json
    if (path.extname(p.name) !== ".json") {
      continue;
    }
    const subPath = path.join(p.parentPath, p.name);
    const rawData = await readFile(subPath, { encoding: "utf-8" });
    const { mdast } = JSON.parse(rawData);
    parseFile(subPath, mdast, classes);
  }
}

async function buildClasses(file, classes) {
  const sourceCSS = "@tailwind components; @tailwind utilities";
  const safelist = new Set();

  for (const docClasses of classes.values()) {
    for (const cls of docClasses) {
      safelist.add(cls);
    }
  }

  const config = {
    presets: [baseConfig],
    prefix: "m-",
    safelist: Array.from(safelist),
  };
  await postcss([tailwindcss(config)])
    .process(sourceCSS)
    .then((result) => {
      return writeFile(file, result.css);
    });
}

async function parseCDNContent(cdn, style) {
  const config = await fetch(`${cdn}/config.json`);
  const data = await config.json();
  const project = data.projects[0];

  const pageNames = [
    project.index,
    ...project.pages.map((p) => p.slug).filter((s) => !!s),
  ];

  const classes = new Map();
  for (const slug of pageNames) {
    const resp = await fetch(`${cdn}/content/${slug}.json`);
    const { mdast } = await resp.json();
    parseFile(slug, mdast, classes);
  }
  await buildClasses(style, classes);
}

async function main() {
  program
    .command("build")
    .option("--site <site>")
    .option("--style <style>")
    .action(async ({ style, site }) => {
      console.log("clone command called");
      const classes = new Map();
      await parseBuiltContent(
        site ?? path.join("_build", "site", "content"),
        classes,
      );
      await buildClasses(style, classes);
    });

  program
    .command("dev")
    .option("--cdn <cdn>")
    .option("--style <style>")
    .action(async ({ cdn, style }) => {
      style ??= "style.css";
      cdn ??= "localhost:3100";
      const cdnWithScheme = `http://${cdn}`;
      await new Promise((resolve, reject) => {
        const socket = new WebSocket(`ws://${cdn}/socket`);

        let expectingReload = false;

        function performUpdate() {
          parseCDNContent(cdnWithScheme, style);
          expectingReload = true;
        }
        performUpdate();

        socket.addEventListener("message", (event) => {
          let receivedData;
          try {
            receivedData = JSON.parse(event.data);
            console.log("Received JSON:", receivedData);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            console.log("Received data was:", event.data);
            return;
          }

          if (receivedData.type === "RELOAD") {
            if (expectingReload) {
              expectingReload = false;
            } else {
              performUpdate();
            }
          }
        });
      });
    });

  await program.parseAsync(process.argv);
}

main();
