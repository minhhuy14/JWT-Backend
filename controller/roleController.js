import roleApiService from '../service/roleApiService'


const readRole = async (req, res) => {
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

const createNewRole = async (req, res) => {
    try {
        //validate
        let data = await roleApiService.createNewRole(req.body);
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

const updateRole = async (req, res) => {
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

const deleteRole = async (req, res) => {

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

module.exports = {
    readRole, createNewRole, updateRole,deleteRole
};