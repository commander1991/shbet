"use strict";

var _express = _interopRequireDefault(require("express"));
var _viewEngine = _interopRequireDefault(require("./config/viewEngine"));
var _web = _interopRequireDefault(require("./routes/web"));
var _api = _interopRequireDefault(require("./routes/api"));
var _cors = _interopRequireDefault(require("./config/cors"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _connectDB = _interopRequireDefault(require("./config/connectDB"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
require('dotenv').config();
var http = require('http');
var https = require('https');
var socketIo = require('socket.io');
var fs = require('fs');
var path = require('path');
var app = (0, _express["default"])();
var PORT = process.env.PORT || 8080;
var privateKey = fs.readFileSync(path.join(__dirname, './CA/privkey.pem'));
var certificate = fs.readFileSync(path.join(__dirname, './CA/cert.pem'));
var option = {
  cert: certificate,
  key: privateKey
};
//const server = http.createServer(app).listen(80);
var server = https.createServer(option, app).listen(443);
var io = socketIo(server);
app.use("/static", _express["default"]["static"]('./static/'));

// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

//config cors
(0, _cors["default"])(app);

//config view engine
(0, _viewEngine["default"])(app);

//config body parser
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));

//config cookie-parser
app.use((0, _cookieParser["default"])());

//init web routes
(0, _web["default"])(app);
(0, _api["default"])(app);
(0, _connectDB["default"])();
app.use(function (req, res) {
  return res.send('404 Not found');
});
app.listen(PORT, function () {
  console.log("backend is running on the port = " + PORT);
});
io.on('connection', function (socket) {
  console.log('A user connected');
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
});