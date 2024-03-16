import express from "express";
import homeController from "../controller/homeController";
const router = express.Router();

/**
 * 
 * @param {*} app 
 */
const initWebRouters = (app) => {
    router.get("/", homeController.handleHelloWorld)
    router.get("/about", homeController.handleUserPage)
    return app.use("/", router);
}

export default initWebRouters;
