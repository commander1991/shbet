'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Role', [{
      url: "/user/create",
      description: "Tạo người dùng",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: "/user/read",
      description: "Load thông tin người dùng",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: "/user/update",
      description: "Cập nhật người dùng",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: "/user/delete",
      description: "Xoá người dùng",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: "/user/count",
      description: "Xem thông tin tài khoản",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: "/user/change-password",
      description: "Đổi mật khẩu",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: "/account",
      description: "Xem thông tin tài khoản",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: "/role/create",
      description: "Tạo quyền",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: "/role/read",
      description: "Load danh sách quyền",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: "/role/update",
      description: "Cập nhật quyền",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: "/role/delete",
      description: "Xoá quyền",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: "/role/by-group",
      description: "Xoá quyền",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: "/role/assign-to-group",
      description: "Gán quyền cho nhóm",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: "/group/read",
      description: "Load danh sách nhóm",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: "/phui/create",
      description: "Load danh sách nhóm",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: "/phui/read",
      description: "Load danh sách nhóm",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      url: "/phui/delete",
      description: "Load danh sách nhóm",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Role', null, {});
  }
};