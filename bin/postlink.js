#!/usr/bin/env node
var fs = require("fs");
var path = require("path");
var glob = require("glob");
var plist = require("plist");
//Get my directory
var thisPath = process.cwd();
var allowedDomains;
const packagePath = path.resolve(thisPath, "package.json");
if (fs.existsSync(packagePath)) {
  const package = require(packagePath);
  //Get allowed domains
  allowedDomains = package.httpDomains;
  if (!allowedDomains) {
    console.log("No allowed domains specified - aborting");
    process.exit();
  }
}
var iosPath = path.resolve(thisPath, "ios");
if (!fs.existsSync(iosPath)) {
  console.log("Could not find ios in ", thisPath, iosPath);
  console.log(fs.readdirSync(thisPath));
  process.exit();
}
plists = glob.sync(path.resolve(iosPath + "/*/Info.plist"));
plists.map(path => {
  const source = fs.readFileSync(path, "utf8");
  var o = plist.parse(source);
  if (!o.NSAppTransportSecurity) o.NSAppTransportSecurity = {};
  if (!o.NSAppTransportSecurity.NSExceptionDomains)
    o.NSAppTransportSecurity.NSExceptionDomains = {};
  allowedDomains.forEach(d => {
    o.NSAppTransportSecurity.NSExceptionDomains[d] = {
      NSExceptionAllowsInsecureHTTPLoads: true
    };
  });
  const xml = plist.build(o);
  fs.writeFileSync(path, xml);
});
