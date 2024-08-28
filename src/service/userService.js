import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

//hash password
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

//push user data to database
const createNewUser = async (username, password, phone) => {
    let hashPass = hashUserPassword(password);
    try {
        await db.User.create({
            username: username,
            password: hashPass,
            phone: phone,
            groupId: 4
        })
    } catch (error) {
        console.log(">>> check error: ", error)
    }
}

const getUserList = async () => {

    //test relationships
    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ["id", "userId", "username", "phone", "point", "pointLock", "linkInfo", "status"],
        include: { model: db.Group, attributes: ["name", "description"], },
        raw: true,
        nest: true
    })

    let r = await db.Role.findAll({
        include: { model: db.Group, where: { id: 1 } },
        raw: true,
        nest: true
    })

    let users = [];
    users = await db.User.findAll();
    return users;
}

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: {
            id: userId
        }
    })
}

const getUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: { id: id }
    })
    return user

}

const updateUserInfo = async (phone, username, id) => {
    await db.User.update(
        { phone: phone, username: username },
        { where: { id: id } }
    );

}
module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfo
}