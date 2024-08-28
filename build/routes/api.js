"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _apiController = _interopRequireDefault(require("../controller/apiController"));
var _userController = _interopRequireDefault(require("../controller/userController"));
var _groupController = _interopRequireDefault(require("../controller/groupController"));
var _JWTAction = require("../middleware/JWTAction");
var _roleController = _interopRequireDefault(require("../controller/roleController"));
var _huiController = _interopRequireDefault(require("../controller/huiController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();

/**
 * 
 * @param {*} app : express app
 */

var initApiRoutes = function initApiRoutes(app) {
  //path, handler
  //rest API
  //GET - R, POST - C, PUT -U, DELETE - D

  router.all('*', _JWTAction.checkUserJWT, _JWTAction.checkUserPermission);
  router.post("/register", _apiController["default"].handleRegister);
  router.post("/login", _apiController["default"].handleLogin);
  router.post("/logout", _apiController["default"].handleLogout);
  router.get("/account", _userController["default"].getUserAccount);

  // user routes
  router.post("/user/create", _userController["default"].createFunc);
  router.get("/user/read", _userController["default"].readFunc);
  router.get("/user/count", _userController["default"].countFunc);
  router.put("/user/update", _userController["default"].updateFunc);
  router["delete"]("/user/delete", _userController["default"].deleteFunc);
  router.put("/user/change-password", _userController["default"].updatePasswordFunc);

  // roles routes
  router.post("/role/create", _roleController["default"].createFunc);
  router.get("/role/read", _roleController["default"].readFunc);
  router.put("/role/update", _roleController["default"].updateFunc);
  router["delete"]("/role/delete", _roleController["default"].deleteFunc);
  router.get("/role/by-group/:groupId", _roleController["default"].getRolebyGroup);
  router.post("/role/assign-to-group", _roleController["default"].assignRoleToGroup);

  //group routes
  router.get("/group/read", _groupController["default"].readFunc);

  //hui routes
  router.post("/phui/create", _huiController["default"].createFunc);
  router.get("/phui/read", _huiController["default"].readFunc);
  //router.put("/user/update", userController.updateFunc)
  router["delete"]("/phui/delete", _huiController["default"].deleteFunc);

  //game routes

  return app.use("/api/v1/", router);
};
var _default = exports["default"] = initApiRoutes;