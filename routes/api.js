import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";

import groupController from "../controller/groupController";

import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";
const router = express.Router();

/**
 * 
 * @param {*} app 
 */

const initApiRouters = (app) => {

    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    router.get("/user/read", checkUserJWT, checkUserPermission, userController.readUser);
    router.post("/user/create", userController.createNewUser);
    router.put("/user/update", userController.updateUser);
    router.delete("/user/delete", userController.deleteUser);

    router.get("/group/read", groupController.getGroup);

    return app.use("/api/v1/", router);
}

export default initApiRouters;
