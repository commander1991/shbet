import HUIApiService from '../service/HUIApiService'

const readFunc = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await HUIApiService.getHUIWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM, // error message
                EC: data.EC, // error code
                DT: data.DT, //data
            })
        } else {
            return res.status(500).json({
                EM: 'Error from server hui controller', // error message
                EC: '-1', // error code
                DT: '', //data
            })  
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'Error from server HUI controller', // error message
            EC: '-1', // error code
            DT: '', //data
        })
    }
}

const createFunc = async (req, res) => {
    try {
        //validate
        let data = await HUIApiService.createNewHUI(req.body);
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, //data
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error from server HUI controller', // error message
            EC: '-1', // error code
            DT: '', //data
        })
    }
}

const deleteFunc = async (req, res) => {
    try {
        let data = await HUIApiService.deleteHUI(req.body.id)
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, //data
        })
        //userApiService.deleteFunc()
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error from server HUI controller', // error message
            EC: '-1', // error code
            DT: '', //data
        })
    }
}

module.exports = {
    readFunc,
    createFunc,
    deleteFunc
}