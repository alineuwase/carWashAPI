"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Authentication = /*#__PURE__*/function () {
  function Authentication() {
    _classCallCheck(this, Authentication);
  }

  _createClass(Authentication, null, [{
    key: "generateToken",
    value: function generateToken(user) {
      return _jsonwebtoken["default"].sign({
        user: user
      }, 'secretKey', {
        expiresIn: '1h'
      });
    }
  }, {
    key: "hashPassword",
    value: function hashPassword(password) {
      return _bcrypt["default"].hashSync(password, 10);
    }
  }, {
    key: "checkPassword",
    value: function checkPassword(plainPassword, hashedPassword) {
      return _bcrypt["default"].compareSync(plainPassword, hashedPassword);
    }
  }]);

  return Authentication;
}();

var _default = Authentication;
exports["default"] = _default;