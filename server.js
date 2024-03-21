import express from "express";

require('dotenv').config();
import configViewEngine from "./config/viewEngine";
import initWebRouters from "./routes/web";
// import connection from "./config/connectDB";
const bodyParser = require('body-parser');




const app = express();
const PORT = process.env.PORT || 8081


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