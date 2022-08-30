module.exports = function reloader() {
  try {
    require("electron-reloader")(module);
  } catch (_) {}
};
