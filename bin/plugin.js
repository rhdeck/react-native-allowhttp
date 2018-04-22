const ao = require("../index.js");
const cp = require("child_process");
const Path = require("path");
module.exports = [
  {
    name: "allowhttp",
    description: "Allow arbitrary (e.g. HTTP) loads",
    func: args => {
      var p = ao.getPackage();
      if (!p.allowHttp) p.allowHttp = {};
      p.allowHttp.allowHTTP = true;
      ao.savePackage(p);
      cp.spawnSync(
        "/usr/bin/env",
        ["node", Path.resolve(__dirname, "postlink.js")],
        { stdio: "inherit" }
      );
    }
  },
  {
    name: "disallowhttp",
    description: "Disallow arbitrary (e.g. HTTP loads",
    func: args => {
      var p = ao.getPackage();
      if (!p.allowHttp) p.allowHttp = {};
      p.allowHttp.allowHTTP = false;
      ao.savePackage(p);
      cp.spawnSync(
        "/usr/bin/env",
        ["node", Path.resolve(__dirname, "postlink.js")],
        { stdio: "inherit" }
      );
    }
  },
  {
    name: "allowlocalhttp",
    description: "Allow arbitrary (e.g. HTTP) loads in local networking",
    func: args => {
      var p = ao.getPackage();
      if (!p.allowHttp) p.allowHttp = {};
      p.allowHttp.allowLocalHTTP = true;
      ao.savePackage(p);
      cp.spawnSync(
        "/usr/bin/env",
        ["node", Path.resolve(__dirname, "postlink.js")],
        { stdio: "inherit" }
      );
    }
  },
  {
    name: "disallowlocalhttp",
    description: "Disallow arbitrary (e.g. HTTP loads in local networking",
    func: args => {
      var p = ao.getPackage();
      if (!p.allowHttp) p.allowHttp = {};
      p.allowHttp.allowLocalHTTP = false;
      ao.savePackage(p);
      cp.spawnSync(
        "/usr/bin/env",
        ["node", Path.resolve(__dirname, "postlink.js")],
        { stdio: "inherit" }
      );
    }
  },
  {
    name: "addhttpdomain [domain]",
    description: "Add allowed HTTP domain",
    func: args => {
      var p = ao.getPackage();
      if (!p.allowHttp) p.allowHttp = {};
      if (!p.allowHttp.httpDomains) p.allowHttp.httpDomains = [];
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
      if (!p.allowHttp || !p.allowHttp.httpDomains) {
        console.log("There are no allowed domains, nothing to do.");
        return;
      }
      args.forEach(domain => {
        const pos = p.allowHttp.httpDomains.indexOf(domain);
        if (pos > -1) {
          p.allowHttp.httpDomains.splice(pos, 1);
        } else {
          console.log("No domain called", domain, "in your package.json");
        }
      });
      if (!p.allowHttp.httpDomains.length) delete p.allowHttp.httpDomains;
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
      if (!p.allowHttp || !p.allowHttp.httpDomains) {
        console.log("There are no allowed domains, nothing to do.");
        return;
      }
      delete p.allowHttp.httpDomains;
      ao.savePackage(p);
      cp.spawnSync(
        "/usr/bin/env",
        ["node", Path.resolve(__dirname, "postlink.js")],
        { stdio: "inherit" }
      );
    }
  }
];
