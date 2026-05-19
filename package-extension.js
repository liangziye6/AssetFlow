const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const { spawnSync } = require("child_process");

const root = __dirname;
const distDir = path.join(root, "dist");
const buildDir = path.join(distDir, "image-prompt-builder");
const zipPath = path.join(distDir, "image-prompt-builder.zip");

const files = [
  "manifest.json",
  "background.js",
  "content.js",
  "index.html",
  "popup.html",
  "popup.css",
  "popup.js",
  "options.html",
  "options.css",
  "options.js",
  "README.md",
];

const directories = ["assets", "docs"];
const assetReferenceFiles = [
  "manifest.json",
  "content.js",
  "popup.html",
  "popup.css",
  "popup.js",
  "options.html",
  "options.css",
  "options.js",
];

async function exists(target) {
  try {
    await fsp.access(target);
    return true;
  } catch {
    return false;
  }
}

async function copyIfPresent(relativePath) {
  const source = path.join(root, relativePath);
  if (!(await exists(source))) {
    return;
  }

  await fsp.copyFile(source, path.join(buildDir, relativePath));
}

async function copyDirectoryIfPresent(relativePath) {
  const source = path.join(root, relativePath);
  if (!(await exists(source))) {
    return;
  }

  await fsp.cp(source, path.join(buildDir, relativePath), {
    recursive: true,
    force: true,
  });
}

async function referencedAssets() {
  const assets = new Set();
  const assetPattern = /["'`](assets\/[^"'`\s)]+)["'`]/g;

  for (const file of assetReferenceFiles) {
    const source = path.join(root, file);
    if (!(await exists(source))) continue;

    const content = await fsp.readFile(source, "utf8");
    for (const match of content.matchAll(assetPattern)) {
      if (!match[1].includes("*")) {
        assets.add(match[1]);
      }
    }
  }

  return [...assets].sort();
}

async function assertFilesPresent(relativePaths, baseDir = root) {
  const missing = [];
  for (const relativePath of relativePaths) {
    if (!(await exists(path.join(baseDir, relativePath)))) {
      missing.push(relativePath);
    }
  }

  if (missing.length) {
    throw new Error(`Missing required extension files:\n${missing.map((file) => `- ${file}`).join("\n")}`);
  }
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || root,
    stdio: "inherit",
  });

  return result.status === 0;
}

function createZip() {
  if (fs.existsSync(zipPath)) {
    fs.rmSync(zipPath, { force: true });
  }

  if (process.platform === "win32") {
    return run("powershell", [
      "-NoProfile",
      "-ExecutionPolicy",
      "Bypass",
      "-Command",
      `Compress-Archive -Path '${path.join(buildDir, "*")}' -DestinationPath '${zipPath}' -Force`,
    ]);
  }

  if (run("zip", ["-qr", zipPath, "."], { cwd: buildDir })) {
    return true;
  }

  if (process.platform === "darwin") {
    return run("ditto", ["-c", "-k", ".", zipPath], { cwd: buildDir });
  }

  return false;
}

async function main() {
  const assets = await referencedAssets();
  await assertFilesPresent([...files, ...assets]);

  await fsp.mkdir(distDir, { recursive: true });
  await fsp.rm(buildDir, { recursive: true, force: true });
  await fsp.mkdir(buildDir, { recursive: true });

  for (const file of files) {
    await copyIfPresent(file);
  }

  for (const directory of directories) {
    await copyDirectoryIfPresent(directory);
  }

  await assertFilesPresent([...files, ...assets], buildDir);

  if (!createZip()) {
    throw new Error("Failed to create extension zip. Please make sure ditto, zip, or PowerShell is available.");
  }

  console.log("");
  console.log("Image Prompt Builder extension package is ready:");
  console.log(zipPath);
  console.log("");
  console.log("For local testing, open chrome://extensions or edge://extensions, enable Developer mode, then load unpacked:");
  console.log(buildDir);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
