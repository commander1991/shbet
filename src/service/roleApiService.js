import db from '../models/index'

const createNewRoles = async (roles) => {
    try {

        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true,
            nest: true
        })

        const persists = roles.filter(({ url: url1 }) =>
            !currentRoles.some(({ url: url2 }) => url1 === url2)
        )
        if (persists.length === 0) {
            return {
                EM: 'Nothing to create...',
                EC: 0,
                DT: []
            }
        }
        await db.Role.bulkCreate(persists)
        return {
            EM: `Create roles succeeds: ${persists.length} roles...`,
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs with role api services',
            EC: 1,
            DT: []
        }
    }
}

const getAllRoles = async () => {
    try {
        let data = await db.Role.findAll({
            order: [['id', 'DESC']]
        })
        return {
            EM: "Get all roles succeeds",
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs with role api services',
            EC: 1,
            DT: []
        }
    }
}

const deleteRole = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: { id: id }
        })
        if (role) {
            await role.destroy();
        }
        return {
            EM: 'Delete role succeeds',
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs with role api services',
            EC: 1,
            DT: []
        }
    }
}

const getRolebyGroup = async (id) => {
    try {
        if (!id) {
            return {
                EM: 'Not found any roles',
                EC: 0,
                DT: []
            }
        }

        let roles = await db.Group.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'description'],
            include: {
                model: db.Role,
                attributes: ['id', 'url', 'description'],
                through: { attributes: [] }
            }
        })
        return {
            EM: 'Get roles by group succeeds',
            EC: 0,
            DT: roles
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs with role api services',
            EC: 1,
            DT: []
        }
    }
}

const assignRoleToGroup = async (data) => {
    try {
        await db.Group_Role.destroy({
            where: { groupId: +data.groupId }
        })
        await db.Group_Role.bulkCreate(data.groupRoles)
        return {
            EM: 'Assign role to group succeeds',
            EC: 0,
            DT: []
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'Something wrongs with role api services',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    createNewRoles,
    getAllRoles,
    deleteRole,
    getRolebyGroup,
    assignRoleToGroup
}