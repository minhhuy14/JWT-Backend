require("dotenv").config();
import jwt from "jsonwebtoken";

const createJWT = () => {
    let payload = { name: 'Huy', address: 'brvt' };
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key);
        console.log("Token: ", token);
    } catch (error) {
        console.log(error);
    }

    return token;
}

const verifyJWT = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;
    // verify a token symmetric
    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
    return data;

}
module.exports = {
    createJWT, verifyJWT
}