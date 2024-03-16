import express from "express";

require('dotenv').config();
import configViewEngine from "./config/viewEngine";
import initWebRouters from "./routes/web";

const app = express();
const PORT = process.env.PORT || 8081

//config view engine
configViewEngine(app);

//init web routers
initWebRouters(app);

app.listen(PORT, () => {
    console.log("JWT Backend Server is running on port " + PORT);
})