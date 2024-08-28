'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Group', [
      {
        name: "dev",
        description: "Development",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "leader",
        description: "Leader",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "vip",
        description: "VIP",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "member",
        description: "Member",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Group', null, {});
  },
};