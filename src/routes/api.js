import express from "express";
import apiController from '../controller/apiController';
import userController from '../controller/userController';
import groupController from '../controller/groupController';
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction'
import roleController from '../controller/roleController'
import huiController from '../controller/huiController'


const router = express.Router();

/**
 * 
 * @param {*} app : express app
 */

const initApiRoutes = (app) => {
    //path, handler
    //rest API
    //GET - R, POST - C, PUT -U, DELETE - D

    router.all('*', checkUserJWT, checkUserPermission)
    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)
    router.post("/logout", apiController.handleLogout)

    router.get("/account", userController.getUserAccount)

    // user routes
    router.post("/user/create", userController.createFunc)
    router.get("/user/read", userController.readFunc)
    router.get("/user/count", userController.countFunc)
    router.put("/user/update", userController.updateFunc)
    router.delete("/user/delete", userController.deleteFunc)
    router.put("/user/change-password", userController.updatePasswordFunc)

    // roles routes
    router.post("/role/create", roleController.createFunc)
    router.get("/role/read", roleController.readFunc)
    router.put("/role/update", roleController.updateFunc)
    router.delete("/role/delete", roleController.deleteFunc)
    router.get("/role/by-group/:groupId", roleController.getRolebyGroup)
    router.post("/role/assign-to-group", roleController.assignRoleToGroup)

    //group routes
    router.get("/group/read", groupController.readFunc)

    //hui routes
    router.post("/phui/create", huiController.createFunc)
    router.get("/phui/read", huiController.readFunc)
    //router.put("/user/update", userController.updateFunc)
    router.delete("/phui/delete", huiController.deleteFunc)

  

    //game routes
    
    return app.use("/api/v1/", router);
}
export default initApiRoutes;