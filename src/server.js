require('dotenv').config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB";
const http = require('http');
const https = require('https');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;
// const privateKey = fs.readFileSync(path.join(__dirname,'./CA/privkey.pem'));
// const certificate = fs.readFileSync(path.join(__dirname,'./CA/cert.pem'));
// const option = {
//     cert: certificate,
//     key: privateKey,
// }
const server = http.createServer(app).listen(80);
// const server = https.createServer(option, app).listen(443);
const io = socketIo(server);

app.use("/static", express.static('./static/'));

// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

//config cors
configCors(app);

//config view engine
configViewEngine(app);

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookie-parser
app.use(cookieParser())

//init web routes
initWebRoutes(app);
initApiRoutes(app);

connectDB();

app.use((req, res) => {
    return res.send('404 Not found')
})
app.listen(PORT, () => {
    console.log("backend is running on the port = " + PORT);
})

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});