import loginRegisterService from '../service/loginRegisterService'

const testApi = (req, res) => {
    return res.status(200).json({
        message: "ok",
        data: "test api"
    })
}

const handleRegister = async (req, res) => {
    try {
        //req.body: username, phone, password
        if (!req.body.username || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parameters',//error message
                EC: '1',//error code
                DT: '',//data
            })
        }

        if (req.body.password && req.body.password.length < 6) {
            return res.status(200).json({
                EM: 'Password must asleast 6 letters',//error message
                EC: '1',//error code
                DT: '',//data
            })
        }

        //service: create user
        let data = await loginRegisterService.registerNewUser(req.body)
        return res.status(200).json({
            EM: data.EM,//error message
            EC: data.EC,//error code
            DT: '',//data
        })
    } catch (e) {
        return res.status(500).json({
            EM: 'error from server',//error message
            EC: '-1',//error code
            DT: '',//data
        })
    }
}

const handleLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.handleUserLogin(req.body);        
        //set cookie
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 * 24 * 30 })//1 tháng
            console.log('User login: ', data.DT.username, 'at', new Date())
        }
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT, //data
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'Error from server', // error message
            EC: -1, // error code
            DT: '', //data
        })
    }
}

const handleLogout = (req, res) => {
    try {
        res.clearCookie("jwt")
        return res.status(200).json({
            EM: 'Clear cookie OK!', // error message
            EC: 0, // error code
            DT: '', //data
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'Error from log out', // error message
            EC: -1, // error code
            DT: '', //data
        })
    }
}
module.exports = {
    testApi, handleRegister, handleLogin, handleLogout
}