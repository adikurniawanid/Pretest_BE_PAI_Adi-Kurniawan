"use strict";
const conditionSeederData = require("../../../public/seederData/conditionData.json");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Conditions", conditionSeederData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Conditions", null, {});
  },
};
