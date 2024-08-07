import express from "express";

require('dotenv').config();
import configViewEngine from "./config/viewEngine";
import initWebRouters from "./routes/web";
import initApiRouters from "./routes/api";
import configCors from "./config/cors";
// import connection from "./config/connectDB";
const bodyParser = require('body-parser');





const app = express();
const PORT = process.env.PORT || 8081

//config CORS
configCors(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//config view engine
configViewEngine(app);


// //test connection db
// connection()

//init web routers
initWebRouters(app);
initApiRouters(app);
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