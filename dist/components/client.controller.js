"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var _axios = _interopRequireDefault(require("axios"));

var _config = _interopRequireDefault(require("../config/config"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var clientController = /*#__PURE__*/function () {
  function clientController() {
    _classCallCheck(this, clientController);
  }

  _createClass(clientController, null, [{
    key: "booking",
    value: function () {
      var _booking = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, date, service, carType, price, phoneNumber, plateNo, requestTransactionId, post;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, date = _req$body.date, service = _req$body.service, carType = _req$body.carType, price = _req$body.price, phoneNumber = _req$body.phoneNumber, plateNo = _req$body.plateNo, requestTransactionId = _req$body.requestTransactionId;
                post = {
                  plate_no: plateNo,
                  date: date,
                  service: service,
                  car_type: carType,
                  phone_number: phoneNumber,
                  price: price,
                  pay_status: 'not paid',
                  status: 'pending',
                  request_transaction_id: requestTransactionId
                };

                _config["default"].query('INSERT INTO bookings SET ?', post, function (error, results, fields) {
                  if (error) throw error;
                  console.log('The sulition is: ', results[0]);
                  res.status(201).json({
                    message: 'Booked successful',
                    status: '201'
                  });
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function booking(_x, _x2) {
        return _booking.apply(this, arguments);
      }

      return booking;
    }()
  }, {
    key: "getServices",
    value: function () {
      var _getServices = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _config["default"].query('SELECT * FROM services;', function (error, results, fields) {
                  if (error) throw error;
                  res.status('200').json({
                    message: 'Get all services',
                    status: 200,
                    results: results
                  });
                });

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getServices(_x3, _x4) {
        return _getServices.apply(this, arguments);
      }

      return getServices;
    }()
  }, {
    key: "payService",
    value: function () {
      var _payService = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var username, accountNo, partnerPassword, yyyymmdd, timestampp, password, _req$body2, phoneNumber, amount, requestTransId, tel, data, options;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                yyyymmdd = function _yyyymmdd() {
                  var x = new Date();
                  var y = x.getUTCFullYear().toString();
                  var m = (x.getUTCMonth() + 1).toString();
                  var d = x.getUTCDate().toString();
                  var h = x.getUTCHours().toString();
                  var min = x.getUTCMinutes().toString();
                  var s = x.getUTCSeconds().toString();
                  d.length == 1 && (d = '0' + d);
                  m.length == 1 && (m = '0' + m);
                  h.length == 1 && (h = '0' + h);
                  min.length == 1 && (min = '0' + min);
                  s.length == 1 && (s = '0' + s);
                  var yyyymmddhhmmss = y + m + d + h + min + s;
                  return yyyymmddhhmmss;
                };

                username = 'testa';
                accountNo = '250160000011';
                partnerPassword = 'pass123456789';
                timestampp = yyyymmdd();
                password = _crypto["default"].createHash('sha256').update(username + accountNo + partnerPassword + timestampp).digest('hex');
                _req$body2 = req.body, phoneNumber = _req$body2.phoneNumber, amount = _req$body2.amount, requestTransId = _req$body2.requestTransId;
                tel = "25".concat(phoneNumber);
                data = {
                  username: username,
                  timestamp: timestampp,
                  amount: amount,
                  password: password,
                  mobilephone: tel,
                  requesttransactionid: requestTransId
                };
                options = {
                  method: 'post',
                  url: 'https://www.intouchpay.co.rw/api/requestpayment/',
                  data: JSON.stringify(data),
                  headers: {
                    "Content-Type": "application/json"
                  }
                };
                (0, _axios["default"])(options).then(function (data) {
                  console.log(data);
                  res.json(data.data);
                })["catch"](function (err) {
                  return console.log(err);
                });

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function payService(_x5, _x6) {
        return _payService.apply(this, arguments);
      }

      return payService;
    }()
  }, {
    key: "checkPayment",
    value: function () {
      var _checkPayment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var requesttransactionid;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                requesttransactionid = req.body.requesttransactionid;

                _config["default"].query('SELECT * FROM bookings WHERE request_transaction_id=?', [requesttransactionid], function (error, results, fields) {
                  if (error) {
                    return console.log('No request Id');
                  }

                  if (results[0].request_transaction_id === requesttransactionid) {
                    _config["default"].query("UPDATE bookings SET pay_status = 'paid' WHERE request_transaction_id=?", [requesttransactionid], function (error, results, field) {
                      if (error) throw error;
                      res.status(200).json({
                        message: 'success',
                        success: true,
                        request_id: requesttransactionid
                      });
                    });
                  }
                });

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function checkPayment(_x7, _x8) {
        return _checkPayment.apply(this, arguments);
      }

      return checkPayment;
    }()
  }]);

  return clientController;
}();

var _default = clientController;
exports["default"] = _default;