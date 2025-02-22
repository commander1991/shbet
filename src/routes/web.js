import express from "express";
import homeController from '../controller/homeController';
import apiController from '../controller/apiController';

const router = express.Router();

/**
 * 
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
    //path, handler
    router.get("/", homeController.handleHelloWorld);
    router.get("/user", homeController.handleUserPage);
    router.post("/users/create-user", homeController.handleCreateNewUser);
    router.post("/delete-user/:id", homeController.handleDeleteUser);
    router.get("/update-user/:id", homeController.getUpdateUserPage);
    router.post("/user/update-user", homeController.handleUpdateUser);
    router.get("/api/v1/test-api", apiController.testApi);
    router.get("/api/v1/register", apiController.handleRegister);
    router.get("/api/v1/login", apiController.handleLogin);

    return app.use("/", router);
}

export default initWebRoutes;