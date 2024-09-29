
import db from '../models/index'
const bcrypt = require('bcryptjs');

import { Op } from 'sequelize'
const salt = bcrypt.genSaltSync(10);
const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    });
    if (user) {
        return true;
    }
    return false;
}
const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    });
    if (user) {
        return true;
    }
    return false;
}


const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const registerNewUser = async (rawUserData) => {

    try {
        //Check email/phone number are exist
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) {
            return {
                EM: "The email is already exist",
                EC: 1
            }
        }
        let isPhoneNumberExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneNumberExist === true) {
            return {
                EM: "The phone number is already exist",
                EC: 1
            }
        }
        //hash user password
        let hashPassword = hashUserPassword(rawUserData.password);

        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone
        })

        return {
            EM: 'A user is created sucessfully',
            EC: 0
        }
    }
    catch (e) {
        console.log(e);
        return {
            EM: "Something wrongs in login register service",
            EC: -1
        }
    }

}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    {
                        email: rawData.valueLogin
                    },
                    {
                        phone: rawData.valueLogin
                    }
                ]
            }
        });

        if (user) {
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            if (isCorrectPassword === true) {
                return {
                    EM: 'Login successfully!',
                    EC: 0,
                    DT: ''
                }
            }
            return {
                EM: 'Wrong password!',
                EC: 1,
                DT: ''
            }
        }

        console.log(">>> Not found user with email/phone: ", rawData.valueLogin, "password: ", rawData.password);
        return {
            EM: 'Your email/phone number or password is incorrect!',
            EC: 1,
            DT: ''
        }

    }
    catch (e) {
        console.log(e);
        return {
            EM: "Something wrongs in login service",
            EC: -1
        }
    }
}
module.exports = {
    registerNewUser, handleUserLogin, hashUserPassword, checkEmailExist, checkPhoneExist
}