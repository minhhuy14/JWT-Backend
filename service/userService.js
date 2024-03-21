const mysql = require('mysql2/promise')
const bcrypt = require('bcryptjs');

import bluebird from 'bluebird';
const salt = bcrypt.genSaltSync(10);
// Create the connection to database
let connection;

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

const createNewUser = (email, password, username) => {
    let hashPass = hashUserPassword(password);
    try {
        const result = connection.query(
            'INSERT INTO Users(email, password,username) values (?,?,?)', [email, hashPass, username]
        );
        // console.log(result);

        let check = bcrypt.compareSync(password, hashPass);
        console.log('Check pass ', check);
        return true;

    } catch (err) {
        console.log(err);
        return false;
    }
}

const getAllUsers = async () => {
    try {
        // let users = connection.query(
        //     'SELECT * FROM Users',
        //     function (err, result, fields) {
        //         if (err) {
        //             console.log(err);
        //         }
        //         console.log('Result Users: ', result);
        //     }
        // )
        let [rows, fields] = await connection.execute('SELECT * FROM Users');

        // console.log(rows);
        return rows;
    }
    catch (err) {
        console.log(err);
        return null;
    }

}

const deleteUsers = async (id) => {
    try {
        const result = connection.query('DELETE FROM Users WHERE id=?', [id]);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

const editUsers = async (id, username, email) => {
    try {
        connection.query('UPDATE Users SET username=?, email=? WHERE id=?', [username, email, id]);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = {
    initializeConnection,
    createNewUser,
    getAllUsers,
    deleteUsers,
    editUsers
}