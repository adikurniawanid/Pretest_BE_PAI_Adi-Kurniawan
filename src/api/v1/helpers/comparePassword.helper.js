"use strict";
const bcrypt = require("bcrypt");

module.exports = async (passwordParam, hashParam) => {
  return await bcrypt.compare(passwordParam, hashParam);
};
