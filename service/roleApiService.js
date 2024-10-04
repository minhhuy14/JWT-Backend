import db from '../models/index';

const createNewRole = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        });
        console.log(currentRoles);
        const persists = roles.filter(({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2));
        if (persists.length === 0) {
            return {
                EM: 'Nothing to Create',
                EC: 0,
                DT: [],
            }
        }
        else {
            await db.Role.bulkCreate(persists);
            return {
                EM: 'Create roles successfully!',
                EC: 0,
                DT: [],
            }

        }
    }
    catch (error) {
        console.log(error);
        return {
            EM: 'Failure Create role',
            EC: 1,
            DT: [],
        }
    }
}

const getAllRoles = async () => {
    try {
        let data = await db.Role.findAll({
            attributes: ['id', 'url', 'description'],
            raw: true,
            order: [['id', 'DESC']]
        })
        return {
            EM: 'Get all roles successfully!',
            EC: 0,
            DT: data
        }
    }
    catch (error) {
        console.log(error);
        return {
            EM: 'Failure get all roles info!',
            EC: 1,
            DT: [],
        }
    }
}

const deleteRole = async (id) => {
    try {
        console.log("id role to delete: ", id);
        let role = await db.Role.findOne({
            where: { id: id }
        });
        console.log("role to del: ", role);
        if (role) {
            await role.destroy();
        }
        return {
            EM: `Delete Roles successfully!`,
            EC: 0,
            DT: []
        }
    }
    catch (error) {
        console.log(error);
        return {
            EM: 'Failure delete role!',
            EC: 1,
            DT: [],
        }
    }
}
module.exports = {
    createNewRole, getAllRoles, deleteRole
}