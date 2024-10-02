require("dotenv").config();
import jwt from "jsonwebtoken";


const nonSecurePath = ['/', '/login', '/register'];

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key,{  expiresIn: process.env.JWT_EXPIRES_IN});
        console.log("Token: ", token);
    } catch (error) {
        console.log(error);
    }

    return token;
}

const verifyJWT = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    // verify a token symmetric
    try {
        decoded = jwt.verify(token, key);
    }
    catch (error) {
        console.log(error);
    }
    return decoded;

}

const checkUserJWT = (req, res, next) => {
    if (nonSecurePath.includes(req.path))
        return next();
    let cookies = req.cookies;
    const tokenFromHeader=extractToken(req);
    if (cookies && cookies.jwt||tokenFromHeader) {
        let token = cookies&&cookies.jwt?cookies.jwt:tokenFromHeader;
        let decoded = verifyJWT(token);
        console.log("decoded: ", decoded);
        if (decoded) {
            req.user = decoded;
            req.token=token;
            next();
        }
        else {
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: 'Not authenticated user'
            })
        }
        console.log("myJWT: ", cookies.jwt);
    }
    else return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated user'
        })
    }

const extractToken =(req)=> {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } 
    return null;
}

const checkUserPermission = (req, res, next) => {
    if (nonSecurePath.includes(req.path)||req.path==="/account")
        return next();
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.groupWithRoles[0].Roles;
        let currentUrl = req.path;
        console.log("current url: ", currentUrl);
        console.log("Roles:...", roles);
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: `You don't have permission to access this resource`
            })
        }
        let canAccess = roles.some(item => item.url === currentUrl);
        if (canAccess) {
            next();
        }
        else {
            return res.status(403).json({
                EC: -2,
                DT: '',
                EM: `You don't have permission to access this resource`
            })
        }
    }
}


module.exports = {
    createJWT, verifyJWT, checkUserJWT, checkUserPermission
}