"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Cars", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true, // Sesuaikan sesuai kebutuhan Anda
      defaultValue: null, // Sesuaikan sesuai kebutuhan Anda
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Cars", "deletedAt");
  },
};
