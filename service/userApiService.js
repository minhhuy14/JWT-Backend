import db from '../models/index'

const getAllUsers = async () => {
    let data = {
        EM: '',
        EC: '',
        DT: ''
    }

    try {
        let users = await db.User.findAll({
            include: {
                model: db.Group,
                attributes: ['name', 'description'],

            },
            attributes: ['id', 'username', 'email'],
        });
        if (users) {
            // let data = users.get({ plain: true });
            return {
                EM: 'Get data success',
                EC: 0,
                DT: users
            }
        }
        else {
            return {
                EM: 'get data success',
                EC: 0,
                data: []
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: 'something wrongs with services',
            EC: 1,
            DT: []
        }
    }

}

const createNewUser = async (data) => {

    try {
        await db.User.createNewUser({

        })
    }
    catch (e) {
        console.log(e);
    }
}

const updateUser = async () => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            user.save({

            })

        }
        else {
            //Not found
        }
    }
    catch (e) {
        console.log(e);
    }
}

const deleteUser = async () => {
    try {
        await db.User.delete({
            where: { id: id }
        })
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}