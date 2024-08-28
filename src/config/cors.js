require('dotenv').config();
import { all } from 'bluebird';
import cors from 'cors';

const configCors = (app) => {
    var corsOptions = {
        origin: process.env.REACT_URL,
        credentials: true,
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    app.use(cors(corsOptions));
    //add headers before the routes are difined
    // app.use(function (req, res, next) {

    //     // website you wish to allow to connect
    //     res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

    //     // request methods you wish to allow
    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    //     // request headers you wish to allow
    //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

    //     // set true if you need the website to inclue cookies in the request
    //     // sent to the API (e.g. in case you use sessions)
    //     res.setHeader('Access-Control-Allow-Credentials', true)

    //     if (req.method === 'OPTIONS') {
    //         return res.sendStatus(200)
    //     }
    //     //pass to next layer of middleware
    //     next();
    // });
}

export default configCors;