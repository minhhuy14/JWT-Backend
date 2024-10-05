const mysql = require('mysql2/promise')
const bcrypt = require('bcryptjs');

import bluebird from 'bluebird';
const salt = bcrypt.genSaltSync(10);
// Create the connection to database
let connection;

import db from '../models/';

async function initializeConnection() {
    try {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'jwt',
            Promise: bluebird
        });
    } catch (error) {
        console.error('Error initializing database connection:', error);
    }
}

// initializeConnection();



const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    try {

        await db.User.create({
            username: username,
            email: email,
            password: hashPass
        })
        return true;

    } catch (err) {
        console.log(err);
        return false;
    }
}

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

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        let { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ['id', 'username', 'email', 'address', 'gender', 'phone'],
            include: {
                model: db.Group,
                attributes: ['name', 'description', 'id'],

            },
            order: [
                ["id", "DESC"]]
        });
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        };
        return {
            EM: "Successfully",
            EC: 0,
            DT: data
        }
    }
    catch (err) {
        console.log(err);
        return {
            EM: "Failed",
            EC: 0,
            DT: []
        }
    }
}

const deleteUsers = async (id) => {
    try {
        // const result = connection.query('DELETE FROM Users WHERE id=?', [id]);
        await db.User.destroy({
            where: {
                id: id
            }
        });
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const editUsers = async (id, username, email) => {
    try {
        const res = await db.User.update({ username: username, email: email }, {
            where: {
                id: id
            }
        });
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const getUserById = async (id) => {
    let user = {};
    user = await db.User.findOne({
        where: { id: id }
    });
    user = user.get({
        plain: true
    })
    return user;
}
module.exports = {
    initializeConnection,
    createNewUser,
    getAllUsers,
    getUserWithPagination,
    deleteUsers,
    editUsers,
    getUserById
}