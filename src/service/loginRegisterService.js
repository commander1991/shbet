//require('dotenv').config();
import db from '../models/index';
import bcrypt from 'bcryptjs';
import { createJWT } from '../middleware/JWTAction';
import { getGroupWithRoles } from './JWTService';
import { v4 as uuidv4 } from 'uuid'

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkUsernameExist = async (nameUser) => {
    let isExist = await db.User.findOne({
        where: { username: nameUser }
    })

    if (isExist) {
        return true;
    }
    return false;
}

const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true;
    }
    return false;
}

const checkUserBanned = async (userName) => {
    let user = await db.User.findOne({
        where: { username: userName }
    })
    if (user.status === 1) {
        return false
    }
    return true
}

const registerNewUser = async (rawUserData) => {
    try {
        //check username/phonenumber are exist
        let isUsernameExist = await checkUsernameExist(rawUserData.username);
        if (isUsernameExist === true) {
            return {
                EM: "User name already exist",
                EC: 1
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist === true) {
            return {
                EM: "Phone is already used",
                EC: 1
            }
        }
        //hash user password
        let hashPassword = hashUserPassword(rawUserData.password);
        //create new user
        await db.User.create({
            userId: uuidv4(),
            username: rawUserData.username,
            phone: rawUserData.phone,
            password: hashPassword,
            groupId: 4,
            point: 0,
            pointLock: 0,
            linkInfo: "link ok",
            status: 1
        })

        return {
            EM: 'Created User Successfully',
            EC: 0
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Something wrong in service...',
            EC: -2,
        }
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword) //true or false
}

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: { username: rawData.valueLogin }
        })
        if (user) {
            let isUserBanned = await checkUserBanned(rawData.valueLogin)
            let isCorrectPassword = checkPassword(rawData.password, user.password)            
            if (isCorrectPassword === true) {
                if (isUserBanned === true) {
                    return {
                        EM: 'User banned',
                        EC: 1,
                        DT: ''
                    }
                }
                let groupWithRoles = await getGroupWithRoles(user)
                let payload = {
                    username: user.username,
                    groupWithRoles,
                    userId: user.userId,
                    point: user.point,
                    pointLock: user.pointLock
                }
                let token = createJWT(payload)
                return {
                    EM: 'OK!',
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRoles,
                        username: user.username,
                        userId: user.userId,
                        point: user.point,
                        pointLock: user.pointLock
                    }
                }
            }
        }
        console.log("Not found user", rawData)
        return {
            EM: 'User incorrect',
            EC: 1,
            DT: ''
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrong in login',
            EC: -2
        }
    }
}

module.exports = {
    registerNewUser, handleUserLogin, hashUserPassword, checkUsernameExist
}