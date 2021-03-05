"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _authenticate = _interopRequireDefault(require("../helpers/authenticate"));

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var adminController = /*#__PURE__*/function () {
  function adminController() {
    _classCallCheck(this, adminController);
  }

  _createClass(adminController, null, [{
    key: "addService",
    value: function () {
      var _addService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, serviceName, price, post;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, serviceName = _req$body.serviceName, price = _req$body.price;
                post = {
                  service_name: serviceName,
                  price: price
                };

                _config["default"].query('INSERT INTO services SET ?', post, function (error, results, fields) {
                  if (error) throw error;
                  res.status(201).json({
                    message: "Service added",
                    status: 201
                  });
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addService(_x, _x2) {
        return _addService.apply(this, arguments);
      }

      return addService;
    }()
  }, {
    key: "addReport",
    value: function () {
      var _addReport = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body2, date, plateNo, carMark, cleanerName, status, post;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, date = _req$body2.date, plateNo = _req$body2.plateNo, carMark = _req$body2.carMark, cleanerName = _req$body2.cleanerName, status = _req$body2.status;
                post = {
                  date: date,
                  plate_no: plateNo,
                  car_mark: carMark,
                  cleaner_name: cleanerName,
                  status: status
                };

                _config["default"].query('INSERT INTO report SET ?', post, function (error, results, fields) {
                  if (error) throw error;
                  res.status(201).json({
                    message: "report added",
                    status: 201
                  });
                });

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function addReport(_x3, _x4) {
        return _addReport.apply(this, arguments);
      }

      return addReport;
    }()
  }, {
    key: "addAdmin",
    value: function () {
      var _addAdmin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var _req$body3, names, phoneNumber, password, post;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _req$body3 = req.body, names = _req$body3.names, phoneNumber = _req$body3.phoneNumber;
                password = _authenticate["default"].hashPassword(req.body.password);
                post = {
                  names: names,
                  phone_number: phoneNumber,
                  user_type: 'admin',
                  password: password
                };

                _config["default"].query('INSERT INTO users SET ?', post, function (error, results, fields) {
                  if (error) throw error;
                  res.status(201).json({
                    message: "Admin Added Successful",
                    status: 201
                  });
                });

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function addAdmin(_x5, _x6) {
        return _addAdmin.apply(this, arguments);
      }

      return addAdmin;
    }()
  }, {
    key: "bookings",
    value: function () {
      var _bookings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _config["default"].query('SELECT * FROM bookings;', function (error, results, fields) {
                  if (error) throw error;
                  res.status('200').json({
                    message: 'Get all bookings',
                    status: 200,
                    results: results
                  });
                });

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function bookings(_x7, _x8) {
        return _bookings.apply(this, arguments);
      }

      return bookings;
    }()
  }, {
    key: "booking",
    value: function () {
      var _booking = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var tel;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                tel = req.query.tel;

                _config["default"].query("SELECT * FROM bookings WHERE phone_number=".concat(tel, ";"), function (error, results, fields) {
                  if (error) throw error;
                  res.status('200').json({
                    message: 'Get all bookings',
                    status: 200,
                    results: results
                  });
                });

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function booking(_x9, _x10) {
        return _booking.apply(this, arguments);
      }

      return booking;
    }()
  }, {
    key: "getReports",
    value: function () {
      var _getReports = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _config["default"].query('SELECT * FROM report;', function (error, results, fields) {
                  if (error) throw error;
                  res.status('200').json({
                    message: 'Get all services',
                    status: 200,
                    results: results
                  });
                });

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function getReports(_x11, _x12) {
        return _getReports.apply(this, arguments);
      }

      return getReports;
    }()
  }, {
    key: "getUsers",
    value: function () {
      var _getUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _config["default"].query('SELECT * FROM users;', function (error, results, fields) {
                  if (error) throw error;
                  res.status('200').json({
                    message: 'Get all Users',
                    status: 200,
                    results: results
                  });
                });

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function getUsers(_x13, _x14) {
        return _getUsers.apply(this, arguments);
      }

      return getUsers;
    }()
  }, {
    key: "deleteUsers",
    value: function () {
      var _deleteUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var userid;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                userid = req.query.userid;

                _config["default"].query('DELETE FROM users WHERE user_id=?', [userid], function (error, results, fields) {
                  if (error) throw error;
                  res.status(202).json({
                    message: 'Deleted Successfully',
                    status: 202
                  });
                });

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function deleteUsers(_x15, _x16) {
        return _deleteUsers.apply(this, arguments);
      }

      return deleteUsers;
    }()
  }, {
    key: "deleteReport",
    value: function () {
      var _deleteReport = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
        var plateno;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                plateno = req.query.plateno;

                _config["default"].query('DELETE FROM report WHERE plate_no=?', [plateno], function (error, results, fields) {
                  if (error) throw error;
                  res.status(202).json({
                    message: 'Deleted Successfully',
                    status: 202
                  });
                });

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function deleteReport(_x17, _x18) {
        return _deleteReport.apply(this, arguments);
      }

      return deleteReport;
    }()
  }, {
    key: "deleteService",
    value: function () {
      var _deleteService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
        var serviceid;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                serviceid = req.query.serviceid;

                _config["default"].query('DELETE FROM services WHERE service_id=?', [serviceid], function (error, results, fields) {
                  if (error) throw error;
                  res.status(202).json({
                    message: 'Deleted Successfully',
                    status: 202
                  });
                });

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function deleteService(_x19, _x20) {
        return _deleteService.apply(this, arguments);
      }

      return deleteService;
    }()
  }]);

  return adminController;
}();

var _default = adminController;
exports["default"] = _default;