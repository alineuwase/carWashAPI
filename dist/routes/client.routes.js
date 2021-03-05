"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _client = _interopRequireDefault(require("../components/client.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = (0, _express["default"])();
routes.post('/booking', _client["default"].booking);
routes.get('/service', _client["default"].getServices);
routes.post('/pay', _client["default"].payService);
routes.post('/checkpay', _client["default"].checkPayment);
var _default = routes;
exports["default"] = _default;