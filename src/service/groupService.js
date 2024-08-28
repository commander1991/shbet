import db from '../models/index';

const getGroups = async() =>{
    try {
        let data = await db.Group.findAll({
            order: [['name']]
        });
        return {
            EM: "Get group success", // error message
            EC: 0, // error code
            DT: data, //data
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Error from group service', // error message
            EC: 1, // error code
            DT: [], //data
        }
    }
}

module.exports = {
    getGroups
}