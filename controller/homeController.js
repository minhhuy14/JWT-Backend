
import userService from '../service/userService.js'


userService.initializeConnection();

const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
    let { DT } = await userService.getAllUsers();
    if (DT)
        return res.render("user.ejs", { listUsers: DT })

    return res.send(404);
}

const handleCreateNewUser = async (req, res) => {
    // console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    let result = await userService.createNewUser(email, password, username);
    if (result) {
        // res.json({ sucess: true, message: "Create new User successfully!" });
        res.redirect('/user')
    }
    else {
        res.json({ sucess: false, message: "Error while creating new user!" });

    }
}

const handleDeleteUser = async (req, res) => {
    // const id = req.param;
    // console.log(req.param)
    const { id } = req.body;
    // console.log('ID ' + id);
    let result = await userService.deleteUsers(id);
    if (result) {
        res.json({ success: true, message: 'Delete user successfully!' });
    }
    else {
        res.json({ success: false, message: 'Error while deleting user!' });
    }

}

const handleEditUser = async (req, res) => {
    const { userId, userName, userEmail } = req.body;

    let result = await userService.editUsers(userId, userName, userEmail);
    if (result) {
        res.json({ success: true, message: 'Edit user successfully!' });
    }
    else {
        res.json({ success: false, message: 'Error while editing user!' });
    }

}
module.exports = {
    handleHelloWorld,
    handleUserPage,
    handleCreateNewUser,
    handleDeleteUser,
    handleEditUser
}