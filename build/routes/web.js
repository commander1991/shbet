"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _homeController = _interopRequireDefault(require("../controller/homeController"));
var _apiController = _interopRequireDefault(require("../controller/apiController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();

/**
 * 
 * @param {*} app : express app
 */

var initWebRoutes = function initWebRoutes(app) {
  //path, handler
  router.get("/", _homeController["default"].handleHelloWorld);
  router.get("/user", _homeController["default"].handleUserPage);
  router.post("/users/create-user", _homeController["default"].handleCreateNewUser);
  router.post("/delete-user/:id", _homeController["default"].handleDeleteUser);
  router.get("/update-user/:id", _homeController["default"].getUpdateUserPage);
  router.post("/user/update-user", _homeController["default"].handleUpdateUser);
  router.get("/api/v1/test-api", _apiController["default"].testApi);
  router.get("/api/v1/register", _apiController["default"].handleRegister);
  router.get("/api/v1/login", _apiController["default"].handleLogin);
  return app.use("/", router);
};
var _default = exports["default"] = initWebRoutes;