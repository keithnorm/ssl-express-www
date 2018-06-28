'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (req, res, next) {
  var local = req.url;
  var schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
  var www = req.headers.host.replace(/www\./gi, '');
  var fullUrl = 'https://' + www + local;
  var notLocalHost = function notLocalHost() {
    return www.indexOf('localhost') < 0;
  };

  if (notLocalHost() && schema !== 'https') {
    res.redirect(fullUrl);
  }

  return next();
};

module.exports = exports['default'];