import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";
const router = express.Router();

/**
 * 
 * @param {*} app 
 */
const initWebRouters = (app) => {
    router.get("/", homeController.handleHelloWorld);
    router.get("/user", homeController.handleUserPage);
    router.post("/users/create-user", homeController.handleCreateNewUser);
    router.post("/users/delete-user/", homeController.handleDeleteUser);
    router.post("/users/edit-user/", homeController.handleEditUser);

    router.get("/api/test-api", apiController.testApi)
    return app.use("/", router);
}

export default initWebRouters;
