import db from '../models/index'

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

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        })
        if (user) {
            await user.destroy();
            return {
                EM: 'Delete user successfully!',
                EC: 0,
                data: []
            }
        }
        else {
            return {
                EM: 'not found user',
                EC: 0,
                data: []
            }
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'error from service',
            EC: 1,
            data: []
        }
    }
}

module.exports = {
    createNewUser, updateUser, deleteUser
}