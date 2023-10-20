"use strict";

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt");
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const saltRounds = 10;
    await queryInterface.bulkInsert("Admins", [
      {
        name: "Zan",
        age: "20",
        address: "Bekasi",
        role: "Superadmin",
        email: "zan@gmail.com",
        password: bcrypt.hashSync("zan1234", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
      {};
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Admins", null, {});
  },
};
