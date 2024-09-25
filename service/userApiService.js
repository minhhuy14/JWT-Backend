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
    createNewUser, updateUser, deleteUser
}