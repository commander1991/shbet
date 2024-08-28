import userApiService from '../service/userApiService'
import roleApiService from '../service/roleApiService'

const readFunc = async (req, res) => {
    try {
        let data = await roleApiService.getAllRoles();
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, //data
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'Error from role controller', // error message
            EC: '-1', // error code
            DT: '', //data
        })
    }
}

const createFunc = async (req, res) => {
    try {
        //validate
        let data = await roleApiService.createNewRoles(req.body);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, //data
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error from role controller', // error message
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
            EM: 'Error from server', // error message
            EC: '-1', // error code
            DT: '', //data
        })
    }
}

const deleteFunc = async (req, res) => {
    try {
        let data = await roleApiService.deleteRole(req.body.id)
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data
        })
        //userApiService.deleteFunc()
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error from role controller', // error message
            EC: '-1', // error code
            DT: '', // data
        })
    }
}

const getRolebyGroup = async (req, res) => {
    try {
        let id = req.params.groupId
        let data = await roleApiService.getRolebyGroup(id)
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data
        })
        //userApiService.deleteFunc()
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error from role controller', // error message
            EC: '-1', // error code
            DT: '', // data
        })
    }
}

const assignRoleToGroup = async (req, res) => {
    try {
        let data = await roleApiService.assignRoleToGroup(req.body.data)
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, // data
        })
        //userApiService.deleteFunc()
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error from role controller', // error message
            EC: '-1', // error code
            DT: '', // data
        })
    }
}
module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc,
    getRolebyGroup,
    assignRoleToGroup
}