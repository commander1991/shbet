'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Phui_Prop', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      huiId: {
        type: Sequelize.STRING
      },
      huiName: {
        type: Sequelize.STRING
      },
      huiType: {
        type: Sequelize.STRING
      },
      huiValue: {
        type: Sequelize.INTEGER
      },
      huiStartDate: {
        type: Sequelize.DATE
      },
      huiMember: {
        type: Sequelize.INTEGER
      },
      huiNum: {
        type: Sequelize.INTEGER
      },
      huiDonate: {
        type: Sequelize.INTEGER
      },
      huiBelongTo: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Phui_Prop');
  }
};