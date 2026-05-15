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
  await fsp.mkdir(distDir, { recursive: true });
  await fsp.rm(buildDir, { recursive: true, force: true });
  await fsp.mkdir(buildDir, { recursive: true });

  for (const file of files) {
    await copyIfPresent(file);
  }

  for (const directory of directories) {
    await copyDirectoryIfPresent(directory);
  }

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
