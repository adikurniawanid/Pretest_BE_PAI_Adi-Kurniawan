"use strict";
module.exports = {
  authorization: require("./authorization.middleware"),
  errorHandler: require("./errorHandler.middleware"),
  validation: require("./validation.middleware"),
};
