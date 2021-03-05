"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connection = _mysql["default"].createConnection({
  host: 'bkk0zj1zk5vlv0loeg8h-mysql.services.clever-cloud.com',
  user: 'upp2nt0uguglvs93',
  password: 'xmx7dfo5VDuv6SKu38DV',
  database: 'bkk0zj1zk5vlv0loeg8h'
});

var _default = connection;
exports["default"] = _default;