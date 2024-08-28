import userApiService from '../service/userApiService';

const readFunc = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await userApiService.getUserWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                DT: data.DT, //data
            })
        } else {
            return res.status(500).json({
                EM: 'Error from server user controller', // error message
                EC: '-1', // error code
                DT: '', //data
            })
            // let data = await userApiService.getAllUser();
            // return res.status(200).json({
            //     EM: data.EM, // error message
            //     EC: data.EC, // error code
            //     DT: data.DT, //data
            // })
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'Error from server user controller - read ', // error message
            EC: '-1', // error code
            DT: '', //data
        })
    }
}

const createFunc = async (req, res) => {
    try {
        //validate
        let data = await userApiService.createNewUser(req.body);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, //data
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error from server user controller - create', // error message
            EC: '-1', // error code
            DT: '', //data
        })
    }
}

const countFunc = async (req, res) => {
    try {
        //validate
        let data = await userApiService.countUser();
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, //data
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error from server user controller - counting', // error message
            EC: '-1', // error code
            DT: '', //data
        })
    }
}

const updateFunc = async (req, res) => {
    try {
        //validate
        let data = await userApiService.updateUser(req.body);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, //data
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error from server user controller - update', // error message
            EC: '-1', // error code
            DT: '', //data
        })
    }
}

const deleteFunc = async (req, res) => {
    try {
        let data = await userApiService.deleteUser(req.body.id)
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, //data
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error from server user controller - delete', // error message
            EC: '-1', // error code
            DT: '', //data
        })
    }
}

const getUserAccount = async (req, res) => {
   
    return res.status(200).json({
        EM: 'OK, get user account', // error message
        EC: 0, // error code
        DT: {
            access_token: req.token,
            groupWithRoles: req.user.groupWithRoles,
            username: req.user.username,
            userId: req.user.userId,
            point: req.user.point,
            pointLock: req.user.pointLock,
        } // data
    })
}

const updatePasswordFunc = async (req, res) => {
    try {
        let data = await userApiService.updateUserPassword(req.body)
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, //data
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error from server user controller - update pass', // error message
            EC: '-1', // error code
            DT: '', //data
        })
    }

}

module.exports = {
    readFunc,
    createFunc,
    countFunc,
    updateFunc,
    deleteFunc,
    getUserAccount,
    updatePasswordFunc
}