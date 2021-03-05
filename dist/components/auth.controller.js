"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("../config/config"));

var _authenticate = _interopRequireDefault(require("../helpers/authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var userController = /*#__PURE__*/function () {
  function userController() {
    _classCallCheck(this, userController);
  }

  _createClass(userController, null, [{
    key: "signUp",
    value: function () {
      var _signUp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, names, phoneNumber, password, post;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, names = _req$body.names, phoneNumber = _req$body.phoneNumber;
                password = _authenticate["default"].hashPassword(req.body.password);
                post = {
                  names: names,
                  phone_number: phoneNumber,
                  user_type: 'client',
                  password: password
                };

                _config["default"].query('INSERT INTO users SET ?', post, function (error, results, fields) {
                  if (error) {
                    return res.status(409).json({
                      errorMessage: "Phone number Already used!",
                      status: 409
                    });
                  }

                  ;
                  res.status(201).json({
                    message: "Successful",
                    status: 201
                  });
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function signUp(_x, _x2) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }, {
    key: "signIn",
    value: function () {
      var _signIn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body2, phoneNumber, password;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, phoneNumber = _req$body2.phoneNumber, password = _req$body2.password;

                _config["default"].query("SELECT * FROM users WHERE phone_number=?;", [phoneNumber], function (error, results, fields) {
                  if (error) throw error;

                  if (results[0]) {
                    var compare = _authenticate["default"].checkPassword(password, results[0].password);

                    if (compare) {
                      res.status(200).json({
                        message: 'Successful logged in',
                        status: 200,
                        token: _authenticate["default"].generateToken(results[0])
                      });
                    } else {
                      return res.status(401).json({
                        status: 401,
                        errorMessage: 'Wrong credentials'
                      });
                    }
                  } else {
                    return res.status(401).json({
                      status: 401,
                      errorMessage: 'Wrong credentials'
                    });
                  }
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function signIn(_x3, _x4) {
        return _signIn.apply(this, arguments);
      }

      return signIn;
    }()
  }]);

  return userController;
}();

var _default = userController;
exports["default"] = _default;