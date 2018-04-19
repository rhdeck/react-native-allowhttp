const ao = require("../index.js");
const cp = require("child_process");
const Path = require("path");
module.exports = [
  {
    name: "addhttpdomain [domain]",
    description: "Add allowed HTTP domain",
    func: args => {
      var p = ao.getPackage();
      if (!p.httpDomains) p.httpDomains = [];
      args.forEach(domain => {
        p.httpDomains.push(domain);
      });
      ao.savePackage(p);
      cp.spawnSync(
        "/usr/bin/env",
        ["node", Path.resolve(__dirname, "postlink.js")],
        { stdio: "inherit" }
      );
    }
  },
  {
    name: "removehttpdomain [domain]",
    description: "Remove allowed HTTP domain",
    func: args => {
      var p = ao.getPackage();
      if (!p.httpDomains) {
        console.log("There are no allowed domains, nothing to do.");
        return;
      }
      args.forEach(domain => {
        const pos = p.httpDomains.indexOf(domain);
        if (pos > -1) {
          p.httpDomains.splice(pos, 1);
        } else {
          console.log("No domain called", domain, "in your package.json");
        }
      });
      if (!p.httpDomains.length) delete p.httpDomains;
      ao.savePackage(p);
      cp.spawnSync(
        "/usr/bin/env",
        ["node", Path.resolve(__dirname, "postlink.js")],
        { stdio: "inherit" }
      );
    }
  },
  {
    name: "clearhttpdomains",
    description: "Remove all allowed HTTP domains",
    func: args => {
      var p = ao.getPackage();
      if (!p.httpDomains) {
        console.log("There are no allowed domains, nothing to do.");
        return;
      }
      delete p.httpDomains;
      ao.savePackage(p);
      cp.spawnSync(
        "/usr/bin/env",
        ["node", Path.resolve(__dirname, "postlink.js")],
        { stdio: "inherit" }
      );
    }
  }
];
