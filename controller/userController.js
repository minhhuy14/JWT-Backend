import userApiService from '../service/userApiService'
import userService from '../service/userService';
const readUser = async (req, res) => {
    try {
        console.log('Req.user: ', req.user);
        if (req.query.page && req.query.limit) {
            let page = +req.query.page;
            let limit = +req.query.limit;
            let data = await userService.getUserWithPagination(page, limit);
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

const createNewUser = async (req, res) => {
    try {
        //validate
        let data = await userApiService.createNewUser(req.body);
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

const updateUser = async (req, res) => {
    try {
        //validate
        let data = await userApiService.updateUser(req.body);
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
            DT: [],//date
        })
    }

}

const deleteUser = async (req, res) => {

    try {
        console.log(req.body.id);
        const data = await userApiService.deleteUser(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            data: data.DT
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
}

const getUserAccount=async (req,res)=>{
    return res.status(200).json({
        EM:"ok",
        EC:0,
        DT:{
            accessToken: req.token,
            groupWithRoles : req.user.roles,
            email: req.user.email,
            username: req.user.username
        }
    })
}

module.exports = {
    readUser, createNewUser, updateUser, deleteUser,getUserAccount
};