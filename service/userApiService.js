import db from '../models/index'

import { checkEmailExist, checkPhoneExist, hashUserPassword } from './loginRegisterService'
const createNewUser = async (data) => {

    try {
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist === true) {
            return {
                EM: "The email is already exist",
                EC: 1,
                DT: 'email'
            }
        }
        let isPhoneNumberExist = await checkPhoneExist(data.phone);
        if (isPhoneNumberExist === true) {
            return {
                EM: "The phone number is already exist",
                EC: 1,
                DT: 'phone'
            }
        }
        //hash user password
        let hashPassword = hashUserPassword(data.password)

        await db.User.create({ ...data, password: hashPassword });
        return {
            EM: 'Create ok',
            EC: 0,
            DT: data.DT,
        }
    }
    catch (e) {
        console.log(e);
        return {
            EM: 'Failure Create user',
            EC: 1,
            DT: [],
        }
    }
}

const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: 'Error with group id',
                EC: 1,
                DT: []
            }
        }
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            await user.update({
                username: data.username,
                address: data.address,
                gender: data.gender,
                groupId: data.groupId
            });
            return {
                EM: 'Update user successfully',
                EC: 0,
                DT: data
            }
        }
        else return {
            EM: 'User not found',
            EC: 2,
            DT: []
        }
    }
    catch (e) {
        console.log(e);
        return {
            EM: 'Something wrongs with services',
            EC: 1,
            DT: []
        }
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