"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _jsonwebtoken = _interopRequireWildcard(require("jsonwebtoken"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
require("dotenv").config();
var nonSecurePaths = ['/logout', '/login', '/register', '/forgot-password', '/'];
var createJWT = function createJWT(payload) {
  var key = process.env.JWT_SECRET;
  var token = null;
  try {
    token = _jsonwebtoken["default"].sign(payload, key, {
      expiresIn: process.env.JWT_EXP_IN
    });
  } catch (error) {
    console.log(error);
  }
  return token;
};
var verifyToken = function verifyToken(token) {
  var key = process.env.JWT_SECRET;
  var decoded = null;
  try {
    decoded = _jsonwebtoken["default"].verify(token, key);
  } catch (error) {
    console.log(error);
  }
  return decoded;
};
var extractToken = function extractToken(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};
var checkUserJWT = function checkUserJWT(req, res, next) {
  if (nonSecurePaths.includes(req.path)) return next();
  var cookies = req.cookies.jwt;
  var tokenFromHeader = extractToken(req);
  if (cookies && cookies.jwt || tokenFromHeader) {
    // if ((cookies && cookies.jwt)) {
    // if (tokenFromHeader) {
    var token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
    // let token = cookies.jwt
    // let token = tokenFromHeader
    var decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      req.token = token;
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: '',
        EM: 'Login to continue...'
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: '',
      EM: 'Not authenticated the user 2'
    });
  }
};
var checkUserPermission = function checkUserPermission(req, res, next) {
  if (nonSecurePaths.includes(req.path) || req.path === '/account') return next();
  if (req.user) {
    var username = req.user.username;
    var roles = req.user.groupWithRoles.Roles;
    var currentUrl = req.path;
    if (!roles || roles.length === 0) {
      return res.status(403).json({
        EC: -1,
        DT: '',
        EM: "You don't have permission to access this resource 1..."
      });
    }
    var canAccess = roles.some(function (item) {
      return item.url === currentUrl || currentUrl.includes(item.url);
    });
    if (canAccess === true) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: '',
        EM: "You don't have permission to access this resource 2..."
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: '',
      EM: 'Not authenticated the user 3'
    });
  }
};
module.exports = {
  createJWT: createJWT,
  checkUserJWT: checkUserJWT,
  checkUserPermission: checkUserPermission
};