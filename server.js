import express from "express";

require('dotenv').config();
import configViewEngine from "./config/viewEngine";
import initWebRouters from "./routes/web";
// import connection from "./config/connectDB";
const bodyParser = require('body-parser');




const app = express();
const PORT = process.env.PORT || 8081

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config view engine
configViewEngine(app);


// //test connection db
// connection()

//init web routers
initWebRouters(app);

app.listen(PORT, () => {
    console.log(`JWT Backend Server is running on http://localhost:${PORT}`);
})

// const { createReadStream, readFileSync } = require('fs')

// const { createServer } = require('http')

// const server = createServer()

// server.on('request', (req, res) => {
//     const result = readFileSync('../record.aac');
//     // result.pipe(res);
//     res.end(result)
// })

// process.title = 'withStream'
// console.log(process.pid)
// server.listen(3000);