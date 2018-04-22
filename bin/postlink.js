#!/usr/bin/env node
var fs = require("fs");
var path = require("path");
var glob = require("glob");
var plist = require("plist");
//Get my directory
var thisPath = process.cwd();
var allowedDomains;
var allowhttp;
var allowlocalhttp;
const packagePath = path.resolve(thisPath, "package.json");
if (fs.existsSync(packagePath)) {
  const package = require(packagePath);
  //Get allowed domains
  const parent = package.allowHttp;
  if (parent) {
    allowedDomains = parent.httpDomains;
    allowhttp = parent.allowHTTP;
    allowlocalhttp = parent.allowLocalHTTP;
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
  o.NSAppTransportSecurity.NSExceptionDomains = {
    localhost: { NSExceptionAllowsInsecureHTTPLoads: true }
  };
  if (allowedDomains) {
    allowedDomains.forEach(d => {
      o.NSAppTransportSecurity.NSExceptionDomains[d] = {
        NSExceptionAllowsInsecureHTTPLoads: true
      };
    });
  }
  if (allowhttp) {
    o.NSAppTransportSecurity.NSAllowsArbitraryLoads = true;
    delete o.NSAppTransportSecurity.NSAllowsLocalNetworking;
  } else {
    delete o.NSAppTransportSecurity.NSAllowsArbitraryLoads;
    if (allowlocalhttp)
      o.NSAppTransportSecurity.NSAllowsLocalNetworking = allowlocalhttp;
  }
  const xml = plist.build(o);
  fs.writeFileSync(path, xml);
});
