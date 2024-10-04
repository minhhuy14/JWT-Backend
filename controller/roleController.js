import roleApiService from '../service/roleApiService'


const readRole = async (req, res) => {
    try {
        let data = await roleApiService.getAllRoles();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'Error from server',
            EC: '-1',
            DT: ''
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
        const data = await roleApiService.deleteRole(req.body.id);
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
    readRole, createNewRole, updateRole, deleteRole
};