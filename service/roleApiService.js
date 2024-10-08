import db from '../models/index';

const createNewRole = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        });
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
        let role = await db.Role.findOne({
            where: { id: id }
        });
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

const getRoleByGroup = async (id) => {
    try {
        if (!id) {
            return {
                EM: `Not found any roles`,
                EC: 0,
                DT: []
            }
        }

        let roles = await db.Group.findOne({
            where: { id: id },
            attributes: ["id", "name", "description"],
            include: [{
                model: db.Role,
                attributes: ["id", "url", "description"],
                through: { attributes: [] }
            }],
        });
        return {
            EM: `Get roles with group successfully!`,
            EC: 0,
            DT: roles
        }
    }
    catch (error) {
        console.log(error);
        return {
            EM: 'Failure get role by group!',
            EC: 1,
            DT: [],
        }
    }
}

const assignRoleToGroup = async (data) => {
    try {
        await db.Group_Role.destroy({
            where: { groupId: +data.selectGroup }
        });
        await db.Group_Role.bulkCreate(data.groupRoles);
        return {
            EM: `Assign roles successfully!`,
            EC: 0,
            DT: []
        }
    }
    catch (error) {
        console.log(error);
        return {
            EM: 'Failure get role by group!',
            EC: 1,
            DT: [],
        }
    }
}

module.exports = {
    createNewRole, getAllRoles, deleteRole, getRoleByGroup, assignRoleToGroup
}