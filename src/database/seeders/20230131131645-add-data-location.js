"use strict";
const locationSeederData = require("../../../public/seederData/locationData.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Locations", locationSeederData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Locations", null, {});
  },
};
