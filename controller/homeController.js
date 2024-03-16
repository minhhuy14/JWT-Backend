
import userService from '../service/userService.js'


userService.initializeConnection();

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
    let listUsers = await userService.getAllUsers();
    return res.render("user.ejs", { listUsers })
}

const handleCreateNewUser = (req, res) => {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    // let hashPassword = bcrypt.hashSync(password, salt);
    // console.log(hashPassword);
    // try {
    //     const result = connection.query(
    //         'INSERT INTO Users(email, password,username) values (?,?,?)', [email, password, username]
    //     );
    //     // console.log(result);

    //     let check = bcrypt.compareSync(password, hashPassword);
    //     console.log('Check pass ', check);

    // } catch (err) {
    //     console.log(err);
    // }
    userService.createNewUser(email, password, username);
    return res.send("Handle new user");
}
module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser
}