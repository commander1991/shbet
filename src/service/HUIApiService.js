import db from '../models/index';
import { v4 as uuidv4 } from 'uuid'

const checkHuiIdExist = async (huiId) => {
    let isExist = await db.Phui_Prop.findOne({
        where: { huiId: huiId }
    })
    if (isExist) {
        return true;
    }
    return false;
}

const getAllHUI = async () => {
    console.log('calling get all hui')
    try {
        let huis = await db.Phui_Prop.findAll({
            attributes: [
                "huiId",
                "huiName",
                "huiType",
                "huiValue",
                "huiStartDate",
                "huiMember",
                "huiNum",
                "huiDonate",
                "huiBelongTo"],
        });
        if (huis) {
            return {
                EM: 'Get data HUIs success',
                EC: 0,
                DT: huis
            }
        } else {
            return {
                EM: 'Get data HUIs success',
                EC: 0,
                DT: []
            }
        }
    } catch (e) {
        return {
            EM: 'Something wrongs with get all HUI api service',
            EC: 1,
            DT: []
        }
    }
}

const getHUIWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.Phui_Prop.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: [
                "id",
                "huiId",
                "huiName",
                "huiType",
                "huiValue",
                "huiStartDate",
                "huiMember",
                "huiNum",
                "huiDonate",
                "huiBelongTo"],
            order: [['id', 'DESC']]
        })

        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            huis: rows
        }
        return {
            EM: 'fetch ok',
            EC: 0,
            DT: data
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Something wrongs with pagination HUI api service',
            EC: 1,
            DT: []
        }
    }
}

const createNewHUI = async (data) => {
    let hashHuiId = uuidv4()
    try {
        let isHuiIdExist = await checkHuiIdExist(data.huiId)
        if (isHuiIdExist === true) {
            return {
                EM: 'HUI is already exist',
                EC: 1,
                DT: "Hui ID"
            }
        }
        await db.Phui_Prop.create({
            huiId: hashHuiId,
            huiName: data.huiName,
            huiType: data.huiType,
            huiValue: data.huiValue,
            huiStartDate: data.huiStartDate,
            huiMember: data.huiMember,
            huiNum: data.huiNum,
            huiDonate: data.huiDonate,
            huiBelongTo: data.huiBelongTo,
        })
        return {
            EM: 'Create HUI OK',
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs with hui api service',
            EC: 1,
            DT: []
        }
    }
}

const deleteHUI = async (huiId) => {
    try {
        let hui = await db.Phui_Prop.findOne({
            where: { huiId: huiId }
        })

        if (hui) {
            await hui.destroy();
            return {
                EM: 'Delete HUI succeeds',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: 'HUI does not exist',
                EC: 2,
                DT: []
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Error delete from service, hui API service',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getAllHUI,
    createNewHUI,
    deleteHUI,
    getHUIWithPagination
}