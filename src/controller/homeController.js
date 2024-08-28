import { render } from 'ejs';
import userService from '../service/userService';
import { response } from 'express';

const handleHelloWorld = (req, res) => {
    return res.render('home.ejs');
}

const handleUserPage = async (req, res) => {
    //model => get data from database
    let userList = await userService.getUserList();
    return res.render('user.ejs', { userList });
}

const handleCreateNewUser = (req, res) => {
    let username = req.body.username;
    let phone = req.body.phone;
    let password = req.body.password;

    userService.createNewUser(username, phone, password);
    return res.redirect("/user");
}

const handleDeleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
}

const getUpdateUserPage = async (req, res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id)
    let userData = {};
    userData = user;
    return res.render('user-update.ejs', { userData });
}

const handleUpdateUser = async (req, res) => {
    let username = req.body.username;
    let phone = req.body.phone;
    let id = req.body.id;
    await userService.updateUserInfo(username, phone, id);
    return res.redirect("/user");
}
module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    getUpdateUserPage,
    handleUpdateUser
}