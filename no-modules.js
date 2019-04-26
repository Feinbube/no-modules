const {
  existsSync,
  lstatSync,
  readdirSync,
  rmdirSync,
  statSync,
  unlinkSync
} = require("fs");
const { join } = require("path");

const deleteFolderRecursive = path => {
  if (existsSync(path)) {
    readdirSync(path).forEach(file => {
      const curPath = join(path, file);
      if (lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        unlinkSync(curPath);
      }
    });
    rmdirSync(path);
  }
};

findNodeModules = (list, folder) => {
  if (!statSync(folder).isDirectory()) {
    return;
  }

  if (folder.indexOf("node_modules") !== -1) {
    console.log(`  ${folder}`);
    list.push(folder);
  } else {
    readdirSync(folder).forEach(subFolder =>
      findNodeModules(list, join(folder, subFolder))
    );
  }
};

console.log(`
Usage:
  no-modules.js <root-folder>
    Print a list of all node_module folders
  no-modules.js <root-folder> --delete
    Delete all node_module folders
`);

if (process.argv.length > 2) {
  const list = [];
  console.log("Listing: ");
  findNodeModules(list, process.argv[2]);

  if (process.argv.length > 3 && process.argv[3] === "--delete") {
    console.log(" ");
    console.log("Deleting: ");
    list.forEach(folder => {
      console.log(`  ${folder}`);
      deleteFolderRecursive(folder);
    });
  }
}
