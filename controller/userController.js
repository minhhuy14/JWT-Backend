import userApiService from '../service/userApiService'
import userService from '../service/userService';
const readUser = async (req, res) => {


    try {

        if (req.query.page && req.query.limit) {
            let page = +req.query.page;
            let limit = +req.query.limit;
            console.log(">>>check data");
            let data = await userService.getUserWithPagination(page, limit);

            console.log("Data pag: ", data);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT//data
            })
        }
        else {
            let data = await userService.getAllUsers();
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT//data
            })
        }
        console.log("Check query ", req.query);
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