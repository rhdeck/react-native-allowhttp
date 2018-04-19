var fs = require("fs");
var path = require("path");
var glob = require("glob");
var plist = require("plist");

const getPackage = () => {
  const packagePath = path.resolve(process.cwd(), "package.json");
  if (fs.existsSync(packagePath)) {
    const p = require(packagePath);
    return p;
  }
};
const savePackage = o => {
  const packagePath = path.resolve(process.cwd(), "package.json");
  fs.writeFileSync(packagePath, JSON.stringify(o, null, 2));
};

module.exports = {
  getPackage,
  savePackage
};
