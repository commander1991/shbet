import db from '../models/index';
import { checkUsernameExist, hashUserPassword } from './loginRegisterService';
import { v4 as uuidv4 } from 'uuid'

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "userId", "username", "phone", "point", "pointLock", "linkInfo", "status"],
            include: { model: db.Group, attributes: ["name", "description"] },
        });
        if (users) {
            return {
                EM: 'Get data success',
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: 'Get data success',
                EC: 0,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs with get all user service',
            EC: 1,
            DT: []
        }
    }
}

const countUser = async () => {
    let user = await db.User.findOne()
    try {
        let count = await db.User.count(user.username);
        return {
            EM: 'count ok',
            EC: 0,
            DT: count
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs with counting user service',
            EC: 1,
            DT: []
        }
    }

}

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "userId", "username", "phone", "point", "pointLock", "linkInfo", "status"],
            include: { model: db.Group, attributes: ["name", "description", "id"] },
            order: [['id', 'DESC']]
        })

        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        return {
            EM: 'fetch ok',
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs with pagination service',
            EC: 1,
            DT: []
        }
    }
}

const createNewUser = async (data) => {
    try {//check username
        let isUsernameExist = await checkUsernameExist(data.username)
        if (isUsernameExist === true) {
            return {
                EM: 'User is already exist',
                EC: 1,
                DT: ""
            }
        }
        //hash pass
        let hashPassword = hashUserPassword(data.password)
        await db.User.create({
            userId: uuidv4(),
            ...data,
            password: hashPassword,
            groupId: data.groupId,
            point: 0,
            pointLock: 0,
            linkInfo: "link ok",
            status: 1
        })
        return {
            EM: 'Create OK',
            EC: 0,
            DT: []
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs with user api service',
            EC: 1,
            DT: []
        }
    }
}

const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: 'Error with empty GroupID',
                EC: 1,
                DT: 'group'
            }
        }

        let user = await db.User.findOne({
            where: { id: data.id }
        })

        if (user && !data.password) {
            //update
            await user.update({
                phone: data.phone,
                groupId: data.groupId,
                point: data.point,
                pointLock: data.pointLock,
                linkInfo: data.linkInfo,
                status: data.status
            })
            return {
                EM: 'Update Successfully',
                EC: 0,
                DT: ''
            }
        } if (user && data.password) {
            //update
            await user.update({
                phone: data.phone,
                groupId: data.groupId,
                password: hashUserPassword(data.password),
                point: data.point,
                pointLock: data.pointLock,
                linkInfo: data.linkInfo,
                status: data.status
            })
            return {
                EM: 'Update Successfully',
                EC: 0,
                DT: ''
            }
        } else {
            //user not found
            return {
                EM: 'User NOT found',
                EC: 2,
                DT: ''
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrong with API service',
            EC: 1,
            DT: []
        }
    }
}

const updateUserPassword = async (data) => {
    try {
        if (!data) {
            return {
                EM: 'Error with empty Username',
                EC: 1,
                DT: 'username'
            }
        }
        let user = await db.User.findOne({
            where: { username: data.username }
        })
        if (user) {
            //update
            await user.update({
                password: hashUserPassword(data.newPass)
            })
            return {
                EM: 'Update Password Successfully',
                EC: 0,
                DT: ''
            }
        } else {
            //not found
            return {
                EM: 'User NOT found',
                EC: 2,
                DT: ''
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrong with pass API service',
            EC: 1,
            DT: []
        }
    }
}


const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        })

        if (user) {
            await user.destroy();
            return {
                EM: 'Delete user succeeds',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'User does not exist',
                EC: 2,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Error delete from service, userAPI service',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getAllUser,
    createNewUser,
    countUser,
    updateUser,
    deleteUser,
    getUserWithPagination,
    updateUserPassword
}