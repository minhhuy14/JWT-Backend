// Get the client
const mysql = require('mysql2')

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
});


const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = (req, res) => {
    return res.render("user.ejs")
}

const handleCreateNewUser = (req, res) => {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
    try {
        const result = connection.query(
            'INSERT INTO Users(email, password,username) values (?,?,?)', [email, password, username]
        );
        console.log(result);

    } catch (err) {
        console.log(err);
    }
    return res.send("Handle new user");
}
module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser
}