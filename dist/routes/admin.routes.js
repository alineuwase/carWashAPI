"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _admin = _interopRequireDefault(require("../components/admin.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = (0, _express["default"])();
routes.post('/service', _admin["default"].addService);
routes.post('/report', _admin["default"].addReport);
routes.post('/admin', _admin["default"].addAdmin);
routes.get('/booking', _admin["default"].bookings);
routes.get('/report', _admin["default"].getReports);
routes.get('/users', _admin["default"].getUsers);
routes.get('/books', _admin["default"].booking);
routes["delete"]('/user', _admin["default"].deleteUsers);
routes["delete"]('/report', _admin["default"].deleteReport);
routes["delete"]('/service', _admin["default"].deleteService);
var _default = routes;
exports["default"] = _default;