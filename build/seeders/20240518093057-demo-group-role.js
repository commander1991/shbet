'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Group_Role', [{
      groupId: 1,
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 12,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 13,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 14,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 15,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 16,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      groupId: 1,
      roleId: 17,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Group_Role', null, {});
  }
};