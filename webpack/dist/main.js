(function (modules) {
  var installedModules = {};
  function require(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    modules[moduleId].call(module.exports, module, module.exports, require);
    module.l = true;
    return module.exports;
  }
  // commonjs 规范
  return require("./src/index.js");
})
  ({

    "./src/a.js":
      (function (module, exports) {
        eval("module.exports ='lyf'\n\n//# sourceURL=webpack:///./src/a.js?");
      }),
    "./src/index.js":
      (function (module, exports, require) {
        eval("let a = require(/*! ./a */ \"./src/a.js\");\nconsole.log(a)\n\n//# sourceURL=webpack:///./src/index.js?");
      })
  });