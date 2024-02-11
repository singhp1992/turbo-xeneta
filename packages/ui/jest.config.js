// Just importing the config from jsconfig workspace and exporting it
const sharedConfig = require("jest-config-custom");
module.exports = {
  ...sharedConfig,
};
