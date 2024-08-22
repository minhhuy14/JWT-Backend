import userApiService from '../service/userApiService'

const readUser = async (req, res) => {

    try {
        let data = await userApiService.getAllUsers();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT//data
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: '',//date
        })
    }
}

const createUser = async (req, res) => {
    try {
        let data = await loginRegisterService.handleUserLogin(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT//data
        })
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: '',//date
        })
    }

}

const updateUser = (req, res) => {

}

const deleteUser = (req, res) => {

}

module.exports = {
    readUser, createUser, updateUser, deleteUser
}